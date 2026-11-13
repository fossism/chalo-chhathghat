import React from 'react';
import { Camera, Film, Sun, Eye, Compass, Sparkles } from 'lucide-react';
import { CameraMode } from './RealisticGameWorld';
import { ChhathDay } from '../types';
import { audio } from '../utils/audio';

interface ShowcaseControlsProps {
  cameraMode: CameraMode;
  onSelectCameraMode: (mode: CameraMode) => void;
  currentDay: ChhathDay;
  onSelectDay: (day: ChhathDay) => void;
}

export const ShowcaseControls: React.FC<ShowcaseControlsProps> = ({
  cameraMode,
  onSelectCameraMode,
  currentDay,
  onSelectDay,
}) => {
  const cameraPresets: { id: CameraMode; label: string; icon: string; desc: string }[] = [
    {
      id: 'cinematic_tour',
      label: 'सिनेमैटिक टूर (Drone Tour)',
      icon: '🎥',
      desc: 'गंगा घाट व अर्घ्य का दिव्य विहंगम भ्रमण',
    },
    {
      id: 'arghya_closeup',
      label: 'साक्षात अर्घ्य (Surya Arghya)',
      icon: '☀️',
      desc: 'कमर भर जल में व्रती व दूध की पावन धार',
    },
    {
      id: 'soop_macro',
      label: 'सूप व महाप्रसाद (Soop Macro)',
      icon: '🧺',
      desc: 'बाँस का सूप, ठेकुआ, डाभ नींबू व नारियल',
    },
    {
      id: 'kosi_view',
      label: 'कोसी हाथी (Kosi Canopy)',
      icon: '🐘',
      desc: '५ गन्ने की छांव व २४ अखंड दीपक',
    },
    {
      id: 'panorama',
      label: 'विहंगम दृश्य (Ghat Panorama)',
      icon: '🌅',
      desc: 'आकाश से संपूर्ण गंगा तट का दृश्य',
    },
    {
      id: 'interactive_player',
      label: 'स्वतंत्र भ्रमण (WASD Game)',
      icon: '🕹️',
      desc: 'दउरा लेकर स्वयं घाट पर चलें',
    },
  ];

  const handleSelectCamera = (mode: CameraMode) => {
    audio.playBell();
    onSelectCameraMode(mode);
  };

  return (
    <div className="fixed top-24 left-3 md:left-6 z-40 pointer-events-auto flex flex-col gap-2 max-w-[220px] md:max-w-[260px]">
      <div className="glass-panel-glow rounded-2xl p-2.5 border border-amber-500/50 shadow-2xl backdrop-blur-md text-amber-50">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            सिनेमैटिक शोकेस दर्शन
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-400/30">
            Realism 4K
          </span>
        </div>

        {/* Camera Preset Buttons */}
        <div className="flex flex-col gap-1">
          {cameraPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectCamera(preset.id)}
              className={`p-2 rounded-xl text-left transition-all flex items-center gap-2 ${
                cameraMode === preset.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 font-bold shadow-md scale-[1.02]'
                  : 'bg-black/30 hover:bg-amber-950/60 text-amber-200/90 hover:text-amber-100'
              }`}
            >
              <span className="text-base flex-shrink-0">{preset.icon}</span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold truncate leading-tight">
                  {preset.label}
                </div>
                <div
                  className={`text-[9px] truncate ${
                    cameraMode === preset.id ? 'text-amber-950/80' : 'text-amber-300/60'
                  }`}
                >
                  {preset.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
