import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';

interface MassiveChhathCrowdProps {
  isOffering: boolean;
  currentDay: string;
}

// Data model for a single crowd character
interface PersonData {
  id: number;
  type: 'vrati_water' | 'helper_water' | 'dada' | 'dadi' | 'kid' | 'woman_steps' | 'man_daura' | 'singer';
  pos: [number, number, number];
  rotY: number;
  dressColor: string;
  secondaryColor?: string;
  scale: number;
  phase: number;
}

export const MassiveChhathCrowd: React.FC<MassiveChhathCrowdProps> = ({ isOffering }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);
  const waterVratisRef = useRef<THREE.Group>(null);
  const sparklersRef = useRef<THREE.Group>(null);

  // Generate 160+ authentic diverse devotees across Ghat steps, River & Procession
  const crowdData: PersonData[] = useMemo(() => {
    const list: PersonData[] = [];
    let idCounter = 1;

    // 1. River Wading Vratis (36 Women in Water in 2 respectful rows)
    // Row 1: Z = 277, Row 2: Z = 281
    for (let r = 0; r < 2; r++) {
      const zPos = 277 + r * 3.5;
      for (let x = -32; x <= 32; x += 3.8) {
        if (Math.abs(x) < 2.5 && r === 0) continue; // Leave center space for the main player/heroine
        const sareeColors = ['#f77f00', '#ffb703', '#e63946', '#d90429', '#f37021', '#fcbf49'];
        list.push({
          id: idCounter++,
          type: 'vrati_water',
          pos: [x + (Math.random() - 0.5) * 0.8, -0.28, zPos + (Math.random() - 0.5) * 0.6],
          rotY: (Math.random() - 0.5) * 0.25, // Facing the Sun on the horizon
          dressColor: sareeColors[idCounter % sareeColors.length],
          secondaryColor: '#9e0059',
          scale: 0.95 + (Math.random() - 0.5) * 0.08,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // 2. Family Arghya Helpers standing beside Vratis in water (24 Men/Sons with Copper Kalashes)
    for (let x = -30; x <= 30; x += 5.5) {
      if (Math.abs(x) < 3.0) continue;
      list.push({
        id: idCounter++,
        type: 'helper_water',
        pos: [x + 1.2, -0.28, 277.5 + (Math.random() - 0.5) * 0.5],
        rotY: -0.3,
        dressColor: '#ffb703',
        scale: 1.0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 3. Ghat Steps Crowd (70+ Devotees: Dada, Dadi, Women, Men, Kids)
    // Distributed along Ghat Steps from Z: 242 to 272, and X: -32 to 32
    for (let i = 0; i < 70; i++) {
      const stepIdx = i % 7;
      const zPos = 243 + stepIdx * 4.2;
      const yPos = -0.18 * stepIdx;
      const xPos = -30 + ((i * 7) % 60) + (Math.random() - 0.5) * 2;

      // Randomize demographics
      const rand = Math.random();
      let type: PersonData['type'] = 'woman_steps';
      let dressColor = '#f77f00';
      let scale = 1.0;

      if (rand < 0.2) {
        // Dada ji (Elder Grandfather)
        type = 'dada';
        dressColor = '#f8f9fa';
        scale = 0.95;
      } else if (rand < 0.4) {
        // Dadi ji (Elder Grandmother)
        type = 'dadi';
        dressColor = '#e9ecef';
        scale = 0.88;
      } else if (rand < 0.6) {
        // Kids with sparklers or sugarcanes
        type = 'kid';
        dressColor = i % 2 === 0 ? '#ff0054' : '#70e000';
        scale = 0.65;
      } else if (rand < 0.8) {
        // Daura Bearer Man
        type = 'man_daura';
        dressColor = '#f8f9fa';
        scale = 1.05;
      } else {
        // Woman in festive saree
        type = 'woman_steps';
        dressColor = i % 3 === 0 ? '#b7094c' : i % 3 === 1 ? '#ffb703' : '#d90429';
        scale = 0.92;
      }

      list.push({
        id: idCounter++,
        type,
        pos: [xPos, yPos, zPos],
        rotY: Math.random() > 0.5 ? 0.2 : -0.2,
        dressColor,
        scale,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 4. Procession Marchers along the trail (30+ people marching toward the ghat)
    // Distributed from Z: 130 to 235
    for (let i = 0; i < 30; i++) {
      const zPos = 135 + i * 3.4;
      const xPos = (i % 2 === 0 ? -2.2 : 2.2) + (Math.random() - 0.5) * 1.5;
      const isKid = i % 5 === 0;
      const isDaura = i % 3 === 0;

      list.push({
        id: idCounter++,
        type: isKid ? 'kid' : isDaura ? 'man_daura' : 'woman_steps',
        pos: [xPos, 0, zPos],
        rotY: 0, // Marching forward toward ghat (+Z)
        dressColor: isDaura ? '#f8f9fa' : isKid ? '#00f5d4' : '#ffb703',
        scale: isKid ? 0.65 : 1.0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return list;
  }, []);

  // Subtle crowd wave animation
  useFrame((state) => {
    if (waterVratisRef.current) {
      waterVratisRef.current.children.forEach((child, idx) => {
        child.position.y = -0.28 + Math.sin(state.clock.elapsedTime * 1.5 + idx) * 0.025;
      });
    }
  });

  return (
    <group>
      {/* 1. ROW OF WATER VRATIS (36 Women in the Ganges offering Arghya together) */}
      <group ref={waterVratisRef}>
        {crowdData
          .filter((p) => p.type === 'vrati_water')
          .map((p) => (
            <group key={p.id} position={p.pos} rotation={[0, p.rotY, 0]} scale={p.scale}>
              {/* Saree Body */}
              <mesh position={[0, 0.9, 0]}>
                <cylinderGeometry args={[0.24, 0.38, 1.5, 12]} />
                <meshToonMaterial color={p.dressColor} gradientMap={toonGradient} />
              </mesh>
              {/* Saree Ghoonghat */}
              <mesh position={[0, 1.82, -0.05]}>
                <sphereGeometry args={[0.3, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
                <meshToonMaterial color={p.secondaryColor || '#b7094c'} gradientMap={toonGradient} side={THREE.DoubleSide} />
              </mesh>
              {/* Head */}
              <mesh position={[0, 1.74, 0.05]}>
                <sphereGeometry args={[0.19, 10, 10]} />
                <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
              </mesh>
              {/* Bold Orange Matiya Sindoor on forehead */}
              <mesh position={[0, 1.8, 0.22]} rotation={[0.18, 0, 0]}>
                <boxGeometry args={[0.038, 0.26, 0.02]} />
                <meshBasicMaterial color="#ff5400" />
              </mesh>
              {/* Uplifted Bamboo Soop with lit diya */}
              <group position={[0, 1.45, 0.35]} rotation={[isOffering ? -0.35 : 0.15, 0, 0]}>
                {/* Woven Soop */}
                <mesh rotation={[0.2, 0, 0]}>
                  <boxGeometry args={[0.62, 0.035, 0.75]} />
                  <meshToonMaterial color="#d4a373" gradientMap={toonGradient} />
                </mesh>
                {/* Glowing Diya on Soop */}
                <pointLight position={[0.12, 0.12, 0.12]} color="#ffb703" intensity={1.5} distance={2.5} />
                <mesh position={[0.12, 0.1, 0.12]}>
                  <coneGeometry args={[0.028, 0.08, 6]} />
                  <meshBasicMaterial color="#ffee32" />
                </mesh>
              </group>
            </group>
          ))}
      </group>

      {/* 2. WATER HELPERS POURING MILK ARGHYA (24 Men pouring Milk streams) */}
      {crowdData
        .filter((p) => p.type === 'helper_water')
        .map((p) => (
          <group key={p.id} position={p.pos} rotation={[0, p.rotY, 0]} scale={p.scale}>
            <mesh position={[0, 0.95, 0]}>
              <cylinderGeometry args={[0.22, 0.28, 1.2, 8]} />
              <meshToonMaterial color={p.dressColor} gradientMap={toonGradient} />
            </mesh>
            <mesh position={[0, 1.68, 0]}>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
            </mesh>
            {/* Tilted Brass Kalash */}
            <group position={[-0.25, 1.35, 0.3]} rotation={[0, 0, -0.7]}>
              <mesh position={[0, 0.2, 0]}>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshToonMaterial color="#ffd166" gradientMap={toonGradient} />
              </mesh>
              {/* Milk Arghya Stream cascading when offering */}
              {isOffering && (
                <mesh position={[0, -0.3, 0]}>
                  <cylinderGeometry args={[0.025, 0.06, 1.5, 6]} />
                  <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
                </mesh>
              )}
            </group>
          </group>
        ))}

      {/* 3. DADA JI (Elder Grandfathers with Shawls praying) */}
      {crowdData
        .filter((p) => p.type === 'dada')
        .map((p) => (
          <group key={p.id} position={p.pos} rotation={[0, p.rotY, 0]} scale={p.scale}>
            {/* White Kurta / Dhoti */}
            <mesh position={[0, 0.9, 0]}>
              <cylinderGeometry args={[0.24, 0.28, 1.3, 8]} />
              <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
            </mesh>
            {/* Brown/Grey Warm Shawl draped across chest */}
            <mesh position={[0, 1.15, 0.05]}>
              <boxGeometry args={[0.55, 0.45, 0.25]} />
              <meshToonMaterial color="#6c757d" gradientMap={toonGradient} />
            </mesh>
            {/* Grey/White Hair Head */}
            <mesh position={[0, 1.7, 0]}>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
            </mesh>
            <mesh position={[0, 1.82, -0.02]}>
              <sphereGeometry args={[0.19, 8, 8]} />
              <meshToonMaterial color="#e9ecef" gradientMap={toonGradient} />
            </mesh>
            {/* Folded Hands (Pranaam pose) */}
            <mesh position={[0, 1.25, 0.25]}>
              <boxGeometry args={[0.15, 0.2, 0.12]} />
              <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
            </mesh>
          </group>
        ))}

      {/* 4. DADI JI (Elder Grandmothers singing and blessing) */}
      {crowdData
        .filter((p) => p.type === 'dadi')
        .map((p) => (
          <group key={p.id} position={p.pos} rotation={[0, p.rotY, 0]} scale={p.scale}>
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.24, 0.35, 1.2, 8]} />
              <meshToonMaterial color="#dee2e6" gradientMap={toonGradient} />
            </mesh>
            {/* Head covered with cotton saree */}
            <mesh position={[0, 1.55, -0.04]}>
              <sphereGeometry args={[0.26, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
              <meshToonMaterial color="#e9ecef" gradientMap={toonGradient} side={THREE.DoubleSide} />
            </mesh>
            {/* Orange Matiya Sindoor */}
            <mesh position={[0, 1.54, 0.2]} rotation={[0.18, 0, 0]}>
              <boxGeometry args={[0.035, 0.22, 0.02]} />
              <meshBasicMaterial color="#ff5400" />
            </mesh>
          </group>
        ))}

      {/* 5. EXCITED KIDS (Holding sparklers and small sugarcanes) */}
      <group ref={sparklersRef}>
        {crowdData
          .filter((p) => p.type === 'kid')
          .map((p) => (
            <group key={p.id} position={p.pos} rotation={[0, p.rotY, 0]} scale={p.scale}>
              {/* Kid Kurta */}
              <mesh position={[0, 0.75, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 1.0, 8]} />
                <meshToonMaterial color={p.dressColor} gradientMap={toonGradient} />
              </mesh>
              {/* Head */}
              <mesh position={[0, 1.4, 0]}>
                <sphereGeometry args={[0.17, 8, 8]} />
                <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
              </mesh>
              {/* Sparkler (Phuljhadi) with flickering light */}
              <group position={[0.25, 1.2, 0.25]}>
                <mesh position={[0, 0.15, 0]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.45, 4]} />
                  <meshToonMaterial color="#495057" gradientMap={toonGradient} />
                </mesh>
                <pointLight color="#70e000" intensity={1.8} distance={2.5} />
                <mesh position={[0, 0.38, 0]}>
                  <sphereGeometry args={[0.05, 6, 6]} />
                  <meshBasicMaterial color="#ccff33" />
                </mesh>
              </group>
            </group>
          ))}
      </group>

      {/* 6. DAURA BEARER MEN (Carrying loaded baskets on head) */}
      {crowdData
        .filter((p) => p.type === 'man_daura')
        .map((p) => (
          <group key={p.id} position={p.pos} rotation={[0, p.rotY, 0]} scale={p.scale}>
            <mesh position={[0, 1.0, 0]}>
              <cylinderGeometry args={[0.24, 0.28, 1.3, 8]} />
              <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
            </mesh>
            <mesh position={[0, 1.78, 0]}>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
            </mesh>
            {/* Bamboo Daura on head */}
            <group position={[0, 2.25, 0]}>
              <mesh>
                <cylinderGeometry args={[0.6, 0.38, 0.35, 12]} />
                <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 0.18, 0]}>
                <sphereGeometry args={[0.58, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
              </mesh>
            </group>
          </group>
        ))}

      {/* 7. WOMEN ON GHAT STEPS (Festive Saree, Sindoor, Arranging Puja) */}
      {crowdData
        .filter((p) => p.type === 'woman_steps')
        .map((p) => (
          <group key={p.id} position={p.pos} rotation={[0, p.rotY, 0]} scale={p.scale}>
            <mesh position={[0, 0.85, 0]}>
              <cylinderGeometry args={[0.24, 0.36, 1.3, 8]} />
              <meshToonMaterial color={p.dressColor} gradientMap={toonGradient} />
            </mesh>
            <mesh position={[0, 1.62, -0.04]}>
              <sphereGeometry args={[0.28, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
              <meshToonMaterial color="#c1121f" gradientMap={toonGradient} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 1.58, 0.05]}>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
            </mesh>
            <mesh position={[0, 1.62, 0.2]} rotation={[0.18, 0, 0]}>
              <boxGeometry args={[0.035, 0.24, 0.02]} />
              <meshBasicMaterial color="#ff5400" />
            </mesh>
          </group>
        ))}
    </group>
  );
};
