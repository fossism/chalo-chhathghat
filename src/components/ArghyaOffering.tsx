import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';
import { translations } from '../i18n/translations';
import { Language, ChhathDay } from '../types';
import { Sun, Sparkles, X, Heart } from 'lucide-react';

interface ArghyaOfferingProps {
  lang: Language;
  currentDay: ChhathDay;
  onClose: () => void;
  onArghyaPoured: () => void;
}

export const ArghyaOffering: React.FC<ArghyaOfferingProps> = ({
  lang,
  currentDay,
  onClose,
  onArghyaPoured,
}) => {
  const t = translations[lang].arghya;
  const isMorning = currentDay === 'usha-arghya';
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [hasOffered, setHasOffered] = useState<boolean>(false);

  const handlePourArghya = () => {
    setIsPouring(true);
    audio.playWaterSplash();
    audio.playShankh();
    audio.playBell();
    onArghyaPoured();

    setTimeout(() => {
      setIsPouring(false);
      setHasOffered(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FFB703', '#F37021', '#E63946', '#FFFFFF', '#FEE440'],
      });
    }, 2800);
  };

  const handleSoundShankh = () => {
    audio.playShankh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel-glow rounded-3xl p-6 md:p-8 border border-amber-500/50 text-amber-50 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-amber-950/60 hover:bg-amber-800 text-amber-300 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Badge */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin [animation-duration:12s]" />
            {isMorning ? 'उषा अर्घ्य (Morning Dawn Arghya)' : 'संध्या अर्घ्य (Sunset Evening Arghya)'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-rozha text-amber-300">
            {t.title}
          </h2>
          <p className="text-xs md:text-sm text-amber-200/80 mt-1 max-w-md mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Visual Stream of Sacred Arghya */}
        <div className="relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-b from-amber-950/90 via-[#421d0a] to-[#0f2438] border-2 border-amber-500/40 p-4 flex flex-col items-center justify-between overflow-hidden shadow-inner mb-6">
          {/* Sun in background */}
          <div className="flex flex-col items-center animate-pulse-glow">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.8)] border-4 border-amber-300 ${
                isMorning
                  ? 'bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300'
                  : 'bg-gradient-to-t from-purple-700 via-red-600 to-amber-500'
              }`}
            >
              <Sun className="w-10 h-10 text-amber-100" />
            </div>
            <span className="text-[11px] font-bold text-amber-200 mt-1.5 tracking-wider">
              {isMorning ? 'उदीयमान सूर्य (Rising Sun)' : 'अस्ताचलगामी सूर्य (Setting Sun)'}
            </span>
          </div>

          {/* Flowing Arghya Stream Animation */}
          {isPouring && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {/* Sacred Copper Kalash pouring */}
              <div className="w-12 h-16 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 border-2 border-amber-300 -rotate-45 shadow-xl flex items-center justify-center animate-bounce">
                <span className="text-sm font-bold text-amber-100">तांबा</span>
              </div>
              {/* Milk and Gangajal Stream */}
              <div className="w-2.5 h-32 bg-gradient-to-b from-amber-100 via-white to-amber-200 rounded-full blur-[0.5px] animate-pulse shadow-[0_0_15px_#fff]" />
              <div className="text-xs text-amber-200 font-bold bg-amber-950/90 px-3 py-1 rounded-full border border-amber-400 mt-2">
                दूध व गंगाजल की पावन धार प्रवाहित हो रही है...
              </div>
            </div>
          )}

          {/* River Water Surface with Lotus Petals */}
          <div className="w-full flex items-center justify-center gap-2 py-2 border-t border-amber-500/30">
            <span className="text-lg">🪷</span>
            <span className="text-xs text-cyan-200/90 font-medium">
              पवित्र गंगा जल (Waist-deep in Holy Water)
            </span>
            <span className="text-lg">🪷</span>
          </div>
        </div>

        {/* Philosophy Explanation */}
        <div className="mb-6 p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
          {isMorning ? t.welcomingRisingSun : t.gratitudeSettingSun}
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            disabled={isPouring}
            onClick={handlePourArghya}
            className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-amber-950 font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isPouring ? 'अर्घ्य अर्पण हो रहा है...' : t.pourMilkWater}
          </button>

          <button
            onClick={handleSoundShankh}
            className="py-3 px-5 rounded-full bg-amber-900/80 hover:bg-amber-800/90 border border-amber-400/50 text-amber-200 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🐚</span>
            {t.soundShankh}
          </button>
        </div>

        {hasOffered && (
          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-600/30 to-orange-600/30 border border-amber-400 text-center text-xs md:text-sm text-amber-200 font-semibold animate-fadeIn flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            {t.sunBlessing}
          </div>
        )}
      </div>
    </div>
  );
};
