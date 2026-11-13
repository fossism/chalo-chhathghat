import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import confetti from 'canvas-confetti';
import { FullJourney600mWorld, CameraPreset } from './FullJourney600mWorld';
import { JourneyHUD } from './JourneyHUD';
import { audio } from '../utils/audio';
import {
  ChhathDay,
  Language,
  KafilaMember,
  VillagerNPC,
  CollectibleItem,
  FloatingDiya,
  PlayerPosition,
} from '../types';
import { ThekuaWorkshop } from '../components/ThekuaWorkshop';
import { SoopAssembly } from '../components/SoopAssembly';
import { ArghyaOffering } from '../components/ArghyaOffering';
import { FloatDiyaModal } from '../components/FloatDiyaModal';
import { CulturalGuideModal } from '../components/CulturalGuideModal';
import { FolkMusicPlayer } from '../components/FolkMusicPlayer';
import { CollectiveBlessingModal } from '../components/CollectiveBlessingModal';

export const GameManager: React.FC = () => {
  // Game Day & Language
  const [currentDay, setCurrentDay] = useState<ChhathDay>('sandhya-arghya');
  const [lang, setLang] = useState<Language>('hi');
  const [isMuted, setIsMuted] = useState(false);

  // Camera preset (Defaults to 'cinematic_tour' for sweeping 600m drone showcase)
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('cinematic_tour');

  // Player state: Start at Ancestral Home Courtyard (Z: -280 = 0m)
  const [playerPos, setPlayerPos] = useState<PlayerPosition>({
    x: 0,
    y: 0,
    z: -270,
    rotY: 0,
  });
  const [isWalking, setIsWalking] = useState(false);
  const [isInWater, setIsInWater] = useState(false);
  const [isOffering, setIsOffering] = useState(false);

  // Stats
  const [nishtha, setNishtha] = useState(100);
  const [thekuaCount, setThekuaCount] = useState(24);

  // Modals state
  const [isThekuaModalOpen, setIsThekuaModalOpen] = useState(false);
  const [isSoopModalOpen, setIsSoopModalOpen] = useState(false);
  const [isArghyaModalOpen, setIsArghyaModalOpen] = useState(false);
  const [isDiyaModalOpen, setIsDiyaModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isBlessingModalOpen, setIsBlessingModalOpen] = useState(false);

  // Keyboard keys pressed state
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const joystickVector = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const playerRef = useRef(playerPos);
  playerRef.current = playerPos;

  // Active Kafila Followers
  const [kafila] = useState<KafilaMember[]>([
    {
      id: 'k1',
      role: 'dholak_player',
      x: -0.6,
      z: -271.5,
      color: '#e76f51',
      offsetDistance: 1.4,
      offsetAngle: -0.4,
      heldItem: 'dholak',
    },
    {
      id: 'k2',
      role: 'incense_dadi',
      x: 0.6,
      z: -272.0,
      color: '#f4a261',
      offsetDistance: 1.7,
      offsetAngle: 0.4,
      heldItem: 'incense',
    },
  ]);

  // Villagers
  const [villagers] = useState<VillagerNPC[]>([]);
  // Collectibles
  const [collectibles] = useState<CollectibleItem[]>([]);

  // Floating Diyas on the Ganges
  const [diyas, setDiyas] = useState<FloatingDiya[]>([
    { id: 'd1', name: 'रोहित व परिवार', location: 'पटना', wish: 'आरोग्य व सुख शांति', x: -4, z: 320, color: '#ffb703', timestamp: Date.now() },
    { id: 'd2', name: 'प्रिया सिंह', location: 'वाराणसी', wish: 'छठी मइया की जय', x: 3, z: 324, color: '#f77f00', timestamp: Date.now() },
    { id: 'd3', name: 'आनंद कुमार', location: 'दरभंगा', wish: 'सबका मंगल हो', x: -1, z: 326, color: '#ffd166', timestamp: Date.now() },
    { id: 'd4', name: 'Amit & Family', location: 'New Jersey', wish: 'Divine Sun blessings', x: 5, z: 328, color: '#ffb703', timestamp: Date.now() },
  ]);

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;

      // Switch to player follow mode when player walks
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        setCameraPreset('player_follow');
      }

      // Quick Action Hotkeys
      if (e.code === 'KeyQ') handleActionShankh();
      if (e.code === 'KeyE') handleActionJaykara();
      if (e.code === 'Space') {
        e.preventDefault();
        handleActionArghya();
      }
      if (e.code === 'KeyF') handleActionDiya();
      if (e.code === 'KeyR') handleActionThekua();
      if (e.code === 'KeyC') handleActionSoop();
      if (e.code === 'KeyB') handleActionBlessing();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Movement Game Loop along the 600m pilgrimage
  useEffect(() => {
    let animId: number;
    let footstepTimer = 0;

    const gameLoop = () => {
      const keys = keysRef.current;
      const joy = joystickVector.current;

      let moveX = 0;
      let moveZ = 0;

      if (keys['KeyW'] || keys['ArrowUp']) moveZ += 1;
      if (keys['KeyS'] || keys['ArrowDown']) moveZ -= 1;
      if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
      if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

      if (Math.abs(joy.x) > 0.1 || Math.abs(joy.y) > 0.1) {
        moveX = joy.x;
        moveZ = -joy.y;
      }

      const hasInput = Math.hypot(moveX, moveZ) > 0.1;
      setIsWalking(hasInput);

      if (hasInput) {
        // Fast brisk march with Shift
        const speed = keys['ShiftLeft'] || keys['ShiftRight'] ? 0.38 : 0.22;
        const targetAngle = Math.atan2(moveX, moveZ);

        setPlayerPos((prev) => {
          let diff = targetAngle - prev.rotY;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          const newRotY = prev.rotY + diff * 0.2;

          const dx = Math.sin(targetAngle) * speed;
          const dz = Math.cos(targetAngle) * speed;

          const newX = Math.max(-16, Math.min(16, prev.x + dx));
          // Route bounds from Home (Z: -290) to Ganga River (Z: 295)
          const newZ = Math.max(-290, Math.min(295, prev.z + dz));

          // Entering the water at Z >= 275 (Ghat steps end, river begins)
          const inWater = newZ >= 275;
          setIsInWater(inWater);
          const waterY = inWater ? -Math.min(0.65, (newZ - 275) * 0.08) : 0;

          footstepTimer++;
          if (footstepTimer % 18 === 0) {
            if (inWater) {
              audio.playFootstepWater();
            } else {
              audio.playFootstepDirt();
            }
          }

          return {
            x: newX,
            y: waterY,
            z: newZ,
            rotY: newRotY,
          };
        });
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Teleport to 600m pilgrimage waypoints
  const handleTeleport = (meters: number) => {
    audio.playBell();
    let targetZ = -270;
    if (meters === 0) targetZ = -270; // Home Courtyard
    else if (meters === 150) targetZ = -140; // Village Alley
    else if (meters === 320) targetZ = 30; // Bazaar Toran Dwar
    else if (meters === 480) targetZ = 190; // Sandy Trail
    else if (meters === 600) targetZ = 274; // Ganga Ghat Riverbank

    setPlayerPos((prev) => ({
      ...prev,
      x: 0,
      z: targetZ,
    }));
    setCameraPreset('player_follow');
  };

  // Actions
  const handleActionShankh = () => {
    audio.playShankh();
    setNishtha((n) => Math.min(100, n + 2));
  };

  const handleActionJaykara = () => {
    audio.playChant();
    audio.playBell();
  };

  const handleActionArghya = () => {
    setIsOffering(true);
    audio.playWaterSplash();
    audio.playShankh();
    audio.playBell();

    confetti({
      particleCount: 160,
      spread: 95,
      origin: { y: 0.55 },
      colors: ['#FFB703', '#F37021', '#E63946', '#FFFFFF', '#FEE440'],
    });

    setTimeout(() => {
      setIsOffering(false);
    }, 4000);

    setIsArghyaModalOpen(true);
  };

  const handleActionDiya = () => {
    setIsDiyaModalOpen(true);
  };

  const handleActionThekua = () => {
    setIsThekuaModalOpen(true);
  };

  const handleActionSoop = () => {
    setIsSoopModalOpen(true);
  };

  const handleActionBlessing = () => {
    setIsBlessingModalOpen(true);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audio.setMuted(next);
  };

  // Calculate live meters walked from Home (Z: -270 = 0m) to Ghat (Z: 275 = 600m)
  const currentMeters = Math.max(0, Math.min(600, ((playerPos.z - (-270)) / 545) * 600));

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0705] select-none font-folk">
      {/* 1. THREE.JS 3D WORLD (600M PILGRIMAGE ROUTE) */}
      <Canvas
        camera={{ position: [0, 6, -260], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color
          attach="background"
          args={[
            currentDay === 'kharna'
              ? '#060913'
              : currentDay === 'sandhya-arghya'
              ? '#2a091d'
              : currentDay === 'usha-arghya'
              ? '#111538'
              : '#1a1008',
          ]}
        />
        <fog
          attach="fog"
          args={[
            currentDay === 'usha-arghya'
              ? '#1c2246'
              : currentDay === 'sandhya-arghya'
              ? '#3a1426'
              : '#160e0a',
            20,
            95,
          ]}
        />

        <FullJourney600mWorld
          playerPos={playerPos}
          isWalking={isWalking}
          isInWater={isInWater}
          isOffering={isOffering}
          currentDay={currentDay}
          kafila={kafila}
          villagers={villagers}
          collectibles={collectibles}
          diyas={diyas}
          cameraPreset={cameraPreset}
        />
      </Canvas>

      {/* 2. 600M JOURNEY HUD & WAYPOINT NAVIGATION */}
      <JourneyHUD
        currentMeters={currentMeters}
        kafilaCount={kafila.length + 1}
        nishtha={nishtha}
        thekuaCount={thekuaCount}
        currentDay={currentDay}
        onSelectDay={setCurrentDay}
        lang={lang}
        onSelectLang={setLang}
        onTeleport={handleTeleport}
        cameraPreset={cameraPreset}
        onSelectCameraPreset={setCameraPreset}
        onActionArghya={handleActionArghya}
        onActionShankh={handleActionShankh}
        onActionJaykara={handleActionJaykara}
        onActionDiya={handleActionDiya}
        onActionThekua={handleActionThekua}
        onActionSoop={handleActionSoop}
        onActionBlessing={handleActionBlessing}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onJoystickMove={(dx, dy) => {
          setCameraPreset('player_follow');
          joystickVector.current = { x: dx, y: dy };
        }}
        onJoystickEnd={() => {
          joystickVector.current = { x: 0, y: 0 };
        }}
      />

      {/* 3. FOLK MUSIC & TANPURA COMPONENT */}
      <FolkMusicPlayer />

      {/* 4. RITUAL MODALS */}
      {isThekuaModalOpen && (
        <ThekuaWorkshop
          lang={lang}
          onClose={() => setIsThekuaModalOpen(false)}
          onComplete={() => {
            setThekuaCount((prev) => prev + 6);
            setNishtha((n) => Math.min(100, n + 15));
          }}
        />
      )}

      {isSoopModalOpen && (
        <SoopAssembly
          lang={lang}
          onClose={() => setIsSoopModalOpen(false)}
          onComplete={() => {
            setNishtha((n) => Math.min(100, n + 20));
          }}
        />
      )}

      {isArghyaModalOpen && (
        <ArghyaOffering
          lang={lang}
          currentDay={currentDay}
          onClose={() => setIsArghyaModalOpen(false)}
          onOpenBlessing={() => setIsBlessingModalOpen(true)}
          onArghyaPoured={() => {
            setIsOffering(true);
            setTimeout(() => setIsOffering(false), 3500);
          }}
        />
      )}

      {isDiyaModalOpen && (
        <FloatDiyaModal
          lang={lang}
          onClose={() => setIsDiyaModalOpen(false)}
          onAddDiya={(newDiya) => {
            setDiyas((prev) => [newDiya, ...prev]);
            setNishtha((n) => Math.min(100, n + 10));
          }}
          globalCount={diyas.length}
        />
      )}

      {isGuideModalOpen && (
        <CulturalGuideModal
          lang={lang}
          onClose={() => setIsGuideModalOpen(false)}
        />
      )}

      {isBlessingModalOpen && (
        <CollectiveBlessingModal
          lang={lang}
          onClose={() => setIsBlessingModalOpen(false)}
          onDistributeThekua={() => {
            setThekuaCount((prev) => Math.max(0, prev - 1));
            setNishtha((n) => Math.min(100, n + 5));
          }}
        />
      )}
    </div>
  );
};
