import React from 'react';
import { ChhathDay, Language } from '../types';
import { translations } from '../i18n/translations';
import { audio } from '../utils/audio';
import {
  Sun,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  Flame,
  Globe,
  Bell,
  Waves,
} from 'lucide-react';

interface NavbarProps {
  currentDay: ChhathDay;
  onSelectDay: (day: ChhathDay) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenThekua: () => void;
  onOpenSoop: () => void;
  onOpenArghya: () => void;
  onOpenDiya: () => void;
  onOpenGuide: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDay,
  onSelectDay,
  lang,
  onSelectLang,
  onOpenThekua,
  onOpenSoop,
  onOpenArghya,
  onOpenDiya,
  onOpenGuide,
  isMuted,
  onToggleMute,
}) => {
  const t = translations[lang];

  const days: { id: ChhathDay; label: string; icon: string }[] = [
    { id: 'nahay-khay', label: t.daysShort['nahay-khay'], icon: '🌿' },
    { id: 'kharna', label: t.daysShort['kharna'], icon: '🪔' },
    { id: 'sandhya-arghya', label: t.daysShort['sandhya-arghya'], icon: '🌅' },
    { id: 'usha-arghya', label: t.daysShort['usha-arghya'], icon: '🌄' },
  ];

  const handleDayClick = (dayId: ChhathDay) => {
    audio.playBell();
    onSelectDay(dayId);
  };

  const handleSoundShankh = () => {
    audio.playShankh();
  };

  const handleRingBell = () => {
    audio.playBell();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 py-2 md:px-6 md:py-3 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pointer-events-auto glass-panel rounded-2xl px-3 py-2 md:px-5 md:py-2.5 border border-amber-500/30">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg border border-amber-300">
              <Sun className="w-5 h-5 md:w-6 md:h-6 text-amber-100 animate-spin [animation-duration:15s]" />
            </div>
            <div>
              <h1 className="text-sm md:text-lg font-bold font-rozha text-amber-300 leading-tight flex items-center gap-1.5">
                {t.appTitle}
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-orange-600/30 text-orange-300 border border-orange-500/40">
                  बिहार व पूर्वांचल
                </span>
              </h1>
              <p className="text-[10px] md:text-xs text-amber-200/70 hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Center/Right Actions: Sound, Lore, Language */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Shankh Quick Button */}
            <button
              onClick={handleSoundShankh}
              className="p-1.5 md:px-3 md:py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
              title="Sound the Shankha (शंखनाद)"
            >
              <span>🐚</span>
              <span className="hidden md:inline">शंख</span>
            </button>

            {/* Bell Quick Button */}
            <button
              onClick={handleRingBell}
              className="p-1.5 md:px-3 md:py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
              title="Ring Bell (घंटी)"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">घंटी</span>
            </button>

            {/* Cultural Guide Button */}
            <button
              onClick={onOpenGuide}
              className="p-1.5 md:px-3 md:py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
              title="Cultural Lore & Vidhi"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">महिमा व विधि</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center rounded-xl bg-amber-950/80 p-0.5 border border-amber-500/30 text-[11px] font-semibold">
              <button
                onClick={() => onSelectLang('hi')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  lang === 'hi' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-300/70 hover:text-amber-200'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => onSelectLang('bho')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  lang === 'bho' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-300/70 hover:text-amber-200'
                }`}
              >
                भोजपुरी
              </button>
              <button
                onClick={() => onSelectLang('en')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  lang === 'en' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-300/70 hover:text-amber-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mute / Unmute */}
            <button
              onClick={onToggleMute}
              className="p-2 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 text-amber-300 transition-colors"
              title={isMuted ? t.actions.unmuteAudio : t.actions.muteAudio}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* 4 Days Selector Tabs & Main Interactive Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          {/* 4 Day Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl glass-panel border border-amber-500/30 overflow-x-auto max-w-full">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => handleDayClick(day.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  currentDay === day.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 shadow-md font-bold scale-[1.02]'
                    : 'text-amber-200/80 hover:bg-amber-950/50'
                }`}
              >
                <span>{day.icon}</span>
                <span>{day.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Feature Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Thekua Workshop Button */}
            <button
              onClick={onOpenThekua}
              className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/90 border border-amber-400/50 text-amber-200 text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.actions.thekuaWorkshop}</span>
            </button>

            {/* Assemble Soop Button */}
            <button
              onClick={onOpenSoop}
              className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/90 border border-amber-400/50 text-amber-200 text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <span>🧺</span>
              <span>{t.actions.assembleSoop}</span>
            </button>

            {/* Offer Arghya Button */}
            <button
              onClick={onOpenArghya}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-amber-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.actions.offerArghya}</span>
            </button>

            {/* Float Diya Button */}
            <button
              onClick={onOpenDiya}
              className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/90 border border-amber-400/50 text-amber-200 text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <span className="animate-diya">🪔</span>
              <span>{t.actions.floatDiya}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
