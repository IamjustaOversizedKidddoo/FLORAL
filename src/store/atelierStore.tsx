import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  BouquetCategory, 
  BouquetInstance, 
  BotanicalItem, 
  FlowerColor, 
  FlowerMeaning, 
  FlowerSeason, 
  FlowerRegion 
} from '../types/bouquet';
import { LetterFormatting, LetterMode, TemplateId, AIStarterPrompt } from '../types/letter';
import { 
  generateIntelligentComposition, 
  calculateNextItemPlacement, 
  validateBouquetComposition,
  clampToBouquetSilhouette 
} from '../utils/compositionEngine';
import { LETTER_TEMPLATES } from '../data/letterTemplates';
import { DEFAULT_VASE_ID } from '../data/botanicalCatalog';

const CREATION_STORAGE_KEY = 'florae_atelier_creation_v3';

export interface AtelierContextType {
  // Navigation
  activeNav: 'BOUQUET' | 'LETTER' | 'PREVIEW';
  setActiveNav: (nav: 'BOUQUET' | 'LETTER' | 'PREVIEW') => void;

  // Bouquet Instances (Interactive Canvas)
  bouquetItems: BouquetInstance[];
  selectedInstanceId: string | null;
  selectInstance: (id: string | null) => void;
  addBotanicalItem: (item: BotanicalItem) => void;
  addBouquetItem: (item: BotanicalItem) => void; // alias
  removeBouquetItem: (id: string) => void;
  duplicateInstance: (id: string) => void;
  updateInstanceTransform: (
    id: string, 
    patch: Partial<Pick<BouquetInstance, 'x' | 'y' | 'scale' | 'rotation' | 'zIndex' | 'flipX'>>
  ) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  clearBouquet: () => void;
  randomizeBouquet: () => void;

  // Vase & Wrap
  selectedVaseId: string;
  setSelectedVaseId: (id: string) => void;
  selectedWrapId: string;
  setSelectedWrapId: (id: string) => void;

  // Catalog Filter & Search State
  activeCategory: BouquetCategory;
  setActiveCategory: (cat: BouquetCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterColor: FlowerColor;
  setFilterColor: (c: FlowerColor) => void;
  filterMeaning: FlowerMeaning;
  setFilterMeaning: (m: FlowerMeaning) => void;
  filterSeason: FlowerSeason;
  setFilterSeason: (s: FlowerSeason) => void;
  filterRegion: FlowerRegion;
  setFilterRegion: (r: FlowerRegion) => void;
  resetFilters: () => void;

  // Letter State
  letterMode: LetterMode;
  setLetterMode: (mode: LetterMode) => void;
  activeTemplateId: TemplateId;
  setActiveTemplateId: (id: TemplateId) => void;
  recipientText: string;
  setRecipientText: (text: string) => void;
  bodyText: string;
  setBodyText: (text: string) => void;
  closingText: string;
  setClosingText: (text: string) => void;
  formatting: LetterFormatting;
  updateFormatting: (patch: Partial<LetterFormatting>) => void;
  applyStarter: (starter: AIStarterPrompt) => void;
  
  // Preview & Share Modals
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  currentGiftId: string | null;
  setCurrentGiftId: (id: string | null) => void;
  currentShareUrl: string | null;
  setCurrentShareUrl: (url: string | null) => void;
  startNewCreation: () => void;
}

// Initial Canonical items matching reference image (Rose, Blossom, and Branch in Dark Ceramic Vase)
const initialCanonicalItems: BouquetInstance[] = [
  {
    instanceId: 'item-branch-hero',
    botanicalId: 'foliage-branch',
    name: 'Budding Branch',
    image: '/assets/bouquet/branch.png',
    category: 'FOLIAGE',
    x: 46,
    y: 44,
    scale: 1.18,
    rotation: -14,
    zIndex: 4,
    flipX: false
  },
  {
    instanceId: 'item-blossom-hero',
    botanicalId: 'extra-blossom',
    name: 'Plum Blossom',
    image: '/assets/bouquet/blossom.png',
    category: 'EXTRAS',
    x: 53,
    y: 50,
    scale: 1.05,
    rotation: 8,
    zIndex: 8,
    flipX: false
  },
  {
    instanceId: 'item-rose-hero',
    botanicalId: 'flower-rose',
    name: 'Rose',
    image: '/assets/flowers/rose.png',
    category: 'FLOWERS',
    x: 49,
    y: 55,
    scale: 1.10,
    rotation: -2,
    zIndex: 12,
    flipX: false
  }
];

const AtelierContext = createContext<AtelierContextType | undefined>(undefined);

export const AtelierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeNav, setActiveNav] = useState<'BOUQUET' | 'LETTER' | 'PREVIEW'>('BOUQUET');
  
  // Fresh canonical creation defaults (refresh gives a clean session)
  const [bouquetItems, setBouquetItems] = useState<BouquetInstance[]>(() =>
    validateBouquetComposition(initialCanonicalItems)
  );

  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [selectedVaseId, setSelectedVaseId] = useState<string>(DEFAULT_VASE_ID);
  const [selectedWrapId, setSelectedWrapId] = useState<string>('wrap-none');

  // Catalog Filter State
  const [activeCategory, setActiveCategory] = useState<BouquetCategory>('FLOWERS');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterColor, setFilterColor] = useState<FlowerColor>('all');
  const [filterMeaning, setFilterMeaning] = useState<FlowerMeaning>('all');
  const [filterSeason, setFilterSeason] = useState<FlowerSeason>('all');
  const [filterRegion, setFilterRegion] = useState<FlowerRegion>('all');

  const resetFilters = () => {
    setSearchQuery('');
    setFilterColor('all');
    setFilterMeaning('all');
    setFilterSeason('all');
    setFilterRegion('all');
  };

  // Letter State initialized cleanly
  const [letterMode, setLetterMode] = useState<LetterMode>('TEMPLATES');
  const [activeTemplateId, setActiveTemplateId] = useState<TemplateId>('classic');
  const [recipientText, setRecipientText] = useState<string>('');
  const [bodyText, setBodyText] = useState<string>('');
  const [closingText, setClosingText] = useState<string>('');
  const [formatting, setFormatting] = useState<LetterFormatting>({
    font: 'Cormorant Garamond',
    tone: 'Poetic',
    bold: false,
    italic: true,
    underline: false,
    align: 'left'
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get('preview') === 'true';
    } catch {
      return false;
    }
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentGiftId, setCurrentGiftId] = useState<string | null>(null);
  const [currentShareUrl, setCurrentShareUrl] = useState<string | null>(null);

  // Ensure clean session on refresh: remove any stale cached creations
  useEffect(() => {
    try {
      localStorage.removeItem(CREATION_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Bouquet actions
  const addBotanicalItem = (item: BotanicalItem) => {
    const placement = calculateNextItemPlacement(item, bouquetItems);
    const newInstance: BouquetInstance = {
      ...placement,
      instanceId: `inst-${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    setBouquetItems(prev => validateBouquetComposition([...prev, newInstance]));
    setSelectedInstanceId(newInstance.instanceId);
  };

  const removeBouquetItem = (id: string) => {
    setBouquetItems(prev => prev.filter(item => item.instanceId !== id));
    if (selectedInstanceId === id) {
      setSelectedInstanceId(null);
    }
  };

  const duplicateInstance = (id: string) => {
    const target = bouquetItems.find(i => i.instanceId === id);
    if (!target) return;
    const bounded = clampToBouquetSilhouette(target.x + 3, target.y - 2);
    const duplicated: BouquetInstance = {
      ...target,
      instanceId: `inst-${target.botanicalId}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      x: bounded.x,
      y: bounded.y,
      rotation: target.rotation + 6,
      zIndex: target.zIndex + 1
    };
    setBouquetItems(prev => validateBouquetComposition([...prev, duplicated]));
    setSelectedInstanceId(duplicated.instanceId);
  };

  const updateInstanceTransform = (
    id: string, 
    patch: Partial<Pick<BouquetInstance, 'x' | 'y' | 'scale' | 'rotation' | 'zIndex' | 'flipX'>>
  ) => {
    setBouquetItems(prev => prev.map(item => {
      if (item.instanceId !== id) return item;
      let newX = patch.x !== undefined ? patch.x : item.x;
      let newY = patch.y !== undefined ? patch.y : item.y;
      if (patch.x !== undefined || patch.y !== undefined) {
        const bounded = clampToBouquetSilhouette(newX, newY);
        newX = bounded.x;
        newY = bounded.y;
      }
      return { ...item, ...patch, x: newX, y: newY };
    }));
  };

  const bringForward = (id: string) => {
    setBouquetItems(prev => {
      const idx = prev.findIndex(i => i.instanceId === id);
      if (idx === -1 || idx === prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[idx + 1];
      copy[idx + 1] = temp;
      return copy.map((item, i) => ({ ...item, zIndex: i + 1 }));
    });
  };

  const sendBackward = (id: string) => {
    setBouquetItems(prev => {
      const idx = prev.findIndex(i => i.instanceId === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[idx - 1];
      copy[idx - 1] = temp;
      return copy.map((item, i) => ({ ...item, zIndex: i + 1 }));
    });
  };

  const bringToFront = (id: string) => {
    setBouquetItems(prev => {
      const target = prev.find(i => i.instanceId === id);
      if (!target) return prev;
      const filtered = prev.filter(i => i.instanceId !== id);
      return [...filtered, target].map((item, i) => ({ ...item, zIndex: i + 1 }));
    });
  };

  const sendToBack = (id: string) => {
    setBouquetItems(prev => {
      const target = prev.find(i => i.instanceId === id);
      if (!target) return prev;
      const filtered = prev.filter(i => i.instanceId !== id);
      return [target, ...filtered].map((item, i) => ({ ...item, zIndex: i + 1 }));
    });
  };

  const clearBouquet = () => {
    setBouquetItems([]);
    setSelectedInstanceId(null);
  };

  const randomizeBouquet = () => {
    const composition = generateIntelligentComposition();
    setBouquetItems(composition.instances);
    setSelectedVaseId(composition.vaseId);
    setSelectedWrapId(composition.wrapId);
    setSelectedInstanceId(null);
  };

  const updateFormatting = (patch: Partial<LetterFormatting>) => {
    setFormatting(prev => ({ ...prev, ...patch }));
  };

  const applyStarter = (starter: AIStarterPrompt) => {
    setRecipientText(starter.salutation);
    setBodyText(starter.bodySnippet);
    setClosingText(starter.closing);
    setFormatting(prev => ({ ...prev, tone: starter.tone }));
  };

  return (
    <AtelierContext.Provider
      value={{
        activeNav,
        setActiveNav,
        bouquetItems,
        selectedInstanceId,
        selectInstance: setSelectedInstanceId,
        addBotanicalItem,
        addBouquetItem: addBotanicalItem,
        removeBouquetItem,
        duplicateInstance,
        updateInstanceTransform,
        bringForward,
        sendBackward,
        bringToFront,
        sendToBack,
        clearBouquet,
        randomizeBouquet,
        selectedVaseId,
        setSelectedVaseId,
        selectedWrapId,
        setSelectedWrapId,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        filterColor,
        setFilterColor,
        filterMeaning,
        setFilterMeaning,
        filterSeason,
        setFilterSeason,
        filterRegion,
        setFilterRegion,
        resetFilters,
        letterMode,
        setLetterMode,
        activeTemplateId,
        setActiveTemplateId: (id: TemplateId) => {
          setActiveTemplateId(id);
          const t = LETTER_TEMPLATES.find(tmpl => tmpl.id === id);
          if (t) {
            setFormatting(prev => ({ ...prev, font: t.defaultFont }));
          }
        },
        recipientText,
        setRecipientText,
        bodyText,
        setBodyText,
        closingText,
        setClosingText,
        formatting,
        updateFormatting,
        applyStarter,
        isPreviewOpen,
        setIsPreviewOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        currentGiftId,
        setCurrentGiftId,
        currentShareUrl,
        setCurrentShareUrl,
        startNewCreation: () => {
          try {
            localStorage.removeItem(CREATION_STORAGE_KEY);
          } catch { /* ignore */ }
          setBouquetItems([]);
          setSelectedInstanceId(null);
          setSelectedVaseId(DEFAULT_VASE_ID);
          setSelectedWrapId('wrap-none');
          setLetterMode('TEMPLATES');
          setActiveTemplateId('classic');
          setRecipientText('');
          setBodyText('');
          setClosingText('');
          setCurrentGiftId(null);
          setCurrentShareUrl(null);
          setActiveNav('BOUQUET');
        }
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
};

export const useAtelier = () => {
  const context = useContext(AtelierContext);
  if (!context) {
    throw new Error('useAtelier must be used within an AtelierProvider');
  }
  return context;
};
