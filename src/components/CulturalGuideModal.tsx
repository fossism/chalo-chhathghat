import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import { Sparkles, X, Sun, Heart, Users, Feather } from 'lucide-react';

interface CulturalGuideModalProps {
  lang: Language;
  onClose: () => void;
}

export const CulturalGuideModal: React.FC<CulturalGuideModalProps> = ({ lang, onClose }) => {
  const t = translations[lang].lore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel-glow rounded-3xl p-6 md:p-8 border border-amber-500/50 text-amber-50 shadow-2xl max-h-[90vh] overflow-y-auto">
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
            दर्शन, विज्ञान व आस्था (Vedic Heritage)
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-rozha text-amber-300">
            {t.title}
          </h2>
          <p className="text-xs md:text-sm text-amber-100/80 mt-2 max-w-xl mx-auto leading-relaxed">
            {t.intro}
          </p>
        </div>

        {/* 4 Pillars of Chhath */}
        <div className="space-y-4">
          {/* Pillar 1: Absolute Equality */}
          <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm md:text-base font-bold text-amber-200">
                {t.pillar1Title}
              </h3>
            </div>
            <p className="text-xs text-amber-100/75 leading-relaxed pl-6">
              {t.pillar1Desc}
            </p>
          </div>

          {/* Pillar 2: Orange Matiya Sindoor */}
          <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1.5">
              <Feather className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm md:text-base font-bold text-amber-200">
                {t.pillar2Title}
              </h3>
            </div>
            <p className="text-xs text-amber-100/75 leading-relaxed pl-6">
              {t.pillar2Desc}
            </p>
          </div>

          {/* Pillar 3: Setting Sun worship first */}
          <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm md:text-base font-bold text-amber-200">
                {t.pillar3Title}
              </h3>
            </div>
            <p className="text-xs text-amber-100/75 leading-relaxed pl-6">
              {t.pillar3Desc}
            </p>
          </div>

          {/* Pillar 4: The 36-hour Nirjala Fast */}
          <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1.5">
              <Heart className="w-4 h-4 text-red-400" />
              <h3 className="text-sm md:text-base font-bold text-amber-200">
                {t.pillar4Title}
              </h3>
            </div>
            <p className="text-xs text-amber-100/75 leading-relaxed pl-6">
              {t.pillar4Desc}
            </p>
          </div>
        </div>

        {/* Famous Sharda Sinha folk verse */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-900/60 to-orange-950/80 border border-amber-400/40 text-center">
          <p className="text-sm font-rozha text-amber-200 italic mb-1">
            "काँच ही बाँस के बहँगिया, बहँगी लचकति जाए...<br />
            उ जे बटोहिया रँग-रसिया, बहँगी घाटे पहुँचाए।"
          </p>
          <span className="text-[10px] text-amber-400 font-semibold tracking-wider">
            — बिहार कोकिला पद्म भूषण स्व. शारदा सिन्हा जी को सादर नमन
          </span>
        </div>
      </div>
    </div>
  );
};
