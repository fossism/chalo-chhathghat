import React, { useMemo } from 'react';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';

interface BananaTreeProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

// Highly Realistic & Anime-detailed 3D Banana Tree (Kelwa ke Ped)
export const AnimeRealisticBananaTree: React.FC<BananaTreeProps> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}) => {
  const leafTex = useMemo(() => animeTexGen.getBananaLeafTexture(), []);
  const trunkTex = useMemo(() => animeTexGen.getBananaTrunkTexture(), []);
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  // 10 Anatomically accurate arching fronds with natural parabolic droop
  const leafFronds = useMemo(() => {
    const count = 10;
    return Array.from({ length: count }).map((_, i) => ({
      azimuth: (i / count) * Math.PI * 2 + (i % 2 === 0 ? 0.15 : -0.15),
      elevation: 0.35 + (i % 3) * 0.12,
      length: 3.4 + (i % 2) * 0.6,
      width: 0.95,
      curvature: 0.5 + (i % 2) * 0.2,
    }));
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 1. Curved Tapered Pseudostem (Trunk) with Sheath Texture */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.42, 3.4, 16]} />
        <meshToonMaterial
          map={trunkTex}
          gradientMap={toonGradient}
        />
      </mesh>

      {/* 2. Natural Bamboo Support Crutch / Prop (Theka) */}
      <mesh position={[0.55, 1.6, 0.25]} rotation={[0.08, 0, -0.32]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 3.8, 8]} />
        <meshToonMaterial color="#d4b483" gradientMap={toonGradient} />
      </mesh>

      {/* 3. Sweeping Drooping Banana Fronds */}
      {leafFronds.map((frond, idx) => (
        <group key={idx} position={[0, 3.3, 0]} rotation={[0, frond.azimuth, 0]}>
          <group rotation={[frond.elevation, 0, 0]}>
            {/* Broad leaf blade with parabolic droop */}
            <mesh position={[0, 0.2, frond.length * 0.48]} rotation={[-frond.curvature * 0.4, 0, 0]}>
              <boxGeometry args={[frond.width, 0.02, frond.length]} />
              <meshToonMaterial
                map={leafTex}
                gradientMap={toonGradient}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Pale Green Central Midrib (Spine) */}
            <mesh position={[0, 0.22, frond.length * 0.48]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.05, frond.length, 8]} />
              <meshToonMaterial color="#d8f3dc" gradientMap={toonGradient} />
            </mesh>
          </group>
        </group>
      ))}

      {/* 4. Hanging Banana Bunch (Kelwa ke Ghaudh) & Purple Blossom (Mocha) */}
      <group position={[0.32, 2.5, 0.2]} rotation={[0.42, 0, 0.2]}>
        {/* Curved Fruiting Stalk */}
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.05, 0.04, 1.0, 8]} />
          <meshToonMaterial color="#2d6a4f" gradientMap={toonGradient} />
        </mesh>

        {/* 4 Spiral Tiers of Crescent Bananas */}
        {[0, 0.2, 0.4, 0.6].map((y, tier) => (
          <group key={tier} position={[0, -y, 0]}>
            {[0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4].map((angle, bIdx) => (
              <mesh
                key={bIdx}
                position={[Math.cos(angle) * 0.18, 0, Math.sin(angle) * 0.18]}
                rotation={[0.5, angle, 0]}
              >
                <capsuleGeometry args={[0.045, 0.35, 6, 10]} />
                <meshToonMaterial
                  color={tier < 2 ? '#ffb703' : '#70e000'}
                  gradientMap={toonGradient}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* Deep Burgundy Banana Blossom (Mocha) at tip */}
        <mesh position={[0, -1.05, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.18, 0.55, 10]} />
          <meshToonMaterial color="#4a0e2e" gradientMap={toonGradient} />
        </mesh>
      </group>
    </group>
  );
};

// 5-Sugarcane Kosi Canopy with Terracotta Elephant and Burning Lamps
export const AnimeSugarcaneCanopy: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position}>
      {/* 5 Segmented Sugarcane Stalks */}
      {[
        [-0.85, -0.85, 0.22, -0.22],
        [0.85, -0.85, -0.22, -0.22],
        [0.85, 0.85, -0.22, 0.22],
        [-0.85, 0.85, 0.22, 0.22],
        [0, -1.0, 0, -0.26],
      ].map(([x, z, rZ, rX], idx) => (
        <group key={idx} position={[x, 2.0, z]} rotation={[rX, 0, rZ]}>
          {/* Main jointed purple stalk */}
          <mesh>
            <cylinderGeometry args={[0.055, 0.07, 4.4, 8]} />
            <meshToonMaterial color="#5c0099" gradientMap={toonGradient} />
          </mesh>
          {/* White rings (nodes) */}
          {[-1.5, -0.7, 0.1, 0.9, 1.7].map((nY) => (
            <mesh key={nY} position={[0, nY, 0]}>
              <cylinderGeometry args={[0.065, 0.065, 0.06, 8]} />
              <meshToonMaterial color="#fdf0d5" gradientMap={toonGradient} />
            </mesh>
          ))}
          {/* Spiky crown blades */}
          <group position={[0, 2.3, 0]}>
            {[-0.35, 0, 0.35].map((angle, leafIdx) => (
              <mesh key={leafIdx} position={[angle * 0.45, 0.4, 0]} rotation={[0, 0, angle]}>
                <boxGeometry args={[0.1, 0.95, 0.02]} />
                <meshToonMaterial color="#2d6a4f" side={THREE.DoubleSide} gradientMap={toonGradient} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* Red Kalava Thread at Apex */}
      <mesh position={[0, 4.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.06, 8, 16]} />
        <meshToonMaterial color="#d90429" gradientMap={toonGradient} />
      </mesh>

      {/* Terracotta Elephant (Kosi Haathi) */}
      <group position={[0, 0.45, 0]} scale={0.9}>
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[0.85, 0.65, 1.15]} />
          <meshToonMaterial color="#9c4124" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0, 0.75, 0.68]}>
          <sphereGeometry args={[0.36, 12, 12]} />
          <meshToonMaterial color="#9c4124" gradientMap={toonGradient} />
        </mesh>
        {/* Upraised trunk */}
        <mesh position={[0, 1.05, 1.0]} rotation={[-0.8, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.13, 0.75, 8]} />
          <meshToonMaterial color="#8b3a1f" gradientMap={toonGradient} />
        </mesh>
        {/* Burning oil lamps on elephant */}
        {[
          [-0.24, 0.85, -0.28],
          [0.24, 0.85, -0.28],
          [-0.24, 0.85, 0.28],
          [0.24, 0.85, 0.28],
        ].map((pos, dIdx) => (
          <group key={dIdx} position={pos as [number, number, number]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.05, 0.06, 8]} />
              <meshToonMaterial color="#78290f" gradientMap={toonGradient} />
            </mesh>
            <pointLight color="#ff9e00" intensity={2} distance={3.5} />
            <mesh position={[0, 0.08, 0]}>
              <coneGeometry args={[0.04, 0.12, 6]} />
              <meshBasicMaterial color="#ffee32" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
