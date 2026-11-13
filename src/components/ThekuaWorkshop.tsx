import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import { Flame, Sparkles, CheckCircle2, RotateCcw, X } from 'lucide-react';

interface ThekuaWorkshopProps {
  lang: Language;
  onClose: () => void;
  onComplete: () => void;
}

export const ThekuaWorkshop: React.FC<ThekuaWorkshopProps> = ({ lang, onClose, onComplete }) => {
  const t = translations[lang].thekuaSteps;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isFrying, setIsFrying] = useState<boolean>(false);
  const [friedCount, setFriedCount] = useState<number>(0);

  const handleStep1 = () => {
    audio.playWoodThud();
    setCurrentStep(2);
  };

  const handleStep2 = () => {
    audio.playWaterSplash();
    setCurrentStep(3);
  };

  const handleStep3 = () => {
    audio.playWaterSplash();
    setCurrentStep(4);
  };

  const handlePressSaancha = () => {
    audio.playWoodThud();
    audio.playBell();
    setCurrentStep(5);
  };

  const handleFry = () => {
    setIsFrying(true);
    audio.playSizzle(3000);
    setTimeout(() => {
      setIsFrying(false);
      setFriedCount((prev) => prev + 1);
      audio.playBell();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F37021', '#FFB703', '#E63946', '#FEE440'],
      });
      onComplete();
    }, 3000);
  };

  const resetWorkshop = () => {
    setCurrentStep(1);
    setIsFrying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel-glow rounded-3xl p-6 md:p-8 border border-amber-500/40 text-amber-50 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-amber-950/60 hover:bg-amber-800 text-amber-300 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            पवित्र महाप्रसाद निर्माण (Sacred Cooking)
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-rozha text-amber-300">
            {t.title}
          </h2>
          <p className="text-xs md:text-sm text-amber-200/80 mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-between items-center mb-6 px-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentStep === s
                    ? 'bg-amber-500 text-amber-950 ring-4 ring-amber-400/30 scale-110 shadow-lg'
                    : currentStep > s
                    ? 'bg-amber-700 text-amber-200'
                    : 'bg-stone-800 text-stone-500'
                }`}
              >
                {currentStep > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span className="text-[10px] text-amber-300/70 mt-1 font-medium hidden sm:block">
                {s === 1 ? 'आटा' : s === 2 ? 'मोयन' : s === 3 ? 'गुड़' : s === 4 ? 'सांचा' : 'छानना'}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Workshop Canvas / Area */}
        <div className="glass-card rounded-2xl p-6 border border-amber-600/30 min-h-[260px] flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Step 1: Flour & Spices */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center shadow-inner border-4 border-amber-600/40">
                <span className="text-3xl">🌾</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-200">{t.step1}</h3>
                <p className="text-xs md:text-sm text-amber-100/75 max-w-md mx-auto mt-1">
                  {t.step1Desc}
                </p>
              </div>
              <button
                onClick={handleStep1}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                {t.btnMix}
              </button>
            </div>
          )}

          {/* Step 2: Desi Cow Ghee (Moyan) */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-lg border-4 border-yellow-600/50">
                <span className="text-3xl">🧈</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-200">{t.step2}</h3>
                <p className="text-xs md:text-sm text-amber-100/75 max-w-md mx-auto mt-1">
                  {t.step2Desc}
                </p>
              </div>
              <button
                onClick={handleStep2}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-amber-950 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                {t.btnKnead}
              </button>
            </div>
          )}

          {/* Step 3: Pure Jaggery Syrup */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-800 to-amber-950 flex items-center justify-center shadow-lg border-4 border-amber-600">
                <span className="text-3xl">🍯</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-200">{t.step3}</h3>
                <p className="text-xs md:text-sm text-amber-100/75 max-w-md mx-auto mt-1">
                  {t.step3Desc}
                </p>
              </div>
              <button
                onClick={handleStep3}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-amber-100 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                {t.btnPourSyrup}
              </button>
            </div>
          )}

          {/* Step 4: Wooden Mould (Saancha) Imprint */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              {/* Wooden Saancha Visual representation */}
              <div
                onClick={handlePressSaancha}
                className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-[#8d5b4c] to-[#582f0e] border-4 border-amber-700/80 flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xl group"
                title="Click to stamp dough with wooden mould!"
              >
                {/* Sun and Lotus Engraved Motif */}
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-300/60 flex items-center justify-center group-hover:border-amber-200 transition-colors">
                  <span className="text-3xl">☀️</span>
                </div>
                <span className="text-[10px] text-amber-300 font-semibold mt-1">
                  काठ के सांचा (लकड़ी का सांचा)
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-200">{t.step4}</h3>
                <p className="text-xs md:text-sm text-amber-100/75 max-w-md mx-auto mt-1">
                  {t.step4Desc}
                </p>
              </div>
              <button
                onClick={handlePressSaancha}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-50 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 mx-auto"
              >
                <span>🔨</span>
                {t.btnPressSaancha}
              </button>
            </div>
          )}

          {/* Step 5: Frying in Mitti ka Chulha */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                {/* Earthen stove flame glow */}
                <div
                  className={`w-28 h-28 rounded-full border-4 border-amber-600 flex items-center justify-center transition-all ${
                    isFrying
                      ? 'bg-gradient-to-t from-orange-600 via-amber-500 to-yellow-400 animate-pulse-glow shadow-[0_0_30px_#f97316]'
                      : 'bg-[#6b3519]'
                  }`}
                >
                  <span className="text-4xl">{isFrying ? '🔥' : '🪔'}</span>
                </div>
                {isFrying && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-950/90 px-3 py-1 rounded-full border border-amber-500 animate-bounce">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    शुद्ध घी में तल रहा है... (Sizzling!)
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-amber-200">{t.step5}</h3>
                <p className="text-xs md:text-sm text-amber-100/75 max-w-md mx-auto mt-1">
                  {t.step5Desc}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  disabled={isFrying}
                  onClick={handleFry}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:opacity-50 text-amber-50 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  {isFrying ? 'तल रहा है...' : t.btnFry}
                </button>
              </div>

              {friedCount > 0 && !isFrying && (
                <div className="mt-3 p-3 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs">
                  🎉 {t.completedMsg} (तैयार ठेकुआ: {friedCount})
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="mt-6 flex justify-between items-center text-xs text-amber-300/80">
          <button
            onClick={resetWorkshop}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            पुनः आरम्भ करें (Start Over)
          </button>
          <span>छठी मइया का पावन भोग</span>
        </div>
      </div>
    </div>
  );
};
