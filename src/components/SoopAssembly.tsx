import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';
import { translations } from '../i18n/translations';
import { Language, SamagriItem } from '../types';
import { CheckCircle, Sparkles, X, RotateCcw } from 'lucide-react';

interface SoopAssemblyProps {
  lang: Language;
  onClose: () => void;
  onComplete: () => void;
}

export const SoopAssembly: React.FC<SoopAssemblyProps> = ({ lang, onClose, onComplete }) => {
  const t = translations[lang].soop;

  const initialItems: SamagriItem[] = [
    {
      id: 'coconut',
      name: { en: 'Akhand Coconut (नारियल)', hi: 'अखंड जल भरा नारियल', bho: 'जटादार नारियर' },
      category: 'Sacred Fruit',
      significance: {
        en: 'Symbolizes purity, humility, and complete surrender to cosmic solar energy.',
        hi: 'पूर्णता, शुचिता और अहंकार विसर्जन का प्रतीक।',
        bho: 'पवित्रता आ सुरुज देव के प्रति समर्पण के प्रतीक।'
      },
      icon: '🥥',
      placed: false
    },
    {
      id: 'dabh',
      name: { en: 'Dabh Nimbu (डाभ नींबू)', hi: 'डाभ नींबू (विशाल चकोतरा)', bho: 'डाभ निबुआ' },
      category: 'Medicinal Citrus',
      significance: {
        en: 'Massive seasonal pomelo boosting natural immunity during seasonal winter transition.',
        hi: 'ऋतु परिवर्तन के समय रोग प्रतिरोधक क्षमता बढ़ाने वाला दिव्य फल।',
        bho: 'जाड़ा के मौसम में देह के निरोग राखे वाला फल।'
      },
      icon: '🍋',
      placed: false
    },
    {
      id: 'turmeric',
      name: { en: 'Raw Turmeric & Ginger', hi: 'पत्तेदार कच्ची हल्दी व अदरक', bho: 'हरदी आ आदि के गाछ' },
      category: 'Earth Harvest',
      significance: {
        en: 'Uprooted living plants with green leaves and soil, honoring Mother Earth and agriculture.',
        hi: 'धरा की उर्वरा शक्ति और संपूर्ण प्रकृति के प्रति नमन।',
        bho: 'माटी के कोख से उपजल हरदी-आदि से प्रकृति पूजा।'
      },
      icon: '🌿',
      placed: false
    },
    {
      id: 'singhara',
      name: { en: 'Water Chestnuts (सिंघाड़ा)', hi: 'ताजा सिंघाड़ा (जलफल)', bho: 'कांटदार सिंघाड़ा' },
      category: 'Aquatic Harvest',
      significance: {
        en: 'Water-harvested pure fruit untouched by land plowing, symbolizing unblemished purity.',
        hi: 'हल से न जोते जाने वाला जलज फल, जो निष्पाप शुद्धि का प्रतीक है।',
        bho: 'जल के फल, जवना के कवनो हर-बैल ना छूवे।'
      },
      icon: '🌰',
      placed: false
    },
    {
      id: 'thekua',
      name: { en: 'Sacred Thekua', hi: 'शुद्ध घी का ठेकुआ व खजूरिया', bho: 'घीव के ठेकुआ' },
      category: 'Mahaprasad',
      significance: {
        en: 'Cooked with pure cow ghee, whole wheat, and dark jaggery over mango wood hearth.',
        hi: 'आम की लकड़ी के चूल्हे पर बना महापवित्र महाप्रसाद।',
        bho: 'माटी के चूल्हा पर छनाइल अमर महाप्रसाद।'
      },
      icon: '🍪',
      placed: false
    },
    {
      id: 'diya',
      name: { en: 'Lit Terracotta Diya', hi: 'गाय के घी का अखंड दीपक', bho: 'बाती के दिया' },
      category: 'Fire Element',
      significance: {
        en: 'Illuminates darkness and carries prayer vibrations straight to Surya Dev.',
        hi: 'अज्ञान के अंधकार को मिटाकर प्रकाश के स्रोत सूर्य देव का आह्वान।',
        bho: 'सुरुज भगवान के नजर उतारे वाला अखंड दिया।'
      },
      icon: '🪔',
      placed: false
    }
  ];

  const [items, setItems] = useState<SamagriItem[]>(initialItems);

  const placedCount = items.filter((i) => i.placed).length;
  const isAllPlaced = placedCount === items.length;

  const handlePlaceItem = (id: string) => {
    audio.playWoodThud();
    audio.playBell();

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, placed: true } : item))
    );

    if (placedCount + 1 === items.length) {
      audio.playShankh();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F37021', '#FFB703', '#E63946'],
      });
      onComplete();
    }
  };

  const handleReset = () => {
    setItems(initialItems);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel-glow rounded-3xl p-6 md:p-8 border border-amber-500/40 text-amber-50 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-amber-950/60 hover:bg-amber-800 text-amber-300 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            बाँस का सूप (Sacred Winnowing Tray)
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-rozha text-amber-300">
            {t.title}
          </h2>
          <p className="text-xs md:text-sm text-amber-200/80 mt-1 max-w-lg mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Visual Woven Bamboo Soop Centerpiece */}
        <div className="relative w-full max-w-md mx-auto aspect-[1.25/1] rounded-3xl bg-gradient-to-b from-[#b07d4b] via-[#8d5b4c] to-[#582f0e] border-8 border-[#d4a373] p-6 shadow-2xl flex flex-col items-center justify-center overflow-hidden mb-6">
          {/* Bamboo Woven Texture Grid Lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffdd00_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Central Red Vermilion Swastika */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <span className="text-8xl text-red-600 font-bold select-none">卐</span>
          </div>

          {/* Placed Offerings Grid Inside Soop */}
          <div className="relative z-10 grid grid-cols-3 gap-3 w-full h-full p-2 items-center justify-items-center">
            {items.map((item) => (
              <div
                key={item.id}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center p-1 border-2 transition-all duration-300 ${
                  item.placed
                    ? 'bg-amber-950/70 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-100 animate-fadeIn'
                    : 'border-dashed border-amber-300/30 bg-black/20 text-amber-300/40'
                }`}
              >
                {item.placed ? (
                  <>
                    <span className="text-2xl md:text-3xl filter drop-shadow">{item.icon}</span>
                    <span className="text-[9px] text-amber-200 font-medium text-center truncate w-full mt-0.5">
                      {item.name[lang]}
                    </span>
                  </>
                ) : (
                  <span className="text-xs font-semibold text-amber-300/50 text-center">
                    खाली
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Golden glow at edge */}
          <div className="absolute -bottom-4 -left-4 -right-4 h-12 bg-amber-500/20 blur-xl pointer-events-none" />
        </div>

        {/* Status / Instructions */}
        <p className="text-center text-xs md:text-sm text-amber-300/90 mb-4 font-medium">
          {isAllPlaced ? (
            <span className="text-amber-300 font-bold flex items-center justify-center gap-1.5 animate-bounce">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {t.readyForGhat}
            </span>
          ) : (
            t.dragInstruction
          )}
        </p>

        {/* Selection items tray */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {items.map((item) => (
            <button
              key={item.id}
              disabled={item.placed}
              onClick={() => handlePlaceItem(item.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                item.placed
                  ? 'bg-amber-950/30 border-stone-800 text-stone-500 opacity-60 cursor-not-allowed'
                  : 'bg-amber-950/60 hover:bg-amber-900/80 border-amber-500/40 text-amber-100 hover:scale-[1.02] active:scale-95 shadow-md'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate text-amber-200 flex items-center justify-between">
                  <span>{item.name[lang]}</span>
                  {item.placed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 ml-1 flex-shrink-0" />}
                </div>
                <div className="text-[10px] text-amber-300/70 line-clamp-2 mt-0.5">
                  {item.significance[lang]}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Reset / Actions */}
        <div className="mt-6 flex justify-between items-center text-xs text-amber-300/80">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            सूप पुनः सजाएं (Reset)
          </button>
          <span className="text-amber-400/90 font-semibold">
            सजाए गए फल: {placedCount} / {items.length}
          </span>
        </div>
      </div>
    </div>
  );
};
