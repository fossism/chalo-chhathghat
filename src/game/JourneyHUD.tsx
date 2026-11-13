import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Users,
  Compass,
  Volume2,
  VolumeX,
  BookOpen,
  Award,
  Radio,
  X,
  MapPin,
  Camera,
  Film,
} from 'lucide-react';
import { ChhathDay, Language, JugaadCard } from '../types';
import { CameraPreset } from './FullJourney600mWorld';

interface JourneyHUDProps {
  currentMeters: number; // 0 to 600m
  kafilaCount: number;
  nishtha: number;
  thekuaCount: number;
  currentDay: ChhathDay;
  onSelectDay: (day: ChhathDay) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onTeleport: (meters: number) => void;
  cameraPreset: CameraPreset;
  onSelectCameraPreset: (preset: CameraPreset) => void;
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

export const JourneyHUD: React.FC<JourneyHUDProps> = ({
  currentMeters,
  kafilaCount,
  nishtha,
  thekuaCount,
  currentDay,
  onSelectDay,
  lang,
  onSelectLang,
  onTeleport,
  cameraPreset,
  onSelectCameraPreset,
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
  // Rotating Akashvani / News ticker
  const newsTicker = [
    '🔴 आकाशवाणी पटना: दीघा व कलेक्ट्रेट घाट पर 10 लाख श्रद्धालुओं का सैलाब, गूंज रहे शारदा सिन्हा के स्वर!',
    '🔴 600m छठ यात्रा: घर के आंगन से दउरा उठाकर पावन गंगा घाट की ओर बढ़ता आस्था का काफिला!',
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

  // Jugaad Cards modal
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
      unlocked: currentMeters >= 500,
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

  // Waypoints along the 600m journey
  const waypoints = [
    { meters: 0, label: '0m: घर (Home)', icon: '🏠' },
    { meters: 150, label: '150m: पगडंडी (Alley)', icon: '🌾' },
    { meters: 320, label: '320m: बाजार (Bazaar)', icon: '🎪' },
    { meters: 480, label: '480m: कछार (Trail)', icon: '🏖️' },
    { meters: 600, label: '600m: गंगा घाट (Ghat)', icon: '🌅' },
  ];

  // Current zone text
  const currentZoneText =
    currentMeters >= 540
      ? '🌅 महा पावन गंगा घाट (Surya Arghya Zone)'
      : currentMeters >= 420
      ? '🏖️ रेत व बालू का कछार (Riverbank Sand Trail)'
      : currentMeters >= 260
      ? '🎪 तोरण द्वार व सहरिया बाजार (Festive Bazaar)'
      : currentMeters >= 120
      ? '🌾 गाँव की पगडंडी व बस्ती (Village Alleys)'
      : '🏠 पैतृक घर का आंगन व तुलसी चौरा (Ancestral Home Courtyard)';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-2 md:p-4">
      {/* ========================================================= */}
      {/* 1. TOP HEADER: News Ticker, Stats & Day Switcher */}
      {/* ========================================================= */}
      <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
        {/* Akashvani Ticker (Mantar Jantar Style) */}
        <div className="pointer-events-auto flex items-center justify-between px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-950/90 via-amber-950/90 to-red-950/90 border border-amber-500/50 shadow-xl backdrop-blur-md text-xs font-semibold text-amber-200">
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

        {/* 600-Meter Journey Progress Tracker Bar */}
        <div className="pointer-events-auto glass-panel-glow px-4 py-2 rounded-2xl border border-amber-500/50 flex flex-col gap-1 shadow-2xl">
          <div className="flex items-center justify-between text-xs font-bold text-amber-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400 animate-bounce" />
              <span>{currentZoneText}</span>
            </div>
            <div className="text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40 text-[11px]">
              यात्रा: <strong>{Math.round(currentMeters)}m</strong> / 600m
            </div>
          </div>

          {/* Progress Bar with Moving Avatar */}
          <div className="relative w-full h-2.5 rounded-full bg-stone-950 overflow-hidden border border-amber-600/50">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (currentMeters / 600) * 100)}%` }}
            />
          </div>

          {/* 5 Quick Teleport Waypoint Buttons */}
          <div className="flex items-center justify-between gap-1 mt-1 overflow-x-auto">
            {waypoints.map((wp) => (
              <button
                key={wp.meters}
                onClick={() => onTeleport(wp.meters)}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                  Math.abs(currentMeters - wp.meters) < 60
                    ? 'bg-amber-500 text-amber-950 scale-105 shadow-md'
                    : 'bg-black/40 hover:bg-amber-950/60 text-amber-200/80'
                }`}
                title={`Teleport to ${wp.label}`}
              >
                <span>{wp.icon}</span>
                <span>{wp.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TOP-LEFT SHOWCASE CAMERA PRESETS */}
      {/* ========================================================= */}
      <div className="fixed top-36 left-3 md:left-6 pointer-events-auto flex flex-col gap-1.5 z-40 max-w-[200px] hidden sm:flex">
        <div className="glass-panel p-2 rounded-2xl border border-amber-500/40 text-amber-50 shadow-xl">
          <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1 mb-1.5 uppercase tracking-wider">
            <Film className="w-3 h-3 text-amber-400" />
            दर्शन कैमरा (Views)
          </span>
          <div className="flex flex-col gap-1 text-[11px] font-semibold">
            <button
              onClick={() => onSelectCameraPreset('cinematic_tour')}
              className={`px-2 py-1 rounded-lg text-left truncate transition-colors ${cameraPreset === 'cinematic_tour' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-200 hover:bg-amber-950'}`}
            >
              🎥 600m ड्रोन दर्शन
            </button>
            <button
              onClick={() => onSelectCameraPreset('ghat')}
              className={`px-2 py-1 rounded-lg text-left truncate transition-colors ${cameraPreset === 'ghat' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-200 hover:bg-amber-950'}`}
            >
              ☀️ साक्षात अर्घ्य घाट
            </button>
            <button
              onClick={() => onSelectCameraPreset('home')}
              className={`px-2 py-1 rounded-lg text-left truncate transition-colors ${cameraPreset === 'home' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-200 hover:bg-amber-950'}`}
            >
              🏠 0m: घर का आंगन
            </button>
            <button
              onClick={() => onSelectCameraPreset('bazaar')}
              className={`px-2 py-1 rounded-lg text-left truncate transition-colors ${cameraPreset === 'bazaar' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-200 hover:bg-amber-950'}`}
            >
              🎪 320m: तोरण बाजार
            </button>
            <button
              onClick={() => onSelectCameraPreset('player_follow')}
              className={`px-2 py-1 rounded-lg text-left truncate transition-colors ${cameraPreset === 'player_follow' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-amber-200 hover:bg-amber-950'}`}
            >
              🕹️ स्वतंत्र चाल (Walk)
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BOTTOM CONTROLS: Virtual Joystick, Cards & Actions */}
      {/* ========================================================= */}
      <div className="flex items-end justify-between w-full max-w-7xl mx-auto gap-4">
        {/* Virtual Touch Joystick (Mobile & Mouse) */}
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
            <div className="absolute w-full h-[1px] bg-amber-500/20" />
            <div className="absolute h-full w-[1px] bg-amber-500/20" />
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

        {/* Center: Cards & Cultural Lore Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsCardsOpen(!isCardsOpen)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel-glow border border-amber-400 text-amber-200 font-bold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>छठ आशीष कार्ड्स (Cards)</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="p-2 rounded-full glass-panel-glow border border-amber-400/50 text-amber-300 hover:text-amber-100 shadow"
            title="Cultural Lore & Vidhi"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Right: Action Powers (Mantar Jantar Style) */}
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          {/* Upper row: Thekua, Soop, Diya */}
          <div className="flex items-center gap-2">
            <button
              onClick={onActionThekua}
              className="p-2 rounded-2xl glass-panel-glow border border-amber-400/60 text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center w-12 h-12"
              title="Make / Share Thekua [R]"
            >
              <span className="text-base">🍪</span>
              <span className="text-[8px] font-bold text-amber-300">ठेकुआ</span>
            </button>

            <button
              onClick={onActionSoop}
              className="p-2 rounded-2xl glass-panel-glow border border-amber-400/60 text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center w-12 h-12"
              title="Arrange Soop [C]"
            >
              <span className="text-base">🧺</span>
              <span className="text-[8px] font-bold text-amber-300">सूप</span>
            </button>

            <button
              onClick={onActionDiya}
              className="p-2 rounded-2xl glass-panel-glow border border-amber-400/60 text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center w-12 h-12 animate-diya"
              title="Float Diya [F]"
            >
              <span className="text-base">🪔</span>
              <span className="text-[8px] font-bold text-amber-300">दीपदान</span>
            </button>
          </div>

          {/* Lower row: Shankh, Jaykara, Primary Arghya Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onActionShankh}
              className="px-3 py-2 rounded-2xl bg-amber-950/80 hover:bg-amber-900 border border-amber-400/60 text-amber-200 text-xs font-bold flex items-center gap-1 shadow-xl hover:scale-105 active:scale-95 transition-all"
              title="Sound Sacred Shankha [Q]"
            >
              <span className="text-base">🐚</span>
              <span className="hidden sm:inline">शंख [Q]</span>
            </button>

            <button
              onClick={onActionJaykara}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-amber-950 text-xs font-extrabold flex items-center gap-1 shadow-xl hover:scale-105 active:scale-95 transition-all"
              title="Chant Jai Chhathi Maiya [E]"
            >
              <Users className="w-3.5 h-3.5 text-amber-950" />
              <span>जयकारा [E]</span>
            </button>

            <button
              onClick={onActionArghya}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 hover:from-amber-300 hover:to-red-500 text-amber-950 text-xs md:text-sm font-extrabold flex items-center gap-1.5 shadow-[0_0_25px_rgba(251,191,36,0.8)] hover:scale-105 active:scale-95 transition-all animate-pulse"
              title="Offer Holy Arghya [Spacebar]"
            >
              <Sparkles className="w-4 h-4" />
              <span>अर्घ्य अर्पण [Space]</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. JUGAAD CARDS DRAWER */}
      {/* ========================================================= */}
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
                      {card.unlocked ? '✅ सक्रिय (Active)' : '🔒 यात्रा में आगे बढ़ने पर अनलॉक'}
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
