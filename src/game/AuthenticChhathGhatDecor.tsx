import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';

// 1. Multi-Colored Festive Fairy Lights (झालर बत्ती / LED Serial Lights along Ghat)
export const FairyLightGarland: React.FC<{
  startPos: [number, number, number];
  endPos: [number, number, number];
  bulbCount?: number;
}> = ({ startPos, endPos, bulbCount = 14 }) => {
  const bulbs = useMemo(() => {
    const colors = ['#ff0054', '#ffbe0b', '#00f5d4', '#70e000', '#9d4edd', '#ff5400'];
    return Array.from({ length: bulbCount }).map((_, i) => {
      const frac = i / (bulbCount - 1);
      // Subtle sagging catenary curve
      const sag = Math.sin(frac * Math.PI) * 0.45;
      const x = startPos[0] + (endPos[0] - startPos[0]) * frac;
      const y = startPos[1] + (endPos[1] - startPos[1]) * frac - sag;
      const z = startPos[2] + (endPos[2] - startPos[2]) * frac;
      return {
        pos: [x, y, z] as [number, number, number],
        color: colors[i % colors.length],
      };
    });
  }, [startPos, endPos, bulbCount]);

  return (
    <group>
      {bulbs.map((b, idx) => (
        <group key={idx} position={b.pos}>
          {/* Glowing LED Bulb */}
          <mesh>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color={b.color} />
          </mesh>
          {/* Subtle Point Light for night glow */}
          {idx % 3 === 0 && <pointLight color={b.color} intensity={0.8} distance={2.2} />}
        </group>
      ))}
    </group>
  );
};

// 2. Sacred Saffron / Bhagwa Flag (महावीर झंडा व सूर्य ध्वज on Bamboo Pole)
export const SaffronFlagPole: React.FC<{
  position: [number, number, number];
  height?: number;
}> = ({ position, height = 7 }) => {
  const flagRef = useRef<THREE.Mesh>(null);
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  useFrame((state) => {
    if (flagRef.current) {
      // Wind flutter animation
      flagRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 4) * 0.25;
      flagRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Tall Bamboo Pole */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.06, 0.08, height, 8]} />
        <meshToonMaterial color="#c2a649" gradientMap={toonGradient} />
      </mesh>

      {/* Triangular Fluttering Saffron Flag */}
      <mesh
        ref={flagRef}
        position={[0.75, height - 0.7, 0]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <coneGeometry args={[0.65, 1.5, 3]} />
        <meshToonMaterial color="#ff5400" side={THREE.DoubleSide} gradientMap={toonGradient} />
      </mesh>
    </group>
  );
};

// 3. Traditional Marigold Flower Garland (गेंदे के फूल की लड़ियां)
export const MarigoldString: React.FC<{
  startPos: [number, number, number];
  endPos: [number, number, number];
  flowerCount?: number;
}> = ({ startPos, endPos, flowerCount = 12 }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  const flowers = useMemo(() => {
    return Array.from({ length: flowerCount }).map((_, i) => {
      const frac = i / (flowerCount - 1);
      const sag = Math.sin(frac * Math.PI) * 0.35;
      const x = startPos[0] + (endPos[0] - startPos[0]) * frac;
      const y = startPos[1] + (endPos[1] - startPos[1]) * frac - sag;
      const z = startPos[2] + (endPos[2] - startPos[2]) * frac;
      return {
        pos: [x, y, z] as [number, number, number],
        isOrange: i % 2 === 0,
      };
    });
  }, [startPos, endPos, flowerCount]);

  return (
    <group>
      {flowers.map((f, idx) => (
        <mesh key={idx} position={f.pos}>
          <sphereGeometry args={[0.09, 6, 6]} />
          <meshToonMaterial
            color={f.isOrange ? '#ff7b00' : '#ffd000'}
            gradientMap={toonGradient}
          />
        </mesh>
      ))}
    </group>
  );
};

// 4. Family Puja Spot (छठ पूजा बेदी / पारिवारिक चौक) with Sugarcanes, Cloth & Diyas
export const FamilyPujaVedi: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position, rotation = [0, 0, 0] }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Red Ritual Carpet / Cotton Cloth on step */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshToonMaterial color="#b7094c" gradientMap={toonGradient} />
      </mesh>

      {/* Aripan White Rice-Paste Ring on the cloth */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>

      {/* 4 Sugarcane Stalks tied over the spot */}
      {[
        [-0.6, -0.6, 0.18, -0.18],
        [0.6, -0.6, -0.18, -0.18],
        [0.6, 0.6, -0.18, 0.18],
        [-0.6, 0.6, 0.18, 0.18],
      ].map(([x, z, rZ, rX], idx) => (
        <mesh key={idx} position={[x, 1.4, z]} rotation={[rX, 0, rZ]}>
          <cylinderGeometry args={[0.04, 0.055, 3.0, 6]} />
          <meshToonMaterial color="#5c0099" gradientMap={toonGradient} />
        </mesh>
      ))}

      {/* Terracotta Kalash with Mango Leaves & Diya */}
      <group position={[0, 0.25, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshToonMaterial color="#963f24" gradientMap={toonGradient} />
        </mesh>
        {/* Burning Ghee Diya on top */}
        <pointLight position={[0, 0.35, 0]} color="#ff9e00" intensity={1.8} distance={3} />
        <mesh position={[0, 0.32, 0]}>
          <coneGeometry args={[0.04, 0.1, 6]} />
          <meshBasicMaterial color="#ffee32" />
        </mesh>
      </group>

      {/* Border of 6 burning clay diyas */}
      {[
        [-0.8, 0, -0.8],
        [0.8, 0, -0.8],
        [-0.8, 0, 0.8],
        [0.8, 0, 0.8],
        [0, 0, -0.9],
        [0, 0, 0.9],
      ].map((dPos, dIdx) => (
        <group key={dIdx} position={dPos as [number, number, number]}>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.07, 0.04, 0.05, 8]} />
            <meshToonMaterial color="#78290f" gradientMap={toonGradient} />
          </mesh>
          <pointLight position={[0, 0.1, 0]} color="#ffba08" intensity={1.2} distance={2} />
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.025, 0.08, 6]} />
            <meshBasicMaterial color="#ffee32" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 5. Chhath Seva Camp Shamiana (छठ सेवा शिविर / टेंट पंडाल)
export const ChhathSevaCamp: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position, rotation = [0, 0, 0] }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  return (
    <group position={position} rotation={rotation}>
      {/* 4 Bamboo corner support poles */}
      {[
        [-3.5, -2.5],
        [3.5, -2.5],
        [-3.5, 2.5],
        [3.5, 2.5],
      ].map(([x, z], idx) => (
        <mesh key={idx} position={[x, 2.2, z]}>
          <cylinderGeometry args={[0.08, 0.1, 4.4, 8]} />
          <meshToonMaterial color="#d4b483" gradientMap={toonGradient} />
        </mesh>
      ))}

      {/* Red & Yellow Striped Shamiana Roof */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[8, 0.1, 6]} />
        <meshToonMaterial color="#f77f00" gradientMap={toonGradient} />
      </mesh>
      <mesh position={[0, 4.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[4.8, 1.2, 4]} />
        <meshToonMaterial color="#d90429" gradientMap={toonGradient} />
      </mesh>

      {/* White banner: "छठ पूजा सेवा शिविर (निःशुल्क सेवा)" */}
      <mesh position={[0, 3.8, 2.9]}>
        <boxGeometry args={[7, 0.9, 0.05]} />
        <meshToonMaterial color="#ffffff" gradientMap={toonGradient} />
      </mesh>

      {/* Warm Tube Light hanging inside the camp */}
      <pointLight position={[0, 4.0, 0]} color="#fff3b0" intensity={2.5} distance={9} />
    </group>
  );
};

// 6. Dense Floating River Diyas Collection (30+ Glowing Bobbing Lamps on Ganges)
export const RiverFloatingDiyasField: React.FC<{ riverZ: number }> = ({ riverZ }) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);
  const groupRef = useRef<THREE.Group>(null);

  // Generate 28 authentic bobbing lamps across the river surface
  const diyaPositions = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: -25 + (i % 7) * 8 + (Math.random() - 0.5) * 3,
      z: riverZ + 8 + Math.floor(i / 7) * 7 + (Math.random() - 0.5) * 4,
      phase: Math.random() * Math.PI * 2,
      isDoubleFlower: i % 3 === 0,
    }));
  }, [riverZ]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, idx) => {
        const item = diyaPositions[idx];
        if (item) {
          // Bobbing in gentle river waves
          child.position.y = 0.04 + Math.sin(state.clock.elapsedTime * 1.8 + item.phase) * 0.035;
          child.position.x += Math.sin(state.clock.elapsedTime * 0.6 + item.phase) * 0.0015;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {diyaPositions.map((d) => (
        <group key={d.id} position={[d.x, 0.04, d.z]}>
          {/* Marigold Garland Ring (Genda Phool) */}
          <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.07, 6, 12]} />
            <meshToonMaterial
              color={d.isDoubleFlower ? '#ff5400' : '#ffd000'}
              gradientMap={toonGradient}
            />
          </mesh>
          {/* Earthen leaf dona */}
          <mesh position={[0, 0.035, 0]}>
            <cylinderGeometry args={[0.13, 0.07, 0.05, 8]} />
            <meshToonMaterial color="#2d6a4f" gradientMap={toonGradient} />
          </mesh>
          {/* Terracotta clay diya */}
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.08, 0.04, 0.05, 8]} />
            <meshToonMaterial color="#78290f" gradientMap={toonGradient} />
          </mesh>
          {/* Real point light flame with warm orange glow */}
          <pointLight color="#ffba08" intensity={1.8} distance={3.2} />
          <mesh position={[0, 0.13, 0]}>
            <coneGeometry args={[0.035, 0.1, 6]} />
            <meshBasicMaterial color="#ffee32" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
