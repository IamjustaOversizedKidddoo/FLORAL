import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useAtelier } from '../../store/atelierStore';
import { VASE_OPTIONS, WRAP_OPTIONS } from '../../data/botanicalCatalog';
import { clampToBouquetSilhouette, getRoleScaleBounds } from '../../utils/compositionEngine';
import { CrossIcon } from '../ui/Icons';
import './BouquetCanvas.css';

interface LiveDragSession {
  mode: 'move' | 'rotate' | 'scale';
  instanceId: string;
  startX: number;
  startY: number;
  initialItemX: number;
  initialItemY: number;
  initialRotation: number;
  initialScale: number;
  centerX: number;
  centerY: number;
  containerWidth: number;
  containerHeight: number;
  element: HTMLElement;
  lastTransform: {
    x: number;
    y: number;
    rotation: number;
    scale: number;
  };
  hasMoved: boolean;
  rafId: number | null;
}

export const BouquetCanvas: React.FC = () => {
  const {
    bouquetItems,
    selectedInstanceId,
    selectInstance,
    updateInstanceTransform,
    removeBouquetItem,
    duplicateInstance,
    bringForward,
    sendBackward,
    selectedVaseId,
    selectedWrapId
  } = useAtelier();

  const containerRef = useRef<HTMLDivElement>(null);
  const dragSessionRef = useRef<LiveDragSession | null>(null);
  const [, setRerenderFlag] = useState(0);

  const selectedVase = VASE_OPTIONS.find(v => v.id === selectedVaseId) || VASE_OPTIONS[0];
  const selectedWrap = WRAP_OPTIONS.find(w => w.id === selectedWrapId) || WRAP_OPTIONS[0];

  // Silky-Smooth 60FPS Drag with zero React state thrashing
  const handleGlobalPointerMove = useCallback((e: PointerEvent) => {
    const session = dragSessionRef.current;
    if (!session) return;

    session.hasMoved = true;

    if (session.mode === 'move') {
      const deltaXPercent = ((e.clientX - session.startX) / session.containerWidth) * 100;
      const deltaYPercent = ((e.clientY - session.startY) / session.containerHeight) * 100;

      const bounded = clampToBouquetSilhouette(
        session.initialItemX + deltaXPercent,
        session.initialItemY + deltaYPercent
      );

      session.lastTransform.x = bounded.x;
      session.lastTransform.y = bounded.y;

      if (session.rafId) cancelAnimationFrame(session.rafId);
      session.rafId = requestAnimationFrame(() => {
        if (session.element) {
          session.element.style.left = `${bounded.x}%`;
          session.element.style.top = `${bounded.y}%`;
        }
      });
    } else if (session.mode === 'rotate') {
      const dx = e.clientX - session.centerX;
      const dy = e.clientY - session.centerY;
      const rad = Math.atan2(dy, dx);
      let deg = Math.round((rad * 180) / Math.PI) + 90;
      while (deg > 180) deg -= 360;
      while (deg < -180) deg += 360;

      session.lastTransform.rotation = deg;

      if (session.rafId) cancelAnimationFrame(session.rafId);
      session.rafId = requestAnimationFrame(() => {
        if (session.element) {
          session.element.style.transform = `translate(-50%, -50%) rotate(${deg}deg) scale(${session.lastTransform.scale})`;
        }
      });
    } else if (session.mode === 'scale') {
      const currentDist = Math.hypot(e.clientX - session.centerX, e.clientY - session.centerY);
      const initialDist = Math.hypot(session.startX - session.centerX, session.startY - session.centerY);
      if (initialDist > 0) {
        const item = bouquetItems.find(i => i.instanceId === session.instanceId);
        const scaleBounds = getRoleScaleBounds(item?.role);
        const ratio = currentDist / initialDist;
        const newScale = Math.max(
          scaleBounds.min,
          Math.min(scaleBounds.max, Number((session.initialScale * ratio).toFixed(2)))
        );

        session.lastTransform.scale = newScale;

        if (session.rafId) cancelAnimationFrame(session.rafId);
        session.rafId = requestAnimationFrame(() => {
          if (session.element) {
            session.element.style.transform = `translate(-50%, -50%) rotate(${session.lastTransform.rotation}deg) scale(${newScale})`;
          }
        });
      }
    }
  }, [bouquetItems]);

  const handleGlobalPointerUp = useCallback(() => {
    const session = dragSessionRef.current;
    if (!session) return;

    if (session.rafId) {
      cancelAnimationFrame(session.rafId);
    }

    // Commit final transform to React state once
    if (session.hasMoved) {
      updateInstanceTransform(session.instanceId, {
        x: session.lastTransform.x,
        y: session.lastTransform.y,
        rotation: session.lastTransform.rotation,
        scale: session.lastTransform.scale
      });
    }

    dragSessionRef.current = null;
    window.removeEventListener('pointermove', handleGlobalPointerMove);
    window.removeEventListener('pointerup', handleGlobalPointerUp);
    setRerenderFlag(n => n + 1);
  }, [updateInstanceTransform, handleGlobalPointerMove]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedInstanceId) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        removeBouquetItem(selectedInstanceId);
      } else if (e.key === 'Escape') {
        selectInstance(null);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const step = e.shiftKey ? 3 : 0.8;
        const item = bouquetItems.find(i => i.instanceId === selectedInstanceId);
        if (item) {
          const bounded = clampToBouquetSilhouette(item.x, item.y - step);
          updateInstanceTransform(selectedInstanceId, bounded);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const step = e.shiftKey ? 3 : 0.8;
        const item = bouquetItems.find(i => i.instanceId === selectedInstanceId);
        if (item) {
          const bounded = clampToBouquetSilhouette(item.x, item.y + step);
          updateInstanceTransform(selectedInstanceId, bounded);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const step = e.shiftKey ? 3 : 0.8;
        const item = bouquetItems.find(i => i.instanceId === selectedInstanceId);
        if (item) {
          const bounded = clampToBouquetSilhouette(item.x - step, item.y);
          updateInstanceTransform(selectedInstanceId, bounded);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const step = e.shiftKey ? 3 : 0.8;
        const item = bouquetItems.find(i => i.instanceId === selectedInstanceId);
        if (item) {
          const bounded = clampToBouquetSilhouette(item.x + step, item.y);
          updateInstanceTransform(selectedInstanceId, bounded);
        }
      } else if (e.key === '[') {
        sendBackward(selectedInstanceId);
      } else if (e.key === ']') {
        bringForward(selectedInstanceId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedInstanceId, bouquetItems, removeBouquetItem, selectInstance, updateInstanceTransform, sendBackward, bringForward]);

  // Clean up global listeners on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [handleGlobalPointerMove, handleGlobalPointerUp]);

  // Start moving a flower layer
  const startMove = (e: React.PointerEvent, item: typeof bouquetItems[0]) => {
    e.stopPropagation();
    selectInstance(item.instanceId);

    const container = containerRef.current;
    if (!container) return;

    const layerEl = document.getElementById(`layer-${item.instanceId}`);
    if (!layerEl) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = layerEl.getBoundingClientRect();

    dragSessionRef.current = {
      mode: 'move',
      instanceId: item.instanceId,
      startX: e.clientX,
      startY: e.clientY,
      initialItemX: item.x,
      initialItemY: item.y,
      initialRotation: item.rotation,
      initialScale: item.scale,
      centerX: itemRect.left + itemRect.width / 2,
      centerY: itemRect.top + itemRect.height / 2,
      containerWidth: containerRect.width,
      containerHeight: containerRect.height,
      element: layerEl,
      lastTransform: {
        x: item.x,
        y: item.y,
        rotation: item.rotation,
        scale: item.scale
      },
      hasMoved: false,
      rafId: null
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
  };

  // Start rotating from rotation handle
  const startRotate = (e: React.PointerEvent, item: typeof bouquetItems[0]) => {
    e.stopPropagation();
    const container = containerRef.current;
    const layerEl = document.getElementById(`layer-${item.instanceId}`);
    if (!container || !layerEl) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = layerEl.getBoundingClientRect();

    dragSessionRef.current = {
      mode: 'rotate',
      instanceId: item.instanceId,
      startX: e.clientX,
      startY: e.clientY,
      initialItemX: item.x,
      initialItemY: item.y,
      initialRotation: item.rotation,
      initialScale: item.scale,
      centerX: itemRect.left + itemRect.width / 2,
      centerY: itemRect.top + itemRect.height / 2,
      containerWidth: containerRect.width,
      containerHeight: containerRect.height,
      element: layerEl,
      lastTransform: {
        x: item.x,
        y: item.y,
        rotation: item.rotation,
        scale: item.scale
      },
      hasMoved: false,
      rafId: null
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
  };

  // Start scaling from corner handle
  const startScale = (e: React.PointerEvent, item: typeof bouquetItems[0]) => {
    e.stopPropagation();
    const container = containerRef.current;
    const layerEl = document.getElementById(`layer-${item.instanceId}`);
    if (!container || !layerEl) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = layerEl.getBoundingClientRect();

    dragSessionRef.current = {
      mode: 'scale',
      instanceId: item.instanceId,
      startX: e.clientX,
      startY: e.clientY,
      initialItemX: item.x,
      initialItemY: item.y,
      initialRotation: item.rotation,
      initialScale: item.scale,
      centerX: itemRect.left + itemRect.width / 2,
      centerY: itemRect.top + itemRect.height / 2,
      containerWidth: containerRect.width,
      containerHeight: containerRect.height,
      element: layerEl,
      lastTransform: {
        x: item.x,
        y: item.y,
        rotation: item.rotation,
        scale: item.scale
      },
      hasMoved: false,
      rafId: null
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
  };

  return (
    <div 
      className="bouquet-canvas-viewport" 
      ref={containerRef}
      onPointerDown={() => selectInstance(null)}
      id="bouquet-interactive-canvas"
    >
      {/* Background table shadow and mood lighting */}
      <div className="canvas-shadow-ground" />

      {/* Empty State Banner if no stems */}
      {bouquetItems.length === 0 && (
        <div className="canvas-empty-overlay">
          <span className="canvas-empty-brand">FLORÆ ATELIER</span>
          <span className="canvas-empty-heading">YOUR BOUQUET IS WAITING.</span>
          <span className="canvas-empty-sub">Select your first botanical stem.</span>
        </div>
      )}

      {/* Render All Botanical Flower & Foliage Layers */}
      <div className="botanical-layers-container">
        {bouquetItems.map((item) => {
          const isSelected = selectedInstanceId === item.instanceId;

          return (
            <div
              key={item.instanceId}
              id={`layer-${item.instanceId}`}
              className={`botanical-layer ${isSelected ? 'selected' : ''}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                zIndex: item.zIndex,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale}) ${item.flipX ? 'scaleX(-1)' : ''}`
              }}
              onPointerDown={(e) => startMove(e, item)}
              role="button"
              tabIndex={0}
              aria-label={`${item.name} stem. Drag to arrange, or select to rotate and scale.`}
            >
              {/* Botanical image with pure alpha transparency */}
              <div className="botanical-img-wrapper">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="botanical-stem-img"
                  draggable={false}
                />
              </div>

              {/* Selection Transform Controls (Only visible when active) */}
              {isSelected && (
                <div className="selection-frame" onPointerDown={(e) => e.stopPropagation()}>
                  {/* Rotate Grip at Top */}
                  <div 
                    className="transform-handle rotate-handle"
                    onPointerDown={(e) => startRotate(e, item)}
                    title="Drag to Rotate"
                  >
                    <div className="handle-connector" />
                    <div className="handle-knob rotate-knob" />
                  </div>

                  {/* Corner Scale Grip at Bottom Right */}
                  <div 
                    className="transform-handle scale-handle"
                    onPointerDown={(e) => startScale(e, item)}
                    title="Drag to Resize"
                  >
                    <div className="handle-knob scale-knob" />
                  </div>

                  {/* Micro-Toolbar Floating above selection */}
                  <div className="layer-micro-toolbar" onPointerDown={(e) => e.stopPropagation()}>
                    <button 
                      className="micro-btn" 
                      onClick={() => bringForward(item.instanceId)}
                      title="Bring Forward (Key: ])"
                    >
                      ▲
                    </button>
                    <button 
                      className="micro-btn" 
                      onClick={() => sendBackward(item.instanceId)}
                      title="Send Backward (Key: [)"
                    >
                      ▼
                    </button>
                    <button 
                      className="micro-btn" 
                      onClick={() => duplicateInstance(item.instanceId)}
                      title="Duplicate Stem"
                    >
                      ⎘
                    </button>
                    <button 
                      className="micro-btn delete-btn" 
                      onClick={() => removeBouquetItem(item.instanceId)}
                      title="Remove Flower (Key: Del)"
                    >
                      <CrossIcon size={10} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upright Luxury Vase or Physical Packaging Wrap */}
      <div className="canvas-vessel-stage">
        {selectedWrap.id !== 'wrap-none' ? (
          <img 
            src={selectedWrap.image} 
            alt={selectedWrap.name} 
            className="canvas-vessel-img canvas-wrap-img"
            draggable={false}
          />
        ) : (
          <img 
            src={selectedVase.image} 
            alt={selectedVase.name} 
            className="canvas-vessel-img canvas-vase-img"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
};
