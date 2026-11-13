import React, { useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Stars, Float, Sparkles, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ChhathDay, FloatingDiya, KafilaMember, VillagerNPC, CollectibleItem } from '../types';
import { animeTexGen } from '../utils/animeTextures';
import { AnimeRealisticBananaTree, AnimeSugarcaneCanopy } from './RealisticFlora';
import { AnimeDauraBearer, AnimeVrati } from './AnimeCharacters';

export type CameraPreset = 'cinematic_tour' | 'home' | 'village' | 'bazaar' | 'riverbank' | 'ghat' | 'player_follow';

interface FullJourney600mWorldProps {
  playerPos: { x: number; y: number; z: number; rotY: number };
  isWalking: boolean;
  isInWater: boolean;
  isOffering: boolean;
  currentDay: ChhathDay;
  kafila: KafilaMember[];
  villagers: VillagerNPC[];
  collectibles: CollectibleItem[];
  diyas: FloatingDiya[];
  cameraPreset: CameraPreset;
}

// 1. Ancestral Village Brick House with Khaprail Roof & Tulsi Chaura
const VillageHouse: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({
  position,
  rotation = [0, 0, 0],
}) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Terracotta / Mud Brick Walls */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <boxGeometry args={[7, 4, 5.5]} />
        <meshToonMaterial color="#a75d43" gradientMap={toonGradient} />
      </mesh>

      {/* Slanted Tiled Khaprail Roof */}
      <mesh position={[0, 4.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[5.8, 2.2, 4]} />
        <meshToonMaterial color="#6a2e1d" gradientMap={toonGradient} />
      </mesh>

      {/* Wooden Door with Carvings */}
      <mesh position={[0, 1.3, 2.78]}>
        <boxGeometry args={[1.5, 2.6, 0.1]} />
        <meshToonMaterial color="#3d2614" gradientMap={toonGradient} />
      </mesh>

      {/* Verandah / Dalan platform */}
      <mesh position={[0, 0.15, 3.8]}>
        <boxGeometry args={[8, 0.3, 2.2]} />
        <meshToonMaterial color="#c49a6c" gradientMap={toonGradient} />
      </mesh>
    </group>
  );
};

// 2. Tulsi Chaura (Sacred Basil Shrine with Lamp)
const TulsiChaura: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);
  return (
    <group position={position}>
      {/* Ornate square clay pedestal */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshToonMaterial color="#963f24" gradientMap={toonGradient} />
      </mesh>
      {/* Tulsi plant */}
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.42, 8, 8]} />
        <meshToonMaterial color="#2d6a4f" gradientMap={toonGradient} />
      </mesh>
      {/* Burning clay diya on the chaura */}
      <pointLight position={[0, 1.3, 0.7]} color="#ff9e00" intensity={1.8} distance={3} />
      <mesh position={[0, 1.25, 0.65]}>
        <coneGeometry args={[0.03, 0.08, 6]} />
        <meshBasicMaterial color="#ffee32" />
      </mesh>
    </group>
  );
};

// 3. Grand Illuminated Welcome Arch (Chhath Mahaparv Toran Dwar)
const ToranDwar: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position}>
      {/* Left Pillar */}
      <mesh position={[-6.5, 3.5, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 7, 10]} />
        <meshToonMaterial color="#d90429" gradientMap={toonGradient} />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[6.5, 3.5, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 7, 10]} />
        <meshToonMaterial color="#d90429" gradientMap={toonGradient} />
      </mesh>
      {/* Top Grand Archway */}
      <mesh position={[0, 7.2, 0]}>
        <boxGeometry args={[14, 1.4, 0.8]} />
        <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
      </mesh>

      {/* Decorative Sun Medallion at Arch Center */}
      <group position={[0, 8.4, 0]}>
        <mesh>
          <sphereGeometry args={[1.0, 16, 16]} />
          <meshBasicMaterial color="#ff5400" />
        </mesh>
        <pointLight color="#ffba08" intensity={3} distance={12} />
      </group>

      {/* Colorful Hanging Bunting Garland Flags */}
      {[-5, -3, -1, 1, 3, 5].map((bx, idx) => (
        <mesh key={idx} position={[bx, 6.2, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.3, 0.6, 3]} />
          <meshToonMaterial
            color={idx % 2 === 0 ? '#ff0054' : '#70e000'}
            gradientMap={toonGradient}
          />
        </mesh>
      ))}
    </group>
  );
};

// 4. Loudspeaker Pole echoing folk melodies
const LoudspeakerPole: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position}>
      {/* Bamboo / Wood Pole */}
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 9, 8]} />
        <meshToonMaterial color="#a68a56" gradientMap={toonGradient} />
      </mesh>
      {/* 4 Horn Megaphones pointing in all 4 directions */}
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((rotY, idx) => (
        <group key={idx} position={[0, 8.6, 0]} rotation={[0.2, rotY, 0]}>
          <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.32, 0.75, 10]} />
            <meshToonMaterial color="#adb5bd" gradientMap={toonGradient} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 5. Festival Bazaar Stalls (Sugarcane, Dabh Pomelo, Clay Lamps)
const BazaarStalls: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position}>
      {/* Stall Wooden Table */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[4.5, 1.5, 2.2]} />
        <meshToonMaterial color="#8d5b4c" gradientMap={toonGradient} />
      </mesh>
      {/* Striped Canopy Awning */}
      <mesh position={[0, 2.6, 0]}>
        <boxGeometry args={[5, 0.1, 2.8]} />
        <meshToonMaterial color="#e63946" gradientMap={toonGradient} />
      </mesh>
      {/* Fruits on the table: Giant Dabh Pomelos & Water Chestnuts */}
      {[-1.2, -0.4, 0.4, 1.2].map((fx, idx) => (
        <group key={idx} position={[fx, 1.7, 0]}>
          <mesh>
            <sphereGeometry args={[0.26, 8, 8]} />
            <meshToonMaterial color={idx % 2 === 0 ? '#9ef01a' : '#582f0e'} gradientMap={toonGradient} />
          </mesh>
        </group>
      ))}
      {/* Bundle of Sugarcane leaning against stall */}
      <group position={[2.5, 1.8, 0]} rotation={[0.25, 0, 0.15]}>
        <cylinderGeometry args={[0.1, 0.1, 3.8, 6]} />
        <meshToonMaterial color="#5c0099" gradientMap={toonGradient} />
      </group>
    </group>
  );
};

// 6. Camera System with Preset Views & Player Tracking
const JourneyCameraController: React.FC<{
  cameraPreset: CameraPreset;
  playerPos: { x: number; y: number; z: number; rotY: number };
}> = ({ cameraPreset, playerPos }) => {
  const { camera } = useThree();

  useFrame((state) => {
    switch (cameraPreset) {
      case 'cinematic_tour': {
        // Dramatic drone sweep traversing the full 600m pilgrimage
        const t = state.clock.elapsedTime * 0.15;
        // Sweeps along the Z axis from 0m to 600m
        const sweepZ = -150 + Math.sin(t) * 350;
        const sweepX = Math.sin(t * 1.5) * 14;
        const sweepY = 7.5 + Math.cos(t) * 3;
        camera.position.lerp(new THREE.Vector3(sweepX, sweepY, sweepZ - 14), 0.04);
        camera.lookAt(0, 2.0, sweepZ + 25);
        break;
      }
      case 'home': {
        // 0m: Ancestral Home Courtyard view
        camera.position.lerp(new THREE.Vector3(8, 6, -270), 0.06);
        camera.lookAt(0, 2, -290);
        break;
      }
      case 'village': {
        // 150m: Village Alleyway view
        camera.position.lerp(new THREE.Vector3(6, 4.5, -130), 0.06);
        camera.lookAt(0, 1.8, -150);
        break;
      }
      case 'bazaar': {
        // 320m: Toran Dwar & Festive Bazaar view
        camera.position.lerp(new THREE.Vector3(10, 6, 40), 0.06);
        camera.lookAt(0, 3, 20);
        break;
      }
      case 'riverbank': {
        // 480m: Sandy Trail with Banana Groves
        camera.position.lerp(new THREE.Vector3(-8, 5, 170), 0.06);
        camera.lookAt(0, 2, 200);
        break;
      }
      case 'ghat': {
        // 600m: Sacred Ganga Ghat with Surya Arghya
        camera.position.lerp(new THREE.Vector3(3.5, 3.0, 290), 0.06);
        camera.lookAt(0, 1.5, 275);
        break;
      }
      case 'player_follow':
      default: {
        // Third person follow behind player with smooth damping
        const dist = 7.5;
        const height = 4.8;
        const camX = playerPos.x - Math.sin(playerPos.rotY) * dist;
        const camZ = playerPos.z - Math.cos(playerPos.rotY) * dist;
        const camY = playerPos.y + height;
        camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.08);
        camera.lookAt(playerPos.x, playerPos.y + 1.6, playerPos.z);
        break;
      }
    }
  });

  return null;
};

export const FullJourney600mWorld: React.FC<FullJourney600mWorldProps> = ({
  playerPos,
  isWalking,
  isInWater,
  isOffering,
  currentDay,
  diyas,
  cameraPreset,
}) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);
  const skyTex = useMemo(() => animeTexGen.getAnimeSkyTexture(currentDay), [currentDay]);

  const isNight = currentDay === 'kharna';
  const isDawn = currentDay === 'usha-arghya';
  const isDusk = currentDay === 'sandhya-arghya';

  const sunColor = isDusk ? '#ff3f00' : isDawn ? '#ff6f00' : '#ffd000';
  // Sun positioned over the Ganges at Z = 360 (Ghat horizon)
  const sunPos = isDusk
    ? ([0, 14, 380] as [number, number, number])
    : isDawn
    ? ([0, 18, 380] as [number, number, number])
    : ([20, 45, 350] as [number, number, number]);

  return (
    <>
      {/* Camera Controller */}
      <JourneyCameraController cameraPreset={cameraPreset} playerPos={playerPos} />

      {/* Anime Sky & Lighting */}
      <ambientLight intensity={isNight ? 0.3 : 0.85} color={isNight ? '#0b132b' : '#fff3b0'} />
      <directionalLight position={sunPos} color={sunColor} intensity={isNight ? 0.2 : 3.0} castShadow />

      {/* Sun Core & Corona Bloom on the River Horizon */}
      {!isNight && (
        <group position={sunPos}>
          <mesh>
            <sphereGeometry args={[7.5, 32, 32]} />
            <meshBasicMaterial color={sunColor} />
          </mesh>
          <pointLight color={sunColor} intensity={7} distance={140} />
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <Sparkles count={80} scale={22} size={8} speed={0.3} color="#ffe6a7" />
          </Float>
        </group>
      )}

      {(isNight || isDawn) && <Stars radius={180} depth={80} count={5000} factor={4} fade />}

      {/* ========================================================= */}
      {/* ZONE 1: 0m to 120m — ANCESTRAL HOME & COURTYARD (Z: -300 to -180) */}
      {/* ========================================================= */}
      {/* Courtyard clay ground */}
      <mesh position={[0, -0.05, -240]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 120]} />
        <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
      </mesh>

      {/* Ancestral Brick Home */}
      <VillageHouse position={[0, 0, -290]} />
      <VillageHouse position={[-16, 0, -270]} rotation={[0, 0.3, 0]} />
      <VillageHouse position={[16, 0, -270]} rotation={[0, -0.3, 0]} />

      {/* Tulsi Chaura in the courtyard */}
      <TulsiChaura position={[-3, 0, -265]} />

      {/* Clay stove (Mitti ka Chulha) with mango wood fire */}
      <group position={[4, 0, -268]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 0.5, 8]} />
          <meshToonMaterial color="#6a040f" gradientMap={toonGradient} />
        </mesh>
        <pointLight color="#ff8800" intensity={2} distance={3} />
        {/* Rising incense / smoke particles */}
        <Sparkles count={25} position={[0, 1.2, 0]} scale={1.5} size={3} speed={0.5} color="#d4a373" />
      </group>

      {/* Banana Trees at Home */}
      <AnimeRealisticBananaTree position={[-8, 0, -250]} scale={1.15} />
      <AnimeRealisticBananaTree position={[9, 0, -245]} scale={1.1} />

      {/* ========================================================= */}
      {/* ZONE 2: 120m to 280m — VILLAGE ALLEY & BASTI (Z: -180 to -20) */}
      {/* ========================================================= */}
      {/* Village Path */}
      <mesh position={[0, -0.04, -100]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 160]} />
        <meshToonMaterial color="#c49a6c" gradientMap={toonGradient} />
      </mesh>
      {/* Green fields on sides */}
      <mesh position={[-20, -0.05, -100]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 160]} />
        <meshToonMaterial color="#386641" gradientMap={toonGradient} />
      </mesh>
      <mesh position={[20, -0.05, -100]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 160]} />
        <meshToonMaterial color="#386641" gradientMap={toonGradient} />
      </mesh>

      {/* Thatched village huts along the lane */}
      <VillageHouse position={[-12, 0, -150]} rotation={[0, 0.2, 0]} />
      <VillageHouse position={[12, 0, -120]} rotation={[0, -0.2, 0]} />
      <VillageHouse position={[-12, 0, -70]} rotation={[0, 0.15, 0]} />

      {/* Banana Trees along the village lane */}
      <AnimeRealisticBananaTree position={[-6, 0, -135]} scale={1.2} />
      <AnimeRealisticBananaTree position={[6.5, 0, -95]} scale={1.25} />
      <AnimeRealisticBananaTree position={[-6.5, 0, -45]} scale={1.18} />

      {/* ========================================================= */}
      {/* ZONE 3: 280m to 420m — FESTIVE BAZAAR & TORAN DWAR (Z: -20 to 120) */}
      {/* ========================================================= */}
      {/* Paved Festival Road */}
      <mesh position={[0, -0.03, 50]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 140]} />
        <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
      </mesh>

      {/* Grand Illuminated Welcome Arch (Toran Dwar) at Z = 20 */}
      <ToranDwar position={[0, 0, 20]} />

      {/* Loudspeaker pole broadcasting Sharda Sinha melodies */}
      <LoudspeakerPole position={[8, 0, 45]} />

      {/* Bazaar Market Stalls selling sugarcane, pomelo, and coconuts */}
      <BazaarStalls position={[-8, 0, 35]} />
      <BazaarStalls position={[8, 0, 75]} />
      <BazaarStalls position={[-8, 0, 105]} />

      {/* Second Welcome Toran Dwar at Z = 120 */}
      <ToranDwar position={[0, 0, 120]} />

      {/* ========================================================= */}
      {/* ZONE 4: 420m to 540m — SANDY RIVERBANK TRAIL (Z: 120 to 240) */}
      {/* ========================================================= */}
      {/* Golden River Sand (Balu) Trail */}
      <mesh position={[0, -0.04, 180]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 120]} />
        <meshToonMaterial color="#e9c46a" gradientMap={toonGradient} />
      </mesh>

      {/* Lush Banana Tree Groves leading to the river */}
      <AnimeRealisticBananaTree position={[-10, 0, 150]} scale={1.3} />
      <AnimeRealisticBananaTree position={[10, 0, 165]} scale={1.25} />
      <AnimeRealisticBananaTree position={[-8.5, 0, 205]} scale={1.35} />
      <AnimeRealisticBananaTree position={[8.5, 0, 220]} scale={1.3} />

      {/* Winter Mist Particles on the floodplain */}
      <Sparkles count={80} position={[0, 1.2, 180]} scale={[30, 3, 100]} size={4} speed={0.2} color="#fff1e6" />

      {/* ========================================================= */}
      {/* ZONE 5: 540m to 600m+ — THE SACRED GANGA GHAT (Z: 240 to 320) */}
      {/* ========================================================= */}
      {/* Grand Red Sandstone Ghat Steps descending into water (Z: 240 to 275) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, -0.18 * i, 240 + i * 4.2]}>
          <boxGeometry args={[65, 0.4, 4.4]} />
          <meshToonMaterial color={i % 2 === 0 ? '#9c4124' : '#b85433'} gradientMap={toonGradient} />
        </mesh>
      ))}

      {/* Sugarcane Kosi Pyramids with Terracotta Elephants on Ghat Steps */}
      <AnimeSugarcaneCanopy position={[-8, 0, 255]} />
      <AnimeSugarcaneCanopy position={[8, 0, 255]} />
      <AnimeSugarcaneCanopy position={[-16, 0, 265]} />
      <AnimeSugarcaneCanopy position={[16, 0, 265]} />

      {/* 5-Sugarcane Grove along Ghat Edge */}
      <AnimeRealisticBananaTree position={[-14, 0, 248]} scale={1.4} />
      <AnimeRealisticBananaTree position={[14, 0, 248]} scale={1.4} />

      {/* THE SACRED GANGES RIVER with Real Mirror Reflections (Z: 275 to 360) */}
      <group position={[0, -0.25, 320]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[95, 80, 64, 64]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mirror={0.8}
            mixBlur={0.8}
            mixStrength={1.6}
            roughness={0.12}
            color={currentDay === 'sandhya-arghya' ? '#78290f' : '#14365d'}
            metalness={0.65}
          />
        </mesh>

        {/* Floating Marigold Petals & Burning Diyas on the Ganges */}
        {diyas.map((diya) => (
          <group key={diya.id} position={[diya.x, 0.05, diya.z - 310]}>
            <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.22, 0.08, 6, 12]} />
              <meshToonMaterial color="#ff7b00" gradientMap={toonGradient} />
            </mesh>
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.1, 0.05, 0.06, 8]} />
              <meshToonMaterial color="#78290f" gradientMap={toonGradient} />
            </mesh>
            <pointLight color="#ffba08" intensity={2.5} distance={4} />
            <mesh position={[0, 0.14, 0]}>
              <coneGeometry args={[0.04, 0.12, 6]} />
              <meshBasicMaterial color="#ffee32" />
            </mesh>
          </group>
        ))}
      </group>

      {/* The Anime Vrati standing in the Holy River Offering Arghya (at Z = 278) */}
      <AnimeVrati position={[0, -0.28, 278]} isOffering={isOffering} />

      {/* The Player Anime Daura Bearer */}
      <AnimeDauraBearer
        position={playerPos}
        isWalking={isWalking}
        isInWater={isInWater}
        isOffering={isOffering}
      />
    </>
  );
};
