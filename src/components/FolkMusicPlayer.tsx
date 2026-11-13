import React, { useState } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audio } from '../utils/audio';

interface Song {
  id: string;
  title: string;
  singer: string;
  lyrics: string;
  meaning: string;
}

export const FolkMusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingTanpura, setIsPlayingTanpura] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const songs: Song[] = [
    {
      id: '1',
      title: 'काँच ही बाँस के बहँगिया (Kaanch Hi Baans Ke Bahangiya)',
      singer: 'पद्म भूषण शारदा सिन्हा (Sharda Sinha)',
      lyrics: 'काँच ही बाँस के बहँगिया, बहँगी लचकति जाए... उ जे बटोहिया रँग-रसिया, बहँगी घाटे पहुँचाए।',
      meaning: 'The tender green bamboo basket bends with the sacred weight of offerings as the devotee carries it reverently to the holy ghat.',
    },
    {
      id: '2',
      title: 'केलवा के पात पर उगेलन सुरुज देव (Kelwa Ke Paat Par)',
      singer: 'शारदा सिन्हा (Sharda Sinha)',
      lyrics: 'केलवा के पात पर उगेलन सुरुज देव, झाँकेलन झुकेलन हे... हे छठी मइया करिले गोहार, दर्शन दीं अपार।',
      meaning: 'Upon the broad banana leaf, Surya Dev rises with golden rays, peeking softly through the autumn morning sky.',
    },
    {
      id: '3',
      title: 'उठऊ सुरुज भइल बिहान (Uthau Suruj Bhail Bihaan)',
      singer: 'अनुराधा पौडवाल / पारम्परिक (Anuradha Paudwal)',
      lyrics: 'उठऊ सुरुज भइल बिहान, अरघ के बेरा भईल... जल बिच ठाढ़ी सेविका तोहार, सुन लीं गोहार।',
      meaning: 'Awaken, O divine Sun! Dawn has arrived; your devotees stand shivering in the river awaiting your blessed rays.',
    },
  ];

  const handleToggleTanpura = () => {
    const active = audio.toggleAmbient();
    setIsPlayingTanpura(active);
  };

  const currentSong = songs[currentSongIndex];

  return (
    <>
      {/* Floating trigger widget at bottom right */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel-glow border border-amber-400 text-amber-200 hover:text-amber-100 hover:scale-105 transition-all shadow-xl font-medium text-xs md:text-sm"
        >
          <Music className={`w-4 h-4 text-amber-400 ${isPlayingTanpura ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline">लोकगीत व तानपुरा (Folk Melody)</span>
          <span className="sm:hidden">गीत</span>
        </button>
      </div>

      {/* Music Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 glass-panel-glow rounded-3xl p-5 border border-amber-500/50 text-amber-50 shadow-2xl animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              छठ पारम्परिक लोकगीत
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-amber-400/80 hover:text-amber-200 text-xs px-2 py-0.5 rounded-md hover:bg-amber-950"
            >
              ✕
            </button>
          </div>

          {/* Current Song Display */}
          <div className="p-3.5 rounded-2xl bg-amber-950/70 border border-amber-500/30 mb-3">
            <h4 className="text-xs font-bold text-amber-200 truncate">
              {currentSong.title}
            </h4>
            <span className="text-[10px] text-amber-400/90 block mb-2 font-medium">
              गायक: {currentSong.singer}
            </span>
            <p className="text-xs font-rozha text-amber-100/90 italic mb-1.5 leading-relaxed bg-amber-900/40 p-2 rounded-lg border border-amber-600/30">
              "{currentSong.lyrics}"
            </p>
            <p className="text-[10px] text-amber-300/70 leading-normal">
              भावार्थ: {currentSong.meaning}
            </p>
          </div>

          {/* Tanpura drone synthesis toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/30 mb-3">
            <div className="text-xs text-amber-200">
              <span className="font-semibold block">पावन तानपुरा सुर (Tanpura Drone)</span>
              <span className="text-[10px] text-amber-400/70">C# Sa-Pa ध्यान तान</span>
            </div>
            <button
              onClick={handleToggleTanpura}
              className={`p-2 rounded-full border transition-all ${
                isPlayingTanpura
                  ? 'bg-amber-500 text-amber-950 border-amber-300'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
              }`}
            >
              {isPlayingTanpura ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Playlist selector */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-wider block mb-1">
              अमर लोकगीत संग्रह:
            </span>
            {songs.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => setCurrentSongIndex(idx)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] truncate transition-colors flex items-center justify-between ${
                  currentSongIndex === idx
                    ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-400/30'
                    : 'text-amber-300/60 hover:bg-amber-950/40'
                }`}
              >
                <span className="truncate">{song.title}</span>
                {currentSongIndex === idx && <span className="text-amber-400 text-xs">▶</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
