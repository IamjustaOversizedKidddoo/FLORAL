import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QUOTES } from './quotesData';
import styles from './Quotes.module.css';

interface QuotesProps {
  intervalMs?: number; // Exact duration in ms, default 7000ms (7 seconds)
}

type FadeState = 'visible' | 'fading-out' | 'fading-in';

export const Quotes = React.memo(function Quotes({ intervalMs = 7000 }: QuotesProps) {
  // Start with a randomized quote index
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length),
  );
  const [fadeState, setFadeState] = useState<FadeState>('visible');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  const triggerNext = useCallback(() => {
    clearAllTimers();
    setFadeState('fading-out');

    // 1. Wait 500ms for current quote to fade out smoothly
    transitionTimerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
      setFadeState('fading-in');

      // 2. Wait 500ms for next quote to fade in smoothly
      transitionTimerRef.current = setTimeout(() => {
        setFadeState('visible');
      }, 500);
    }, 500);
  }, [clearAllTimers]);

  // Main automatic cycle: after intervalMs in 'visible' state, auto-fade and advance
  useEffect(() => {
    if (fadeState === 'visible') {
      timerRef.current = setTimeout(() => {
        triggerNext();
      }, intervalMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [fadeState, intervalMs, triggerNext]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const handleManualSkip = () => {
    triggerNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleManualSkip();
    }
  };

  const currentQuote = QUOTES[currentIndex] || QUOTES[0];

  const contentAnimationClass =
    fadeState === 'fading-out'
      ? styles.fadeOut
      : fadeState === 'fading-in'
        ? styles.fadeIn
        : styles.visible;

  return (
    <figure
      className={styles.quotesContainer}
      onClick={handleManualSkip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      title="Click to advance quote"
      aria-label={`Mindset Quote: "${currentQuote.quote}" — ${currentQuote.author}`}
    >
      <div className={`${styles.content} ${contentAnimationClass}`}>
        <span className={styles.badge}>{currentQuote.badge}</span>
        <blockquote className={styles.quoteBlock}>
          <p className={styles.quoteText}>&ldquo;{currentQuote.quote}&rdquo;</p>
        </blockquote>
        <figcaption className={styles.author}>&mdash; {currentQuote.author}</figcaption>
      </div>

      <span className={styles.hint} aria-hidden="true">
        click to skip &bull; 7s auto-cycle
      </span>
    </figure>
  );
});
