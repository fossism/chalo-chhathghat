import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';

interface CharacterProps {
  position: { x: number; y: number; z: number; rotY: number };
  isWalking: boolean;
  isInWater?: boolean;
  isOffering?: boolean;
}

// 1. Anime Lead Daura Bearer (Hero Devotee Protagonist)
export const AnimeDauraBearer: React.FC<CharacterProps> = ({
  position,
  isWalking,
  isInWater = false,
  isOffering = false,
}) => {
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const dauraRef = useRef<THREE.Group>(null);
  const gamchhaRef = useRef<THREE.Mesh>(null);

  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 9;

    // Fluttering gamchha in the breeze
    if (gamchhaRef.current) {
      gamchhaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.15;
    }

    if (isWalking) {
      // Biomechanical leg swing with knee flexion
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(t) * 0.65;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = -Math.sin(t) * 0.65;
      }
      // Head-balanced Daura subtle swaying physics
      if (dauraRef.current) {
        dauraRef.current.position.y = 2.45 + Math.abs(Math.sin(t)) * 0.06;
        dauraRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
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
      {/* Anime Torso / White Kurta */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.65, 8, 16]} />
        <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
      </mesh>

      {/* Draped Yellow Gamchha over Shoulder with Flutter */}
      <mesh
        ref={gamchhaRef}
        position={[0.12, 1.35, 0.08]}
        rotation={[0.1, 0, 0.15]}
      >
        <boxGeometry args={[0.22, 0.85, 0.08]} />
        <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
      </mesh>

      {/* Anime Head & Face Structure */}
      <group position={[0, 1.88, 0]}>
        {/* Face with tapered anime jawline */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.18, 0.32, 12]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.19, 12, 12]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>

        {/* Styled Dark Anime Hair with highlights */}
        <mesh position={[0, 0.14, -0.04]}>
          <sphereGeometry args={[0.21, 10, 10]} />
          <meshToonMaterial color="#1a1423" gradientMap={toonGradient} />
        </mesh>
        {/* Hair front locks */}
        {[-0.08, 0, 0.08].map((hx, hIdx) => (
          <mesh key={hIdx} position={[hx, 0.16, 0.16]} rotation={[0.4, 0, hx * 2]}>
            <coneGeometry args={[0.04, 0.16, 4]} />
            <meshToonMaterial color="#2d1b4e" gradientMap={toonGradient} />
          </mesh>
        ))}

        {/* Expressive Anime Eyes & Tilak */}
        <mesh position={[-0.06, 0.04, 0.16]}>
          <boxGeometry args={[0.035, 0.025, 0.02]} />
          <meshBasicMaterial color="#10002b" />
        </mesh>
        <mesh position={[0.06, 0.04, 0.16]}>
          <boxGeometry args={[0.035, 0.025, 0.02]} />
          <meshBasicMaterial color="#10002b" />
        </mesh>

        {/* Orange Matiya Sindoor / Tilak line on nose & forehead */}
        <mesh position={[0, 0.08, 0.18]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.035, 0.22, 0.02]} />
          <meshBasicMaterial color="#ff5400" />
        </mesh>
      </group>

      {/* Upraised Arms with Jointed Elbows Supporting Daura */}
      {/* Left Arm */}
      <group position={[-0.26, 1.45, 0]}>
        {/* Upper arm */}
        <mesh position={[-0.1, 0.22, 0]} rotation={[0, 0, -0.85]}>
          <cylinderGeometry args={[0.05, 0.06, 0.45, 8]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
        {/* Forearm angled up to head */}
        <mesh position={[-0.14, 0.55, 0.05]} rotation={[0, 0, 0.45]}>
          <cylinderGeometry args={[0.045, 0.05, 0.45, 8]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.26, 1.45, 0]}>
        <mesh position={[0.1, 0.22, 0]} rotation={[0, 0, 0.85]}>
          <cylinderGeometry args={[0.05, 0.06, 0.45, 8]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0.14, 0.55, 0.05]} rotation={[0, 0, -0.45]}>
          <cylinderGeometry args={[0.045, 0.05, 0.45, 8]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
      </group>

      {/* Walking Legs with Knee Joints */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.14, 0.85, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.48, 8]} />
          <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0, -0.6, 0.02]}>
          <cylinderGeometry args={[0.065, 0.055, 0.45, 8]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.14, 0.85, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.48, 8]} />
          <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0, -0.6, 0.02]}>
          <cylinderGeometry args={[0.065, 0.055, 0.45, 8]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
      </group>

      {/* The Head-Balanced Bamboo Daura Basket */}
      <group ref={dauraRef} position={[0, 2.45, 0]}>
        {/* Cloth ring pad (Bitha) */}
        <mesh position={[0, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.06, 8, 16]} />
          <meshToonMaterial color="#d90429" gradientMap={toonGradient} />
        </mesh>

        {/* Large Woven Bamboo Daura */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.75, 0.45, 0.42, 16]} />
          <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
        </mesh>

        {/* Yellow Ceremonial Silk Covering Cloth */}
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.72, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
          <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
        </mesh>

        {/* Sugarcane stalk tips projecting from basket */}
        <mesh position={[0.3, 0.28, 0.12]} rotation={[0.32, 0, 0.22]}>
          <cylinderGeometry args={[0.038, 0.038, 1.1, 8]} />
          <meshToonMaterial color="#2d6a4f" gradientMap={toonGradient} />
        </mesh>
      </group>

      {/* Water Ripple Rings when walking in the river */}
      {isInWater && (
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.85, 24]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
        </mesh>
      )}
    </group>
  );
};

// 2. Anime Vrati (Heroine Devotee Standing in Water with Flowing Saree)
export const AnimeVrati: React.FC<{
  position: [number, number, number];
  isOffering?: boolean;
}> = ({ position, isOffering = false }) => {
  const palluRef = useRef<THREE.Mesh>(null);
  const sareeTex = useMemo(() => animeTexGen.getAnimeSareeTexture(), []);
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  useFrame((state) => {
    // Billowing saree pallu wave in the river breeze
    if (palluRef.current) {
      palluRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2.5) * 0.18;
      palluRef.current.position.x = -0.32 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Draped Saree Torso & Pleated Skirt */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.44, 1.6, 16]} />
        <meshToonMaterial map={sareeTex} gradientMap={toonGradient} />
      </mesh>

      {/* Billowing Saree Pallu waving in the river breeze */}
      <mesh
        ref={palluRef}
        position={[-0.32, 1.1, -0.15]}
        rotation={[0.15, 0.2, 0.3]}
      >
        <boxGeometry args={[0.42, 1.2, 0.02]} />
        <meshToonMaterial color="#d90429" gradientMap={toonGradient} side={THREE.DoubleSide} />
      </mesh>

      {/* Graceful Saree Ghoonghat covering the head */}
      <mesh position={[0, 1.9, -0.06]}>
        <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
        <meshToonMaterial color="#9e0059" gradientMap={toonGradient} side={THREE.DoubleSide} />
      </mesh>

      {/* Expressive Anime Face */}
      <group position={[0, 1.82, 0.06]}>
        <mesh>
          <sphereGeometry args={[0.21, 14, 14]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>

        {/* Big Expressive Anime Eyes with Highlights */}
        <mesh position={[-0.07, 0.03, 0.18]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#10002b" />
        </mesh>
        <mesh position={[-0.06, 0.045, 0.2]}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh position={[0.07, 0.03, 0.18]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#10002b" />
        </mesh>
        <mesh position={[0.08, 0.045, 0.2]}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* ICONIC: Bold Orange Matiya Sindoor from nose tip up hairline */}
        <mesh position={[0, 0.08, 0.21]} rotation={[0.18, 0, 0]}>
          <boxGeometry args={[0.042, 0.28, 0.02]} />
          <meshBasicMaterial color="#ff5400" />
        </mesh>
      </group>

      {/* Uplifted Arms Holding the Sacred Bamboo Soop */}
      <group position={[0, 1.5, 0.35]} rotation={[isOffering ? -0.38 : 0.18, 0, 0]}>
        {/* Left & Right Arms */}
        <mesh position={[-0.28, 0, 0.18]} rotation={[0.65, -0.3, 0]}>
          <cylinderGeometry args={[0.055, 0.05, 0.6, 8]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0.28, 0, 0.18]} rotation={[0.65, 0.3, 0]}>
          <cylinderGeometry args={[0.055, 0.05, 0.6, 8]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>

        {/* Beautiful Woven Bamboo Soop with Offerings */}
        <group position={[0, 0.12, 0.52]}>
          {/* Bamboo winnowing tray */}
          <mesh rotation={[0.22, 0, 0]}>
            <boxGeometry args={[0.72, 0.04, 0.88]} />
            <meshToonMaterial color="#d4a373" gradientMap={toonGradient} />
          </mesh>
          <mesh position={[0, 0.1, -0.4]}>
            <boxGeometry args={[0.72, 0.18, 0.05]} />
            <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
          </mesh>

          {/* Central Red Vermilion Swastika */}
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.22, 0.22]} />
            <meshBasicMaterial color="#ff3800" />
          </mesh>

          {/* Offerings: Coconut, Pomelo, Thekua, Singhara, Diya */}
          {/* Coconut with Mauli */}
          <mesh position={[-0.18, 0.15, -0.08]}>
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshToonMaterial color="#582f0e" gradientMap={toonGradient} />
          </mesh>

          {/* Dabh Pomelo with Leaf */}
          <mesh position={[0.18, 0.16, -0.08]}>
            <sphereGeometry args={[0.15, 10, 10]} />
            <meshToonMaterial color="#a7c957" gradientMap={toonGradient} />
          </mesh>

          {/* Stack of Golden Thekuas */}
          <mesh position={[-0.16, 0.1, 0.18]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
            <meshToonMaterial color="#bc6c25" gradientMap={toonGradient} />
          </mesh>

          {/* Lit Diya with Warm Glowing Flame */}
          <group position={[0.16, 0.1, 0.18]}>
            <mesh>
              <cylinderGeometry args={[0.07, 0.035, 0.05, 8]} />
              <meshToonMaterial color="#963f24" gradientMap={toonGradient} />
            </mesh>
            <pointLight color="#ffb703" intensity={2.5} distance={3.5} />
            <mesh position={[0, 0.07, 0]}>
              <coneGeometry args={[0.032, 0.1, 6]} />
              <meshBasicMaterial color="#ffee32" />
            </mesh>
          </group>

          {/* Glistening Milk & Gangajal Arghya Stream */}
          {isOffering && (
            <group position={[0, 0.45, 0.22]}>
              <mesh position={[0.2, 0.25, 0]} rotation={[0, 0, -0.8]}>
                <sphereGeometry args={[0.12, 10, 10]} />
                <meshToonMaterial color="#ffd166" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, -0.25, 0]}>
                <cylinderGeometry args={[0.035, 0.08, 1.8, 8]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
              </mesh>
              <pointLight color="#ffffff" intensity={3.5} distance={4} />
            </group>
          )}
        </group>
      </group>
    </group>
  );
};
