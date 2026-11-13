import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { ChhathDay, FloatingDiya } from '../types';

interface GhatScene3DProps {
  currentDay: ChhathDay;
  diyas: FloatingDiya[];
  onInspectElement: (elementId: string) => void;
  isOfferingArghya?: boolean;
}

// Procedural Banana Tree (Kelwa ke Ped)
const BananaTree: React.FC<{ position: [number, number, number]; rotation?: [number, number, number]; scale?: number }> = ({ position, rotation = [0, 0, 0], scale = 1 }) => {
  const leafCount = 7;
  const leaves = useMemo(() => {
    return Array.from({ length: leafCount }).map((_, i) => {
      const angle = (i / leafCount) * Math.PI * 2;
      return {
        angle,
        pitch: 0.4 + (i % 3) * 0.1,
        length: 2.2 + (i % 2) * 0.4,
      };
    });
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Trunk with fibrous texture segments */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.18, 0.28, 2.8, 10]} />
        <meshStandardMaterial color="#385437" roughness={0.9} />
      </mesh>
      {/* Bamboo support stake */}
      <mesh position={[0.4, 1.2, 0.2]} rotation={[0.1, 0, -0.3]}>
        <cylinderGeometry args={[0.04, 0.04, 3.0, 6]} />
        <meshStandardMaterial color="#c2a649" roughness={0.7} />
      </mesh>
      {/* Banana Leaves */}
      {leaves.map((leaf, idx) => (
        <group key={idx} position={[0, 2.7, 0]} rotation={[0, leaf.angle, 0]}>
          <group rotation={[leaf.pitch, 0, 0]}>
            {/* Broad leaf blade */}
            <mesh position={[0, 0.2, leaf.length * 0.45]} rotation={[-0.2, 0, 0]}>
              <boxGeometry args={[0.65, 0.03, leaf.length]} />
              <meshStandardMaterial color="#40916c" roughness={0.6} side={THREE.DoubleSide} />
            </mesh>
            {/* Central leaf midrib (spine) */}
            <mesh position={[0, 0.22, leaf.length * 0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.03, leaf.length, 6]} />
              <meshStandardMaterial color="#95d5b2" roughness={0.5} />
            </mesh>
          </group>
        </group>
      ))}
      {/* Hanging Banana Cluster (Ghaudh) */}
      <group position={[0.25, 2.2, 0.2]} rotation={[0.4, 0, 0.2]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.03, 0.8, 6]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
        {/* Yellow/Green Bananas */}
        {[0, 0.15, 0.3].map((y, rowIdx) => (
          <group key={rowIdx} position={[0, -y, 0]}>
            {[0, 1.2, 2.4, 3.6, 4.8].map((rot, bIdx) => (
              <mesh key={bIdx} position={[Math.cos(rot) * 0.14, 0, Math.sin(rot) * 0.14]} rotation={[0.4, rot, 0]}>
                <capsuleGeometry args={[0.04, 0.28, 4, 8]} />
                <meshStandardMaterial color={rowIdx === 0 ? "#eed202" : "#99d98c"} roughness={0.4} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Banana Flower (Mocha) at tip */}
        <mesh position={[0, -0.65, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.12, 0.35, 8]} />
          <meshStandardMaterial color="#581845" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

// Sugarcane Canopy (Kosi Ganna Pyramid) with Terracotta Elephant inside
const SugarcaneKosiCanopy: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const canePositions = [
    { x: -0.7, z: -0.7, rotZ: 0.18, rotX: -0.18 },
    { x: 0.7, z: -0.7, rotZ: -0.18, rotX: -0.18 },
    { x: 0.7, z: 0.7, rotZ: -0.18, rotX: 0.18 },
    { x: -0.7, z: 0.7, rotZ: 0.18, rotX: 0.18 },
    { x: 0, z: -0.85, rotZ: 0, rotX: -0.22 },
  ];

  return (
    <group position={position}>
      {/* 5 Sugarcane Stalks */}
      {canePositions.map((cane, idx) => (
        <group key={idx} position={[cane.x, 1.6, cane.z]} rotation={[cane.rotX, 0, cane.rotZ]}>
          {/* Segmented Purple-Green Stalk */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.055, 3.4, 8]} />
            <meshStandardMaterial color="#6a040f" roughness={0.6} />
          </mesh>
          {/* Sugarcane top leafy tuft */}
          <group position={[0, 1.7, 0]}>
            {[-0.3, 0, 0.3].map((angle, leafIdx) => (
              <mesh key={leafIdx} position={[angle * 0.4, 0.3, 0]} rotation={[0, 0, angle]}>
                <boxGeometry args={[0.08, 0.7, 0.01]} />
                <meshStandardMaterial color="#2d6a4f" side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* Apex Red Binding Thread (Kalava) */}
      <mesh position={[0, 3.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.04, 8, 16]} />
        <meshStandardMaterial color="#d90429" />
      </mesh>

      {/* Terracotta Elephant (Kosi Haathi) at center */}
      <group position={[0, 0.3, 0]} scale={0.75}>
        {/* Body */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.65, 0.45, 0.9]} />
          <meshStandardMaterial color="#9c4124" roughness={0.85} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.55, 0.5]}>
          <sphereGeometry args={[0.26, 12, 12]} />
          <meshStandardMaterial color="#9c4124" roughness={0.85} />
        </mesh>
        {/* Trunk Upraised */}
        <mesh position={[0, 0.75, 0.75]} rotation={[-0.8, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.09, 0.55, 8]} />
          <meshStandardMaterial color="#9c4124" />
        </mesh>
        {/* Tusks */}
        <mesh position={[0.12, 0.45, 0.65]} rotation={[-0.4, 0.2, 0]}>
          <coneGeometry args={[0.03, 0.25, 6]} />
          <meshStandardMaterial color="#fdf0d5" />
        </mesh>
        <mesh position={[-0.12, 0.45, 0.65]} rotation={[-0.4, -0.2, 0]}>
          <coneGeometry args={[0.03, 0.25, 6]} />
          <meshStandardMaterial color="#fdf0d5" />
        </mesh>
        {/* 4 Sturdy Legs */}
        {[-0.22, 0.22].map((x) =>
          [-0.3, 0.3].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.12, z]}>
              <cylinderGeometry args={[0.09, 0.11, 0.35, 8]} />
              <meshStandardMaterial color="#80351d" />
            </mesh>
          ))
        )}
        {/* Traditional Aipan Rice Paste decorative lines */}
        <mesh position={[0, 0.58, 0]}>
          <boxGeometry args={[0.66, 0.03, 0.8]} />
          <meshStandardMaterial color="#fff" roughness={0.9} />
        </mesh>

        {/* 4 Burning Terracotta Lamps on Elephant's Back */}
        {[
          [-0.18, 0.62, -0.2],
          [0.18, 0.62, -0.2],
          [-0.18, 0.62, 0.2],
          [0.18, 0.62, 0.2],
        ].map((pos, dIdx) => (
          <group key={dIdx} position={pos as [number, number, number]}>
            {/* Clay lamp bowl */}
            <mesh>
              <cylinderGeometry args={[0.08, 0.04, 0.05, 8]} />
              <meshStandardMaterial color="#a74a2a" />
            </mesh>
            {/* Glowing flame */}
            <pointLight color="#ff9e00" intensity={1.5} distance={2.5} />
            <mesh position={[0, 0.06, 0]}>
              <coneGeometry args={[0.035, 0.09, 6]} />
              <meshBasicMaterial color="#ffdd00" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

// The Vrati (Chhath Devotee) with Saffron Saree & Nose-to-Forehead Orange Sindoor
const VratiDevotee: React.FC<{ position: [number, number, number]; isOffering?: boolean }> = ({ position, isOffering = false }) => {
  return (
    <group position={position}>
      {/* Body / Saree in Sacred Saffron */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.22, 0.38, 1.4, 12]} />
        <meshStandardMaterial color="#f37021" roughness={0.7} />
      </mesh>
      {/* Red Border Saree Pallu over head */}
      <mesh position={[0, 1.5, -0.05]}>
        <sphereGeometry args={[0.26, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial color="#d90429" roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* Face */}
      <mesh position={[0, 1.45, 0.06]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#d4a373" roughness={0.5} />
      </mesh>
      {/* ICONIC: Long Orange Matiya Sindoor from nose bridge to hairline */}
      <mesh position={[0, 1.5, 0.22]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.035, 0.24, 0.02]} />
        <meshBasicMaterial color="#ff5400" />
      </mesh>

      {/* Arms holding the Bamboo Soop */}
      <group position={[0, 1.15, 0.25]} rotation={[isOffering ? -0.3 : 0.2, 0, 0]}>
        {/* Left and Right Arms */}
        <mesh position={[-0.24, 0, 0.15]} rotation={[0.6, -0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        <mesh position={[0.24, 0, 0.15]} rotation={[0.6, 0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>

        {/* The Bamboo Soop (सुपवा) */}
        <group position={[0, 0.1, 0.42]}>
          {/* Curved Bamboo Winnowing Tray */}
          <mesh rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.55, 0.04, 0.65]} />
            <meshStandardMaterial color="#d4a373" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.08, -0.28]}>
            <boxGeometry args={[0.55, 0.12, 0.04]} />
            <meshStandardMaterial color="#bc6c25" />
          </mesh>
          {/* Orange Swastika mark on Soop */}
          <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.16, 0.16]} />
            <meshBasicMaterial color="#ff5400" />
          </mesh>

          {/* Offerings inside Soop: Coconut, Diya, Thekua, Singhara */}
          {/* Akhand Coconut */}
          <mesh position={[-0.14, 0.12, -0.05]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#582f0e" roughness={0.9} />
          </mesh>
          {/* Giant Pomelo (Dabh Nimbu) */}
          <mesh position={[0.15, 0.13, -0.05]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#a7c957" roughness={0.6} />
          </mesh>
          {/* Stack of Golden Thekuas */}
          <mesh position={[-0.12, 0.08, 0.15]}>
            <cylinderGeometry args={[0.08, 0.08, 0.05, 10]} />
            <meshStandardMaterial color="#bc6c25" roughness={0.5} />
          </mesh>
          {/* Lit Diya on Soop */}
          <group position={[0.08, 0.08, 0.15]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.03, 0.04, 8]} />
              <meshStandardMaterial color="#a74a2a" />
            </mesh>
            <pointLight color="#ffba08" intensity={2} distance={3} />
            <mesh position={[0, 0.05, 0]}>
              <coneGeometry args={[0.025, 0.07, 6]} />
              <meshBasicMaterial color="#ffdd00" />
            </mesh>
          </group>

          {/* Flow of Arghya Milk & Gangajal when offering */}
          {isOffering && (
            <group position={[0, 0.35, 0.2]}>
              <mesh>
                <cylinderGeometry args={[0.03, 0.06, 1.2, 8]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
              </mesh>
              <pointLight color="#ffffff" intensity={2} distance={2} />
            </group>
          )}
        </group>
      </group>
    </group>
  );
};

// Daura Bearer carrying the sacred woven basket on head
const DauraBearer: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Body in white Kurta/Dhoti & Yellow Gamchha */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.24, 0.3, 1.7, 10]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
      </mesh>
      {/* Yellow Gamchha wrapped around waist */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.26, 0.27, 0.3, 10]} />
        <meshStandardMaterial color="#f7b801" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      {/* Cloth ring (Bitha) on head */}
      <mesh position={[0, 2.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.05, 8, 16]} />
        <meshStandardMaterial color="#d90429" />
      </mesh>
      {/* The Bamboo Daura Basket */}
      <group position={[0, 2.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.55, 0.35, 0.35, 16]} />
          <meshStandardMaterial color="#bc6c25" roughness={0.9} />
        </mesh>
        {/* Yellow cotton covering cloth */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.52, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshStandardMaterial color="#ffb703" roughness={0.8} />
        </mesh>
        {/* Sugarcane tip peeking out */}
        <mesh position={[0.2, 0.2, 0]} rotation={[0.3, 0, 0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
      </group>
      {/* Arms holding the Daura */}
      <mesh position={[-0.28, 1.95, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.045, 0.045, 0.65, 6]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      <mesh position={[0.28, 1.95, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.045, 0.045, 0.65, 6]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
    </group>
  );
};

// Animated Holy River with gentle wave motion
const HolyRiver: React.FC<{ day: ChhathDay }> = ({ day }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const waterColor = useMemo(() => {
    switch (day) {
      case 'sandhya-arghya':
        return '#b55a1e'; // Saffron crimson sunset reflection
      case 'kharna':
        return '#02182b'; // Deep dark night
      case 'usha-arghya':
        return '#2a6f97'; // Dawn misty blue with orange sheen
      case 'nahay-khay':
      default:
        return '#218380'; // Clean daytime emerald
    }
  }, [day]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.15, 6]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[45, 25, 32, 32]} />
      <meshStandardMaterial
        color={waterColor}
        roughness={0.15}
        metalness={0.65}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
};

// Floating Diyas on the river water with gentle bobbing
const FloatingDiyasCollection: React.FC<{ diyas: FloatingDiya[] }> = ({ diyas }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = -0.08 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.03;
        child.position.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {diyas.map((diya) => (
        <group key={diya.id} position={[diya.x, -0.08, diya.z]}>
          {/* Marigold flower base (Genda phool ring) */}
          <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.06, 6, 12]} />
            <meshStandardMaterial color="#f77f00" roughness={0.9} />
          </mesh>
          {/* Earthen leaf / boat (Dona) */}
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.12, 0.06, 0.05, 8]} />
            <meshStandardMaterial color="#588157" />
          </mesh>
          {/* Clay Diya */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.07, 0.04, 0.04, 8]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          {/* Glowing Flame */}
          <pointLight color="#ffba08" intensity={1.8} distance={2.5} />
          <mesh position={[0, 0.11, 0]}>
            <coneGeometry args={[0.03, 0.08, 6]} />
            <meshBasicMaterial color="#ffea00" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Ghat Brick Steps & Architecture
const GhatSteps: React.FC = () => {
  const stepCount = 6;
  return (
    <group position={[0, 0, 0]}>
      {/* Stone steps descending into the Ganges */}
      {Array.from({ length: stepCount }).map((_, i) => (
        <mesh key={i} position={[0, (stepCount - i - 1) * 0.35, -i * 1.1]}>
          <boxGeometry args={[26, 0.38, 1.2]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#7f4f24" : "#936639"} roughness={0.9} />
        </mesh>
      ))}
      {/* Sandy shore bank (Balu) */}
      <mesh position={[0, -0.1, 1.8]}>
        <boxGeometry args={[30, 0.3, 4.5]} />
        <meshStandardMaterial color="#cca472" roughness={0.95} />
      </mesh>

      {/* Decorative Traditional Ghat Pillars / Lamps */}
      {[-7, 7].map((x) => (
        <group key={x} position={[x, 2.2, -4]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.35, 3.5, 8]} />
            <meshStandardMaterial color="#582f0e" roughness={0.9} />
          </mesh>
          {/* Lantern dome */}
          <mesh position={[0, 2, 0]}>
            <coneGeometry args={[0.5, 0.6, 6]} />
            <meshStandardMaterial color="#a74a2a" />
          </mesh>
          <pointLight position={[0, 1.6, 0]} color="#f77f00" intensity={1.5} distance={6} />
        </group>
      ))}
    </group>
  );
};

// Dynamic Surya Dev (The Sun God) & Atmospheric Sky
const SuryaAtmosphere: React.FC<{ day: ChhathDay }> = ({ day }) => {
  const sunConfig = useMemo(() => {
    switch (day) {
      case 'sandhya-arghya':
        // Setting Sun: Deep Saffron/Crimson on the Western horizon
        return {
          pos: [0, 2.8, 18] as [number, number, number],
          color: '#ff3f00',
          ambient: '#ff7b00',
          lightIntensity: 2.2,
          sunSize: 2.2,
          skyTint: '#4a154b',
        };
      case 'kharna':
        // Nighttime with first evening stars & moonlight
        return {
          pos: [0, -10, 15] as [number, number, number],
          color: '#1a1a2e',
          ambient: '#0f172a',
          lightIntensity: 0.3,
          sunSize: 0.1,
          skyTint: '#03071e',
        };
      case 'usha-arghya':
        // Rising Sun: Radiant crimson disc emerging through Eastern mist
        return {
          pos: [0, 3.5, 18] as [number, number, number],
          color: '#ff7700',
          ambient: '#fdc500',
          lightIntensity: 2.5,
          sunSize: 2.0,
          skyTint: '#3f37c9',
        };
      case 'nahay-khay':
      default:
        // Clear auspicious daytime solar radiance
        return {
          pos: [2, 10, 15] as [number, number, number],
          color: '#ffdd00',
          ambient: '#ffeedd',
          lightIntensity: 2.0,
          sunSize: 2.4,
          skyTint: '#64dfdf',
        };
    }
  }, [day]);

  return (
    <>
      <ambientLight color={sunConfig.ambient} intensity={0.6} />
      <directionalLight
        position={sunConfig.pos}
        color={sunConfig.color}
        intensity={sunConfig.lightIntensity}
        castShadow
      />

      {/* Radiant Sun Orb */}
      {day !== 'kharna' && (
        <group position={sunConfig.pos}>
          <mesh>
            <sphereGeometry args={[sunConfig.sunSize, 24, 24]} />
            <meshBasicMaterial color={sunConfig.color} />
          </mesh>
          {/* Solar Corona Glow */}
          <pointLight color={sunConfig.color} intensity={4} distance={30} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sparkles count={40} scale={sunConfig.sunSize * 2.5} size={6} speed={0.4} color="#ffd166" />
          </Float>
        </group>
      )}

      {/* Starry Night Sky for Kharna and Early Brahma Muhurta */}
      {(day === 'kharna' || day === 'usha-arghya') && (
        <Stars radius={80} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
      )}
    </>
  );
};

export const GhatScene3D: React.FC<GhatScene3DProps> = ({ currentDay, diyas, isOfferingArghya }) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 4.2, 10.5], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={[currentDay === 'kharna' ? '#070a14' : currentDay === 'sandhya-arghya' ? '#2b091f' : currentDay === 'usha-arghya' ? '#141738' : '#1e140d']} />
        <fog attach="fog" args={[currentDay === 'usha-arghya' ? '#202446' : currentDay === 'sandhya-arghya' ? '#3d1627' : '#150f0b', 8, 38]} />

        {/* Dynamic Sun & Lighting */}
        <SuryaAtmosphere day={currentDay} />

        {/* Ghat Steps & Bank */}
        <GhatSteps />

        {/* Holy River Ganges */}
        <HolyRiver day={currentDay} />

        {/* Sacred Banana Trees on Ghat Bank */}
        <BananaTree position={[-4.5, 0.4, 0.2]} rotation={[0, 0.5, 0]} scale={1.1} />
        <BananaTree position={[-5.8, 0.8, -1.2]} rotation={[0, 1.2, 0]} scale={0.9} />
        <BananaTree position={[4.8, 0.4, 0.4]} rotation={[0, -0.6, 0]} scale={1.05} />
        <BananaTree position={[6.0, 0.9, -1.0]} rotation={[0, -1.4, 0]} scale={0.95} />

        {/* Sugarcane Kosi Canopy with Terracotta Elephant */}
        <SugarcaneKosiCanopy position={[-2.4, 0.2, 0.6]} />

        {/* The Vrati standing in the river holding Soop */}
        <VratiDevotee position={[0, -0.2, 3.4]} isOffering={isOfferingArghya} />

        {/* Daura Bearer standing on ghat bank */}
        <DauraBearer position={[2.6, 0.4, 0.8]} />

        {/* Floating Diyas on the river */}
        <FloatingDiyasCollection diyas={diyas} />

        {/* Atmospheric Floating Sparkles / Incense Smoke / Petals */}
        <Sparkles count={50} scale={[15, 6, 12]} size={3} speed={0.3} color="#f7b801" />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={4}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2 - 0.05} // prevent going below water ground
          target={[0, 1.2, 2.5]}
        />
      </Canvas>
    </div>
  );
};
