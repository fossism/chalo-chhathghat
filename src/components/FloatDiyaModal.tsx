import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';
import { translations } from '../i18n/translations';
import { Language, FloatingDiya } from '../types';
import { Sparkles, X, MapPin, User, MessageCircleHeart } from 'lucide-react';

interface FloatDiyaModalProps {
  lang: Language;
  onClose: () => void;
  onAddDiya: (diya: FloatingDiya) => void;
  globalCount: number;
}

export const FloatDiyaModal: React.FC<FloatDiyaModalProps> = ({
  lang,
  onClose,
  onAddDiya,
  globalCount,
}) => {
  const t = translations[lang].diyaWall;
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [wish, setWish] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    audio.playWaterSplash();
    audio.playBell();

    const newDiya: FloatingDiya = {
      id: Math.random().toString(36).substring(7),
      name: name.trim(),
      location: location.trim() || 'Global Devotee',
      wish: wish.trim() || 'सबके सुख, शांति और स्वास्थ्य की कामना।',
      x: (Math.random() - 0.5) * 8,
      z: 2.5 + Math.random() * 4.5,
      color: '#ffba08',
      timestamp: Date.now(),
    };

    onAddDiya(newDiya);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFB703', '#F37021', '#E63946', '#FEE440'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-6 md:p-8 border border-amber-500/50 text-amber-50 shadow-2xl">
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
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(251,191,36,0.5)] animate-diya">
            <span className="text-3xl">🪔</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-rozha text-amber-300">
            {t.title}
          </h2>
          <p className="text-xs md:text-sm text-amber-200/80 mt-1">
            {t.subtitle}
          </p>

          {/* Global Count pill */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-400/40 text-[11px] text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-amber-200">
              {(globalCount + 15420).toLocaleString()}
            </span>{' '}
            {t.globalCountText}
          </div>
        </div>

        {/* Prayer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              {t.nameLabel} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. रोहित कुमार / Aarti Singh"
              className="w-full px-4 py-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 focus:border-amber-400 focus:outline-none text-sm text-amber-50 placeholder-amber-400/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {t.locationLabel}
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. पटना, बिहार / Delhi / New Jersey / London"
              className="w-full px-4 py-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 focus:border-amber-400 focus:outline-none text-sm text-amber-50 placeholder-amber-400/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1 flex items-center gap-1.5">
              <MessageCircleHeart className="w-3.5 h-3.5 text-amber-400" />
              {t.wishLabel}
            </label>
            <textarea
              rows={3}
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="e.g. हे छठी मइया! सबके आरोग्य, परिवार में सुख-शांति और प्रकृति की रक्षा का आशीष दीं..."
              className="w-full px-4 py-2 rounded-xl bg-amber-950/50 border border-amber-500/40 focus:border-amber-400 focus:outline-none text-sm text-amber-50 placeholder-amber-400/30 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-amber-950 font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <span>🪔</span>
            {t.submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
};
