import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Users,
  Compass,
  Volume2,
  VolumeX,
  BookOpen,
  Award,
  Flame,
  Radio,
  X,
} from 'lucide-react';
import { ChhathDay, Language, JugaadCard } from '../types';

interface GameHUDProps {
  kafilaCount: number;
  nishtha: number;
  thekuaCount: number;
  distanceToGhat: number;
  currentDay: ChhathDay;
  onSelectDay: (day: ChhathDay) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onActionArghya: () => void;
  onActionShankh: () => void;
  onActionJaykara: () => void;
  onActionDiya: () => void;
  onActionThekua: () => void;
  onActionSoop: () => void;
  onOpenGuide: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onJoystickMove: (dx: number, dy: number) => void;
  onJoystickEnd: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  kafilaCount,
  nishtha,
  thekuaCount,
  distanceToGhat,
  currentDay,
  onSelectDay,
  lang,
  onSelectLang,
  onActionArghya,
  onActionShankh,
  onActionJaykara,
  onActionDiya,
  onActionThekua,
  onActionSoop,
  onOpenGuide,
  isMuted,
  onToggleMute,
  onJoystickMove,
  onJoystickEnd,
}) => {
  // Breaking News / Akashvani Ticker
  const newsTicker = [
    '🔴 आकाशवाणी पटना: दीघा व कलेक्ट्रेट घाट पर 10 लाख श्रद्धालुओं का सैलाब, गूंज रहे शारदा सिन्हा के स्वर!',
    '🔴 ताजा खबर: आपका छठ काफिला गंगा जी की ओर बढ़ रहा है, गाँव के लोग साथ जुड़ रहे हैं!',
    '🔴 मौसम बुलेटिन: कार्तिक शुक्ल षष्ठी, गंगा जी का जल शीतल, अस्ताचलगामी सूर्य को अर्घ्य की पावन बेला!',
    '🔴 घाट संदेश: बाँस के सूप में डाभ नींबू, हल्दी, नारियल सजाकर कमर भर पानी में खड़े हों!',
    '🔴 लोक आस्था: न कोई पंडित, न कोई बिचौलिया — सीधे साक्षात सूर्य देव और छठी मइया से साक्षात्कार!',
  ];
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsTicker.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Cards Tray (Jugaad Cards like Mantar Jantar)
  const [isCardsOpen, setIsCardsOpen] = useState(false);
  const cards: JugaadCard[] = [
    {
      id: 'haldi',
      title: 'Kachhi Haldi Boost',
      hindiTitle: 'पत्तेदार कच्ची हल्दी',
      desc: 'धरती की उर्वरा शक्ति — चलने की गति +50% बढ़ जाती है!',
      icon: '🌿',
      unlocked: true,
    },
    {
      id: 'sharda',
      title: 'Sharda Sinha Cassette',
      hindiTitle: 'शारदा सिन्हा लोकगीत कैसेट',
      desc: 'काँच ही बाँस के बहँगिया बजते ही 10 नए लोग काफिले में जुड़ते हैं!',
      icon: '📻',
      unlocked: kafilaCount >= 3,
    },
    {
      id: 'ghee',
      title: 'Shuddh Desi Ghee',
      hindiTitle: 'गाय का शुद्ध घी',
      desc: 'निष्ठा व पवित्रता 100% रिफिल हो जाती है!',
      icon: '🧈',
      unlocked: true,
    },
    {
      id: 'kosi',
      title: 'Kosi Haathi Blessing',
      hindiTitle: 'कोसी हाथी दीपदान',
      desc: '24 अखंड मिट्टी के दीपक एक साथ गंगा जी को आलोकित करते हैं!',
      icon: '🐘',
      unlocked: distanceToGhat <= 15,
    },
  ];

  // Virtual Joystick Touch Handling
  const joystickRef = React.useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    handleTouchMove(e);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging && e.type !== 'touchstart' && e.type !== 'mousedown') return;
    if (!joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.min(Math.hypot(deltaX, deltaY), 45);
    const angle = Math.atan2(deltaY, deltaX);

    const kX = Math.cos(angle) * distance;
    const kY = Math.sin(angle) * distance;

    setKnobPos({ x: kX, y: kY });
    onJoystickMove(kX / 45, kY / 45);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setKnobPos({ x: 0, y: 0 });
    onJoystickEnd();
  };

  // Rank name based on kafila size
  const rankTitle =
    kafilaCount >= 15
      ? '🏆 छठ महानायक (Ghat Legend)'
      : kafilaCount >= 8
      ? '🚩 काफिला नायक (Procession Leader)'
      : kafilaCount >= 4
      ? '🧺 दउरा वाहक (Daura Bearer)'
      : '🌱 व्रती (Seeker)';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-2 md:p-4">
      {/* 1. TOP BAR: Breaking News Ticker & Stats */}
      <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
        {/* Akashvani Ticker (Mantar Jantar Style) */}
        <div className="pointer-events-auto flex items-center justify-between px-3 py-1.5 rounded-full bg-gradient-to-r from-red-950/90 via-amber-950/90 to-red-950/90 border border-amber-500/50 shadow-xl backdrop-blur-md text-xs font-semibold text-amber-200">
          <div className="flex items-center gap-2 truncate">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse flex-shrink-0" />
            <span className="truncate">{newsTicker[newsIndex]}</span>
          </div>

          <div className="flex items-center gap-1.5 ml-3 flex-shrink-0">
            {/* Lang switcher */}
            <div className="hidden sm:flex rounded-lg bg-black/40 p-0.5 border border-amber-500/30 text-[10px]">
              <button
                onClick={() => onSelectLang('hi')}
                className={`px-1.5 py-0.5 rounded ${lang === 'hi' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-300'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => onSelectLang('bho')}
                className={`px-1.5 py-0.5 rounded ${lang === 'bho' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-300'}`}
              >
                भोजपुरी
              </button>
              <button
                onClick={() => onSelectLang('en')}
                className={`px-1.5 py-0.5 rounded ${lang === 'en' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-300'}`}
              >
                EN
              </button>
            </div>

            {/* Mute */}
            <button
              onClick={onToggleMute}
              className="p-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Status Hub (Kafila Size, Nishtha, Distance) */}
        <div className="flex items-center justify-between gap-2">
          {/* Top Left: Kafila & Nishtha Cards */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Kafila Counter */}
            <div className="glass-panel px-3 py-1.5 rounded-2xl border border-amber-500/40 flex items-center gap-2 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-amber-950 text-xs shadow">
                👥
              </div>
              <div>
                <div className="text-[10px] text-amber-300/80 font-medium">छठ काफिला</div>
                <div className="text-xs md:text-sm font-bold text-amber-100 flex items-center gap-1">
                  <span>{kafilaCount} लोग</span>
                  <span className="text-[10px] text-amber-400 hidden sm:inline">({rankTitle})</span>
                </div>
              </div>
            </div>

            {/* Nishtha Bar */}
            <div className="glass-panel px-3 py-1.5 rounded-2xl border border-amber-500/40 hidden sm:flex flex-col min-w-[120px] shadow-lg">
              <div className="flex justify-between text-[10px] text-amber-300 font-semibold mb-0.5">
                <span>निष्ठा व शुचिता</span>
                <span>{nishtha}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden border border-amber-600/40">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${nishtha}%` }}
                />
              </div>
            </div>

            {/* Distance to Ghat */}
            <div className="glass-panel px-2.5 py-1.5 rounded-2xl border border-amber-500/40 flex items-center gap-1.5 text-xs font-bold text-amber-200">
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:8s]" />
              <span>घाट: {Math.max(0, Math.round(distanceToGhat))}m</span>
            </div>
          </div>

          {/* Top Right: Day Tabs & Lore Guide */}
          <div className="pointer-events-auto flex items-center gap-1.5">
            {/* Day Switcher */}
            <div className="flex items-center gap-1 glass-panel p-1 rounded-2xl border border-amber-500/40">
              {(
                [
                  { id: 'nahay-khay', icon: '🌿', name: 'नहाय-खाय' },
                  { id: 'kharna', icon: '🪔', name: 'खरना' },
                  { id: 'sandhya-arghya', icon: '🌅', name: 'संध्या' },
                  { id: 'usha-arghya', icon: '🌄', name: 'उषा' },
                ] as const
              ).map((d) => (
                <button
                  key={d.id}
                  onClick={() => onSelectDay(d.id)}
                  className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                    currentDay === d.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 shadow-md scale-105'
                      : 'text-amber-200/80 hover:bg-amber-950/60'
                  }`}
                >
                  <span>{d.icon}</span>
                  <span className="hidden md:inline">{d.name}</span>
                </button>
              ))}
            </div>

            {/* Guide Button */}
            <button
              onClick={onOpenGuide}
              className="p-2 rounded-2xl glass-panel border border-amber-500/40 text-amber-300 hover:text-amber-100 shadow"
              title="Cultural Guide"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM CONTROLS: Virtual Joystick, Action Powers & Cards Drawer */}
      <div className="flex items-end justify-between w-full max-w-7xl mx-auto gap-4">
        {/* Bottom Left: Virtual Touch Joystick (Mobile & Mouse) */}
        <div className="pointer-events-auto flex flex-col items-center">
          <div
            ref={joystickRef}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full glass-panel-glow border-2 border-amber-400/50 flex items-center justify-center relative touch-none shadow-2xl"
          >
            {/* Base crosshairs */}
            <div className="absolute w-full h-[1px] bg-amber-500/20" />
            <div className="absolute h-full w-[1px] bg-amber-500/20" />
            {/* Movable Knob */}
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 border-2 border-amber-200 shadow-lg flex items-center justify-center font-bold text-amber-950 text-xs transition-transform duration-75"
              style={{
                transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
              }}
            >
              दउरा
            </div>
          </div>
          <span className="text-[10px] text-amber-300/80 mt-1 font-semibold hidden md:block">
            WASD / एरो कुंजियाँ या जॉयस्टिक
          </span>
        </div>

        {/* Bottom Center: Jugaad & Blessing Cards Trigger */}
        <div className="pointer-events-auto flex flex-col items-center">
          <button
            onClick={() => setIsCardsOpen(!isCardsOpen)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel-glow border border-amber-400 text-amber-200 font-bold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>छठ आशीष कार्ड्स (Cards)</span>
          </button>
        </div>

        {/* Bottom Right: Action Power Buttons (Mantar Jantar Style R / B / Q / E buttons) */}
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          {/* Upper row of mini action buttons */}
          <div className="flex items-center gap-2">
            {/* Thekua Prasad Button */}
            <button
              onClick={onActionThekua}
              className="p-2.5 rounded-2xl glass-panel-glow border border-amber-400/60 text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center w-12 h-12"
              title="Make / Share Thekua [R]"
            >
              <span className="text-base">🍪</span>
              <span className="text-[8px] font-bold text-amber-300">ठेकुआ</span>
            </button>

            {/* Assemble Soop Button */}
            <button
              onClick={onActionSoop}
              className="p-2.5 rounded-2xl glass-panel-glow border border-amber-400/60 text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center w-12 h-12"
              title="Arrange Soop [C]"
            >
              <span className="text-base">🧺</span>
              <span className="text-[8px] font-bold text-amber-300">सूप</span>
            </button>

            {/* Float Diya Button */}
            <button
              onClick={onActionDiya}
              className="p-2.5 rounded-2xl glass-panel-glow border border-amber-400/60 text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center w-12 h-12 animate-diya"
              title="Float Diya [F]"
            >
              <span className="text-base">🪔</span>
              <span className="text-[8px] font-bold text-amber-300">दीपदान</span>
            </button>
          </div>

          {/* Lower row of primary powers */}
          <div className="flex items-center gap-2">
            {/* Blow Shankh [Q] */}
            <button
              onClick={onActionShankh}
              className="px-3.5 py-2.5 rounded-2xl bg-amber-950/80 hover:bg-amber-900 border border-amber-400/60 text-amber-200 text-xs font-bold flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all"
              title="Sound Sacred Shankha [Q]"
            >
              <span className="text-lg">🐚</span>
              <span className="hidden sm:inline">शंखनाद [Q]</span>
            </button>

            {/* Jaykara Chant [E] (Recruit Villagers) */}
            <button
              onClick={onActionJaykara}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-amber-950 text-xs font-extrabold flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all"
              title="Chant Jai Chhathi Maiya [E]"
            >
              <Users className="w-4 h-4 text-amber-950" />
              <span>जयकारा [E]</span>
            </button>

            {/* Primary Sacred Arghya Button [Space] */}
            <button
              onClick={onActionArghya}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 hover:from-amber-300 hover:to-red-500 text-amber-950 text-xs md:text-sm font-extrabold flex items-center gap-2 shadow-[0_0_25px_rgba(251,191,36,0.8)] hover:scale-105 active:scale-95 transition-all animate-pulse"
              title="Offer Holy Arghya [Spacebar]"
            >
              <Sparkles className="w-4 h-4" />
              <span>अर्घ्य अर्पण [Space]</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. JUGAAD / BLESSING CARDS DRAWER MODAL */}
      {isCardsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto animate-fadeIn">
          <div className="w-full max-w-2xl glass-panel-glow rounded-3xl p-6 border border-amber-500/50 text-amber-50 shadow-2xl mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-rozha text-amber-300">
                  छठ आशीष कार्ड संग्रह (Blessing Cards)
                </h3>
              </div>
              <button
                onClick={() => setIsCardsOpen(false)}
                className="p-1.5 rounded-full bg-amber-950 hover:bg-amber-800 text-amber-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    card.unlocked
                      ? 'bg-amber-950/70 border-amber-400/50 shadow-md'
                      : 'bg-stone-900/40 border-stone-800 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="text-3xl">{card.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200">
                      {card.hindiTitle}
                    </h4>
                    <span className="text-[10px] text-amber-400 font-medium block mb-1">
                      {card.title}
                    </span>
                    <p className="text-[11px] text-amber-100/70 leading-normal">
                      {card.desc}
                    </p>
                    <span className="inline-block mt-2 text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      {card.unlocked ? '✅ सक्रिय (Active)' : '🔒 काफिला बढ़ाने पर अनलॉक'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
