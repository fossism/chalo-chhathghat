import React, { useMemo } from 'react';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';

// 1. Family Helper pouring the Milk/Gangajal Arghya stream beside the Vrati
export const ArghyaFamilyHelper: React.FC<{
  position: [number, number, number];
  isOffering?: boolean;
}> = ({ position, isOffering = false }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position}>
      {/* Body in yellow/orange Kurta */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.24, 0.3, 1.2, 10]} />
        <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
      </mesh>

      {/* Head & Face */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
      </mesh>
      {/* Styled hair */}
      <mesh position={[0, 1.82, -0.04]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshToonMaterial color="#1a1423" gradientMap={toonGradient} />
      </mesh>

      {/* Arms holding the Copper Kalash */}
      <group position={[-0.3, 1.35, 0.35]} rotation={[0, 0, -0.6]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.5, 6]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
        {/* Copper Kalash (Lota) tilted */}
        <mesh position={[0, 0.28, 0]} rotation={[0, 0, -0.8]}>
          <sphereGeometry args={[0.13, 10, 10]} />
          <meshToonMaterial color="#d4a373" gradientMap={toonGradient} />
        </mesh>

        {/* Luminous Stream of Raw Milk & Gangajal */}
        {isOffering && (
          <group position={[0, 0.45, 0]}>
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.03, 0.07, 1.8, 8]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.92} />
            </mesh>
            <pointLight color="#ffffff" intensity={3} distance={4} />
          </group>
        )}
      </group>
    </group>
  );
};

// 2. Women's Folk Singing Circle on Ghat Steps (महिला मंडली)
export const SingingWomenCircle: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position}>
      {/* Woman 1: In Crimson Saree with Brass Manjeera */}
      <group position={[-1.2, 0, 0]}>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.22, 0.35, 1.2, 10]} />
          <meshToonMaterial color="#d90429" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
        {/* Brass Manjeera in hands */}
        <mesh position={[0, 1.0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.03, 8]} />
          <meshToonMaterial color="#ffd166" gradientMap={toonGradient} />
        </mesh>
      </group>

      {/* Woman 2: In Bright Marigold Yellow Saree */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.22, 0.35, 1.2, 10]} />
          <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
      </group>

      {/* Woman 3: In Magenta Saree playing Dholak */}
      <group position={[1.2, 0, 0]}>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.22, 0.35, 1.2, 10]} />
          <meshToonMaterial color="#9e0059" gradientMap={toonGradient} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
        </mesh>
        {/* Dholak Drum */}
        <mesh position={[0, 0.8, 0.35]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.7, 10]} />
          <meshToonMaterial color="#7f4f24" gradientMap={toonGradient} />
        </mesh>
      </group>
    </group>
  );
};
