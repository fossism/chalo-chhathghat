import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';

interface WanderingDevotee {
  id: number;
  initialPos: [number, number, number];
  targetX: number;
  targetZ: number;
  speed: number;
  dressColor: string;
  type: 'strolling_man' | 'strolling_woman' | 'chai_vendor' | 'photo_youth';
  phase: number;
}

export const SeatedAndWanderingDevotees: React.FC = () => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  // ============================================================================
  // 1. SEATED DEVOTEES DATA (Sitting cross-legged on carpets & steps)
  // ============================================================================
  // Group A: Bhajan singing circle around Family Bedi (X: -14, Z: 252)
  const bhajanWomen = useMemo(
    () => [
      { id: 1, pos: [-14.8, 0.28, 251.2] as [number, number, number], rotY: 0.8, color: '#f77f00' },
      { id: 2, pos: [-13.2, 0.28, 251.2] as [number, number, number], rotY: -0.8, color: '#d90429' },
      { id: 3, pos: [-14.0, 0.28, 252.8] as [number, number, number], rotY: Math.PI, color: '#b7094c' },
      { id: 4, pos: [-14.0, 0.28, 249.8] as [number, number, number], rotY: 0, color: '#ffb703' },
    ],
    []
  );

  // Group B: Elders sipping chai on woollen rug (X: 14, Z: 252)
  const eldersSeated = useMemo(
    () => [
      { id: 1, pos: [13.2, 0.28, 251.2] as [number, number, number], rotY: 0.7, shawl: '#6c757d' },
      { id: 2, pos: [14.8, 0.28, 251.2] as [number, number, number], rotY: -0.7, shawl: '#495057' },
      { id: 3, pos: [14.0, 0.28, 252.8] as [number, number, number], rotY: Math.PI, shawl: '#adb5bd' },
      { id: 4, pos: [14.0, 0.28, 249.8] as [number, number, number], rotY: 0, shawl: '#343a40' },
    ],
    []
  );

  // Group C: Cousins & kids seated on steps guarding Dauras (Steps Z: 244-248)
  const cousinsGuarding = useMemo(
    () => [
      { id: 1, pos: [-24, 0.45, 243] as [number, number, number], rotY: 0.2, color: '#ff0054' },
      { id: 2, pos: [-22.5, 0.45, 243] as [number, number, number], rotY: -0.3, color: '#00f5d4' },
      { id: 3, pos: [22.5, 0.45, 243] as [number, number, number], rotY: 0.3, color: '#ffd166' },
      { id: 4, pos: [24, 0.45, 243] as [number, number, number], rotY: -0.2, color: '#ff7b00' },
      { id: 5, pos: [-3, 0.28, 247] as [number, number, number], rotY: 0.1, color: '#3a86ff' },
      { id: 6, pos: [3, 0.28, 247] as [number, number, number], rotY: -0.1, color: '#e76f51' },
    ],
    []
  );

  // Group D: Vratis resting in prayer near water edge before Arghya (Z: 268)
  const vratisSeatedPrayer = useMemo(
    () => [
      { id: 1, pos: [-10, -0.32, 267] as [number, number, number], rotY: 0.1, color: '#f77f00' },
      { id: 2, pos: [10, -0.32, 267] as [number, number, number], rotY: -0.1, color: '#ffb703' },
    ],
    []
  );

  // ============================================================================
  // 2. WANDERING DEVOTEES (Dynamic roaming pedestrians on ghat promenade)
  // ============================================================================
  const wanderingData = useMemo<WanderingDevotee[]>(() => {
    const list: WanderingDevotee[] = [];
    const colors = ['#f8f9fa', '#ffb703', '#d90429', '#f77f00', '#06d6a0', '#3a86ff'];

    for (let i = 0; i < 18; i++) {
      const stepIdx = (i % 5) + 1;
      const initialZ = 243 + stepIdx * 4.0;
      const initialY = -0.18 * stepIdx;
      const initialX = -25 + (i * 3.2);

      let type: WanderingDevotee['type'] = 'strolling_man';
      if (i === 4) type = 'chai_vendor'; // Mobile Chai Wallah
      else if (i % 3 === 0) type = 'strolling_woman';
      else if (i % 4 === 0) type = 'photo_youth';

      list.push({
        id: i + 1,
        initialPos: [initialX, initialY, initialZ],
        targetX: initialX + (i % 2 === 0 ? 8 : -8),
        targetZ: initialZ,
        speed: 0.25 + (i % 3) * 0.1,
        dressColor: colors[i % colors.length],
        type,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return list;
  }, []);

  const wanderRefs = useRef<{ [key: number]: THREE.Group | null }>({});

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    wanderingData.forEach((w) => {
      const grp = wanderRefs.current[w.id];
      if (!grp) return;

      // Pacing back and forth laterally across the ghat steps
      const progress = Math.sin(elapsed * w.speed * 0.4 + w.phase);
      const currentX = w.initialPos[0] + progress * 6.5;

      grp.position.x = currentX;

      // Turn around based on walking direction
      const dirX = Math.cos(elapsed * w.speed * 0.4 + w.phase);
      grp.rotation.y = dirX >= 0 ? Math.PI / 2 : -Math.PI / 2;

      // Stride bobbing
      const bob = Math.abs(Math.sin(elapsed * 5 * w.speed + w.phase)) * 0.04;
      grp.position.y = w.initialPos[1] + bob;
    });
  });

  return (
    <group>
      {/* ====================================================================== */}
      {/* 1. SEATED DEVOTEES GROUPS */}
      {/* ====================================================================== */}
      {/* Group A: Women's Bhajan Mandali on Red Jute Carpet */}
      <group position={[-14, 0.22, 251.2]}>
        {/* Colorful Dhurrie / Carpet */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshToonMaterial color="#b7094c" gradientMap={toonGradient} />
        </mesh>
        {/* Central Brass Thali with offerings & diya */}
        <group position={[0, 0.08, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.25, 0.04, 12]} />
            <meshToonMaterial color="#ffd166" gradientMap={toonGradient} />
          </mesh>
          <pointLight position={[0, 0.15, 0]} color="#ffaa00" intensity={1.5} distance={2.5} />
        </group>
      </group>

      {bhajanWomen.map((w) => (
        <group key={w.id} position={w.pos} rotation={[0, w.rotY, 0]} scale={0.88}>
          {/* Folded Cross-Legs on Ground */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.42, 0.45, 0.28, 8]} />
            <meshToonMaterial color={w.color} gradientMap={toonGradient} />
          </mesh>
          {/* Seated Torso in Saree */}
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.22, 0.32, 0.6, 8]} />
            <meshToonMaterial color={w.color} gradientMap={toonGradient} />
          </mesh>
          {/* Saree Ghoonghat covering head */}
          <mesh position={[0, 1.05, -0.04]}>
            <sphereGeometry args={[0.26, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
            <meshToonMaterial color="#c1121f" gradientMap={toonGradient} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 1.0, 0.04]}>
            <sphereGeometry args={[0.17, 8, 8]} />
            <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
          </mesh>
          {/* Matiya Sindoor on forehead */}
          <mesh position={[0, 1.04, 0.2]} rotation={[0.18, 0, 0]}>
            <boxGeometry args={[0.035, 0.22, 0.02]} />
            <meshBasicMaterial color="#ff5400" />
          </mesh>
        </group>
      ))}

      {/* Group B: Elders Sipping Chai on Woollen Blanket */}
      <group position={[14, 0.22, 251.2]}>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshToonMaterial color="#343a40" gradientMap={toonGradient} />
        </mesh>
      </group>

      {eldersSeated.map((e) => (
        <group key={e.id} position={e.pos} rotation={[0, e.rotY, 0]} scale={0.92}>
          {/* Folded Legs */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.42, 0.45, 0.28, 8]} />
            <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
          </mesh>
          {/* Torso with draped Shawl */}
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.24, 0.32, 0.62, 8]} />
            <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
          </mesh>
          <mesh position={[0, 0.62, 0.02]}>
            <boxGeometry args={[0.52, 0.45, 0.3]} />
            <meshToonMaterial color={e.shawl} gradientMap={toonGradient} />
          </mesh>
          {/* Head with grey hair */}
          <mesh position={[0, 1.05, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
          </mesh>
          <mesh position={[0, 1.15, -0.02]}>
            <sphereGeometry args={[0.19, 8, 8]} />
            <meshToonMaterial color="#e9ecef" gradientMap={toonGradient} />
          </mesh>
          {/* Terracotta Chai Kulhad in Hand */}
          <group position={[0.2, 0.5, 0.24]}>
            <mesh>
              <cylinderGeometry args={[0.045, 0.03, 0.08, 6]} />
              <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Group C: Cousins Seated on Step Edges Guarding Dauras */}
      {cousinsGuarding.map((c) => (
        <group key={c.id} position={c.pos} rotation={[0, c.rotY, 0]} scale={0.8}>
          {/* Seated on Step with Feet Dangling */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.42, 0.35, 0.42]} />
            <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
          </mesh>
          {/* Legs hanging over step edge */}
          <mesh position={[0, -0.1, 0.24]}>
            <boxGeometry args={[0.3, 0.35, 0.16]} />
            <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
          </mesh>
          {/* Torso in colorful kurta */}
          <mesh position={[0, 0.62, 0]}>
            <cylinderGeometry args={[0.2, 0.26, 0.55, 8]} />
            <meshToonMaterial color={c.color} gradientMap={toonGradient} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 1.08, 0]}>
            <sphereGeometry args={[0.17, 8, 8]} />
            <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
          </mesh>
          {/* Bamboo Daura resting beside them on the step */}
          <group position={[0.55, 0.2, 0]}>
            <mesh>
              <cylinderGeometry args={[0.38, 0.25, 0.22, 10]} />
              <meshToonMaterial color="#d4a373" gradientMap={toonGradient} />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <sphereGeometry args={[0.36, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
              <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
            </mesh>
            <pointLight position={[0, 0.25, 0]} color="#ffb703" intensity={0.9} distance={1.8} />
          </group>
        </group>
      ))}

      {/* Group D: Vratis Seated in Deep Dhyana before Arghya */}
      {vratisSeatedPrayer.map((v) => (
        <group key={v.id} position={v.pos} rotation={[0, v.rotY, 0]} scale={0.92}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.45, 0.48, 0.28, 8]} />
            <meshToonMaterial color={v.color} gradientMap={toonGradient} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.22, 0.32, 0.65, 8]} />
            <meshToonMaterial color={v.color} gradientMap={toonGradient} />
          </mesh>
          <mesh position={[0, 1.1, -0.04]}>
            <sphereGeometry args={[0.27, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
            <meshToonMaterial color="#c1121f" gradientMap={toonGradient} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 1.05, 0.04]}>
            <sphereGeometry args={[0.17, 8, 8]} />
            <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
          </mesh>
          <mesh position={[0, 1.1, 0.2]} rotation={[0.18, 0, 0]}>
            <boxGeometry args={[0.038, 0.24, 0.02]} />
            <meshBasicMaterial color="#ff5400" />
          </mesh>
          {/* Folded Hands in Dhyana */}
          <mesh position={[0, 0.45, 0.26]}>
            <boxGeometry args={[0.18, 0.15, 0.12]} />
            <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
          </mesh>
        </group>
      ))}

      {/* ====================================================================== */}
      {/* 2. DYNAMIC WANDERING DEVOTEES ROAMING THE GHAT */}
      {/* ====================================================================== */}
      {wanderingData.map((w) => (
        <group
          key={w.id}
          ref={(el) => (wanderRefs.current[w.id] = el)}
          position={w.initialPos}
          scale={0.95}
        >
          {/* Character Body */}
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 1.25, 8]} />
            <meshToonMaterial color={w.dressColor} gradientMap={toonGradient} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 1.68, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
          </mesh>

          {/* Special Props */}
          {w.type === 'chai_vendor' && (
            <group position={[0.26, 1.1, 0.2]}>
              {/* Brass Tea Kettle in hand */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.12, 0.15, 0.26, 8]} />
                <meshToonMaterial color="#ffd166" gradientMap={toonGradient} />
              </mesh>
              {/* Spout */}
              <mesh position={[0.12, 0.05, 0]} rotation={[0, 0, -0.6]}>
                <cylinderGeometry args={[0.02, 0.04, 0.15, 6]} />
                <meshToonMaterial color="#ffd166" gradientMap={toonGradient} />
              </mesh>
            </group>
          )}

          {w.type === 'photo_youth' && (
            <group position={[0, 1.45, 0.3]} rotation={[0.2, 0, 0]}>
              {/* Smartphone held up capturing sunset / sunrise */}
              <mesh>
                <boxGeometry args={[0.12, 0.2, 0.02]} />
                <meshBasicMaterial color="#111111" />
              </mesh>
              <mesh position={[0, 0, 0.015]}>
                <boxGeometry args={[0.1, 0.18, 0.01]} />
                <meshBasicMaterial color="#4cc9f0" />
              </mesh>
            </group>
          )}

          {w.type === 'strolling_woman' && (
            <mesh position={[0, 1.68, -0.04]}>
              <sphereGeometry args={[0.28, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
              <meshToonMaterial color="#d90429" gradientMap={toonGradient} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};