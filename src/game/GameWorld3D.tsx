import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { ChhathDay, KafilaMember, VillagerNPC, CollectibleItem, FloatingDiya } from '../types';

interface GameWorld3DProps {
  playerPos: { x: number; y: number; z: number; rotY: number };
  isWalking: boolean;
  isInWater: boolean;
  isOffering: boolean;
  currentDay: ChhathDay;
  kafila: KafilaMember[];
  villagers: VillagerNPC[];
  collectibles: CollectibleItem[];
  diyas: FloatingDiya[];
}

// Procedural Banana Tree
const BananaPlant: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.16, 0.24, 2.6, 8]} />
        <meshStandardMaterial color="#385437" roughness={0.9} />
      </mesh>
      {/* 6 Broad Banana Leaves */}
      {[0, 1.05, 2.1, 3.14, 4.2, 5.25].map((angle, i) => (
        <group key={i} position={[0, 2.4, 0]} rotation={[0, angle, 0]}>
          <group rotation={[0.45, 0, 0]}>
            <mesh position={[0, 0.15, 1.1]} rotation={[-0.2, 0, 0]}>
              <boxGeometry args={[0.65, 0.03, 2.2]} />
              <meshStandardMaterial color="#40916c" roughness={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      ))}
      {/* Yellow/Green Bananas */}
      <group position={[0.2, 1.9, 0.1]}>
        <mesh>
          <sphereGeometry args={[0.22, 6, 6]} />
          <meshStandardMaterial color="#eed202" />
        </mesh>
      </group>
    </group>
  );
};

// Traditional Village Brick Hut with Thatched / Clay Tiled Roof
const VillageHut: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({
  position,
  rotation = [0, 0, 0],
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Terracotta Clay / Mud Walls */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[5, 3, 4]} />
        <meshStandardMaterial color="#9c6644" roughness={0.95} />
      </mesh>
      {/* Thatched / Clay Tiled Slanted Roof (Khaprail) */}
      <mesh position={[0, 3.6, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[4.2, 1.8, 4]} />
        <meshStandardMaterial color="#7f4f24" roughness={0.9} />
      </mesh>
      {/* Wooden Door */}
      <mesh position={[0, 1.0, 2.02]}>
        <boxGeometry args={[1.2, 2.0, 0.1]} />
        <meshStandardMaterial color="#432818" />
      </mesh>
      {/* Clay Verandah / Otla */}
      <mesh position={[0, 0.1, 2.8]}>
        <boxGeometry args={[5.5, 0.2, 1.6]} />
        <meshStandardMaterial color="#b08968" roughness={0.9} />
      </mesh>
      {/* Clay stove outside with smoke */}
      <group position={[2.2, 0.3, 2.5]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.35, 0.4, 8]} />
          <meshStandardMaterial color="#6a040f" />
        </mesh>
        <pointLight color="#ff8800" intensity={0.8} distance={2} />
      </group>
    </group>
  );
};

// Sugarcane Kosi Canopy with Terracotta Elephant and 4 Burning Diyas
const KosiPyramid: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* 5 Sugarcane stalks tied in conical tent */}
      {[
        [-0.7, -0.7, 0.2, -0.2],
        [0.7, -0.7, -0.2, -0.2],
        [0.7, 0.7, -0.2, 0.2],
        [-0.7, 0.7, 0.2, 0.2],
        [0, -0.85, 0, -0.25],
      ].map(([x, z, rZ, rX], idx) => (
        <mesh key={idx} position={[x, 1.7, z]} rotation={[rX, 0, rZ]}>
          <cylinderGeometry args={[0.045, 0.055, 3.5, 6]} />
          <meshStandardMaterial color="#6a040f" roughness={0.7} />
        </mesh>
      ))}
      {/* Binding Kalava */}
      <mesh position={[0, 3.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.04, 6, 12]} />
        <meshStandardMaterial color="#d90429" />
      </mesh>
      {/* Terracotta Elephant */}
      <group position={[0, 0.3, 0]} scale={0.75}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.65, 0.45, 0.9]} />
          <meshStandardMaterial color="#9c4124" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.55, 0.5]}>
          <sphereGeometry args={[0.26, 10, 10]} />
          <meshStandardMaterial color="#9c4124" />
        </mesh>
        {/* Burning oil lamps on elephant */}
        <pointLight position={[0, 0.8, 0]} color="#ff9e00" intensity={2.2} distance={3.5} />
        <mesh position={[0, 0.7, 0]}>
          <coneGeometry args={[0.06, 0.15, 6]} />
          <meshBasicMaterial color="#ffea00" />
        </mesh>
      </group>
    </group>
  );
};

// 3D Animated Player Model (Lead Daura Bearer)
const PlayerCharacter: React.FC<{
  position: { x: number; y: number; z: number; rotY: number };
  isWalking: boolean;
  isInWater: boolean;
  isOffering: boolean;
}> = ({ position, isWalking, isInWater, isOffering }) => {
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const dauraRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 9;
    if (isWalking) {
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t) * 0.6;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(t) * 0.6;
      if (dauraRef.current) {
        dauraRef.current.position.y = 2.45 + Math.abs(Math.sin(t)) * 0.05;
        dauraRef.current.rotation.z = Math.sin(t * 0.5) * 0.04;
      }
    } else {
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (dauraRef.current) {
        dauraRef.current.position.y = 2.45;
        dauraRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <group position={[position.x, position.y, position.z]} rotation={[0, position.rotY, 0]}>
      {/* Player Body (Kurta / Dhoti in White & Yellow Gamchha) */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.26, 0.32, 1.1, 10]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
      </mesh>
      {/* Saffron/Yellow Gamchha */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.28, 0.29, 0.35, 10]} />
        <meshStandardMaterial color="#f7b801" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#d4a373" roughness={0.5} />
      </mesh>
      {/* Long Orange Matiya Sindoor on forehead */}
      <mesh position={[0, 2.02, 0.18]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.04, 0.22, 0.03]} />
        <meshBasicMaterial color="#ff5400" />
      </mesh>

      {/* Left and Right Legs (Animated) */}
      <group ref={leftLegRef} position={[-0.14, 0.65, 0]}>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.65, 8]} />
          <meshStandardMaterial color="#e9ecef" />
        </mesh>
      </group>
      <group ref={rightLegRef} position={[0.14, 0.65, 0]}>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.65, 8]} />
          <meshStandardMaterial color="#e9ecef" />
        </mesh>
      </group>

      {/* Arms holding the Daura Basket on Head */}
      <mesh position={[-0.3, 1.95, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.7, 6]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      <mesh position={[0.3, 1.95, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.7, 6]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* The Sacred Bamboo Daura Basket on Head */}
      <group ref={dauraRef} position={[0, 2.45, 0]}>
        {/* Cloth Ring (Bitha) */}
        <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.05, 6, 12]} />
          <meshStandardMaterial color="#d90429" />
        </mesh>
        {/* Bamboo Daura */}
        <mesh>
          <cylinderGeometry args={[0.65, 0.42, 0.4, 16]} />
          <meshStandardMaterial color="#bc6c25" roughness={0.9} />
        </mesh>
        {/* Yellow Sacred Covering Cloth */}
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.62, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshStandardMaterial color="#ffb703" roughness={0.8} />
        </mesh>
        {/* Sugarcane stalk tips projecting from Daura */}
        <mesh position={[0.25, 0.25, 0.1]} rotation={[0.3, 0, 0.2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.9, 6]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
      </group>

      {/* If Offering Arghya: Flowing Milk and Water stream */}
      {isOffering && (
        <group position={[0, 1.4, 0.5]}>
          <mesh>
            <cylinderGeometry args={[0.03, 0.06, 1.5, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.85} />
          </mesh>
          <pointLight color="#ffffff" intensity={2.5} distance={3} />
        </group>
      )}

      {/* Water Ripple Rings when walking in the river */}
      {isInWater && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.75, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  );
};

// Kafila Member (Follower Procession in 3D)
const KafilaFollower: React.FC<{ member: KafilaMember; index: number; playerWalking: boolean }> = ({
  member,
  index,
  playerWalking,
}) => {
  const legRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (legRef.current) {
      if (playerWalking) {
        legRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 9 + index) * 0.5;
      } else {
        legRef.current.rotation.x = 0;
      }
    }
  });

  return (
    <group position={[member.x, 0, member.z]}>
      {/* Body */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 1.0, 8]} />
        <meshStandardMaterial color={member.color} roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* Held items by role */}
      {member.role === 'dholak_player' && (
        <group position={[0, 0.95, 0.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.65, 10]} />
          <meshStandardMaterial color="#7f4f24" />
        </group>
      )}
      {member.role === 'incense_dadi' && (
        <group position={[0, 1.0, 0.35]}>
          <mesh>
            <coneGeometry args={[0.14, 0.22, 6]} />
            <meshStandardMaterial color="#582f0e" />
          </mesh>
          <pointLight color="#ff8800" intensity={1.2} distance={2} />
        </group>
      )}
      {member.role === 'sugarcane_kid' && (
        <mesh position={[0.25, 1.4, 0.1]} rotation={[0.2, 0, 0.1]}>
          <cylinderGeometry args={[0.03, 0.04, 2.5, 6]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
      )}

      {/* Animated legs */}
      <group ref={legRef} position={[0, 0.55, 0]}>
        <mesh position={[-0.1, -0.25, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.55, 6]} />
          <meshStandardMaterial color="#ced4da" />
        </mesh>
        <mesh position={[0.1, -0.25, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.55, 6]} />
          <meshStandardMaterial color="#ced4da" />
        </mesh>
      </group>
    </group>
  );
};

// Villager NPC (Can be recruited into your kafila)
const VillagerMesh: React.FC<{ villager: VillagerNPC }> = ({ villager }) => {
  return (
    <group position={[villager.x, 0, villager.z]}>
      {/* Body */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 1.1, 8]} />
        <meshStandardMaterial color={villager.color} roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      {/* Prompt Indicator Overhead */}
      <group position={[0, 2.3, 0]}>
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh>
            <sphereGeometry args={[0.16, 6, 6]} />
            <meshBasicMaterial color="#ffb703" />
          </mesh>
          <pointLight color="#ffb703" intensity={1.5} distance={2.5} />
        </Float>
      </group>
    </group>
  );
};

// Collectible Item on the ground (Thekua, Coconut, Pomelo)
const CollectibleMesh: React.FC<{ item: CollectibleItem }> = ({ item }) => {
  return (
    <group position={[item.x, 0.2, item.z]}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.4}>
        {item.type === 'thekua' && (
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 10]} />
            <meshStandardMaterial color="#bc6c25" roughness={0.5} />
          </mesh>
        )}
        {item.type === 'coconut' && (
          <mesh>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#582f0e" roughness={0.9} />
          </mesh>
        )}
        {item.type === 'dabh' && (
          <mesh>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color="#a7c957" roughness={0.6} />
          </mesh>
        )}
        {item.type === 'turmeric' && (
          <mesh rotation={[0.4, 0, 0.4]}>
            <cylinderGeometry args={[0.06, 0.08, 0.45, 6]} />
            <meshStandardMaterial color="#e09f3e" />
          </mesh>
        )}
        {item.type === 'sugarcane' && (
          <mesh rotation={[0.2, 0, 0.3]}>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 6]} />
            <meshStandardMaterial color="#2d6a4f" />
          </mesh>
        )}
        <pointLight color="#ffd166" intensity={1.2} distance={2} />
      </Float>
    </group>
  );
};

// Grand Holy River Ganges with animated waves & floating diyas
const GangaRiver: React.FC<{ day: ChhathDay; diyas: FloatingDiya[] }> = ({ day, diyas }) => {
  const riverRef = useRef<THREE.Mesh>(null);

  const waterColor = useMemo(() => {
    switch (day) {
      case 'sandhya-arghya':
        return '#a34814'; // Crimson golden twilight
      case 'kharna':
        return '#02182b'; // Deep dark night
      case 'usha-arghya':
        return '#274c77'; // Dawn blue with morning sheen
      case 'nahay-khay':
      default:
        return '#1b7a82';
    }
  }, [day]);

  useFrame((state) => {
    if (riverRef.current) {
      riverRef.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group position={[0, 0, 32]}>
      {/* Water Plane */}
      <mesh ref={riverRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 30, 32, 32]} />
        <meshStandardMaterial
          color={waterColor}
          roughness={0.12}
          metalness={0.7}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Floating Diyas */}
      {diyas.map((diya) => (
        <group key={diya.id} position={[diya.x, 0, diya.z - 28]}>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.15, 0.08, 0.05, 8]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          <pointLight color="#ffba08" intensity={2} distance={2.5} />
          <mesh position={[0, 0.08, 0]}>
            <coneGeometry args={[0.04, 0.1, 6]} />
            <meshBasicMaterial color="#ffea00" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// The Sun & Dynamic Celestial System
const CelestialSun: React.FC<{ day: ChhathDay }> = ({ day }) => {
  const isNight = day === 'kharna';
  const isDawn = day === 'usha-arghya';
  const isDusk = day === 'sandhya-arghya';

  const sunColor = isDusk ? '#ff3f00' : isDawn ? '#ff7700' : '#ffdd00';
  const sunPos = isDusk
    ? ([0, 6, 42] as [number, number, number])
    : isDawn
    ? ([0, 8, 42] as [number, number, number])
    : ([10, 22, 35] as [number, number, number]);

  return (
    <>
      <ambientLight intensity={isNight ? 0.3 : 0.65} color={isNight ? '#0b132b' : '#ffeedd'} />
      <directionalLight position={sunPos} color={sunColor} intensity={isNight ? 0.2 : 2.4} castShadow />

      {!isNight && (
        <group position={sunPos}>
          <mesh>
            <sphereGeometry args={[4.0, 24, 24]} />
            <meshBasicMaterial color={sunColor} />
          </mesh>
          <pointLight color={sunColor} intensity={5} distance={60} />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <Sparkles count={50} scale={12} size={6} speed={0.4} color="#ffd166" />
          </Float>
        </group>
      )}

      {(isNight || isDawn) && <Stars radius={90} depth={40} count={3500} factor={4} fade />}
    </>
  );
};

// Third-Person Smooth Follow Camera
const ThirdPersonCamera: React.FC<{ target: { x: number; y: number; z: number; rotY: number } }> = ({
  target,
}) => {
  const { camera } = useThree();

  useFrame(() => {
    // Distance behind player
    const dist = 7.5;
    const height = 4.8;
    const camX = target.x - Math.sin(target.rotY) * dist;
    const camZ = target.z - Math.cos(target.rotY) * dist;
    const camY = target.y + height;

    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.08);
    camera.lookAt(target.x, target.y + 1.6, target.z);
  });

  return null;
};

export const GameWorld3D: React.FC<GameWorld3DProps> = ({
  playerPos,
  isWalking,
  isInWater,
  isOffering,
  currentDay,
  kafila,
  villagers,
  collectibles,
  diyas,
}) => {
  return (
    <>
      {/* Third Person Camera tracking player */}
      <ThirdPersonCamera target={playerPos} />

      {/* Sun & Sky */}
      <CelestialSun day={currentDay} />

      {/* Terrain: Village ground (sand/mud), Road, and Ghat Steps */}
      {/* 1. Village Courtyard Ground (Z: -32 to -12) */}
      <mesh position={[0, -0.05, -22]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 22]} />
        <meshStandardMaterial color="#8d5b4c" roughness={0.95} />
      </mesh>

      {/* 2. Procession Road / Alley (Z: -12 to 8) */}
      <mesh position={[0, -0.04, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 22]} />
        <meshStandardMaterial color="#b08968" roughness={0.9} />
      </mesh>
      {/* Grass/Field on sides of the road */}
      <mesh position={[-16, -0.05, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 22]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
      </mesh>
      <mesh position={[16, -0.05, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 22]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
      </mesh>

      {/* 3. The Grand Sacred Ghat Steps (Z: 8 to 18) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, -0.15 * i, 8 + i * 1.5]}>
          <boxGeometry args={[45, 0.35, 1.6]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#7f4f24" : "#936639"} roughness={0.9} />
        </mesh>
      ))}

      {/* 4. The Ganges River (Z: 18 to 48) */}
      <GangaRiver day={currentDay} diyas={diyas} />

      {/* Village Huts */}
      <VillageHut position={[-9, 0, -25]} rotation={[0, 0.3, 0]} />
      <VillageHut position={[9, 0, -26]} rotation={[0, -0.3, 0]} />
      <VillageHut position={[-8, 0, -15]} rotation={[0, 0.1, 0]} />
      <VillageHut position={[8, 0, -14]} rotation={[0, -0.1, 0]} />

      {/* Banana Plant Groves */}
      <BananaPlant position={[-5, 0, -8]} scale={1.2} />
      <BananaPlant position={[5, 0, -6]} scale={1.1} />
      <BananaPlant position={[-11, 0, 10]} scale={1.3} />
      <BananaPlant position={[11, 0, 10]} scale={1.2} />

      {/* Kosi Sugarcane Canopies on the Ghat */}
      <KosiPyramid position={[-6, 0, 12]} />
      <KosiPyramid position={[6, 0, 12]} />
      <KosiPyramid position={[-14, 0, 14]} />
      <KosiPyramid position={[14, 0, 14]} />

      {/* The Player Character */}
      <PlayerCharacter
        position={playerPos}
        isWalking={isWalking}
        isInWater={isInWater}
        isOffering={isOffering}
      />

      {/* The Kafila Followers */}
      {kafila.map((member, idx) => (
        <KafilaFollower
          key={member.id}
          member={member}
          index={idx}
          playerWalking={isWalking}
        />
      ))}

      {/* Villager NPCs waiting to be recruited */}
      {villagers
        .filter((v) => !v.recruited)
        .map((villager) => (
          <VillagerMesh key={villager.id} villager={villager} />
        ))}

      {/* Collectibles on the road */}
      {collectibles
        .filter((c) => !c.collected)
        .map((item) => (
          <CollectibleMesh key={item.id} item={item} />
        ))}
    </>
  );
};
