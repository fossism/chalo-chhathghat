import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';

interface ProcessionPilgrim {
  id: number;
  initialX: number;
  initialZ: number;
  speed: number;
  type: 'vrati_woman' | 'daura_man' | 'kid_sparkler' | 'elder_shawl' | 'sugarcane_carrier';
  dressColor: string;
  secondaryColor?: string;
  skinTone: 'wheatish' | 'bronze' | 'honey' | 'dusky';
  scale: number;
  stridePhase: number;
}

export const Continuous600mProcession: React.FC = () => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  // Generate 45 continuous pilgrims distributed along the entire 600m route (Z: -280 to 260)
  const pilgrims = useMemo<ProcessionPilgrim[]>(() => {
    const list: ProcessionPilgrim[] = [];
    const colors = ['#f77f00', '#ffb703', '#e63946', '#d90429', '#f8f9fa', '#fcbf49'];

    for (let i = 0; i < 45; i++) {
      // Distribute evenly along the 540-meter path from Home (Z: -275) to Ghat (Z: 255)
      const zPos = -275 + (i / 45) * 530 + (Math.random() - 0.5) * 8;
      // Stagger laterally on left and right side of path
      const xPos = (i % 2 === 0 ? -1 : 1) * (1.2 + (i % 3) * 0.9) + (Math.random() - 0.5) * 0.8;

      const rand = Math.random();
      let type: ProcessionPilgrim['type'] = 'daura_man';
      let dressColor = '#f8f9fa';
      let scale = 1.0;
      let skinTone: ProcessionPilgrim['skinTone'] = 'bronze';

      if (rand < 0.28) {
        // Vrati woman holding soop
        type = 'vrati_woman';
        dressColor = colors[i % colors.length];
        skinTone = 'wheatish';
        scale = 0.95;
      } else if (rand < 0.55) {
        // Daura bearer carrying basket on head
        type = 'daura_man';
        dressColor = '#f8f9fa';
        skinTone = 'bronze';
        scale = 1.02;
      } else if (rand < 0.72) {
        // Excited kid skipping towards ghat
        type = 'kid_sparkler';
        dressColor = i % 2 === 0 ? '#ff0054' : '#00f5d4';
        skinTone = 'honey';
        scale = 0.64;
      } else if (rand < 0.88) {
        // Sugarcane bundle carrier
        type = 'sugarcane_carrier';
        dressColor = '#f8f9fa';
        skinTone = 'bronze';
        scale = 1.0;
      } else {
        // Elder with shawl walking to ghat
        type = 'elder_shawl';
        dressColor = '#e9ecef';
        skinTone = 'bronze';
        scale = 0.92;
      }

      list.push({
        id: i + 1,
        initialX: xPos,
        initialZ: zPos,
        speed: 0.08 + (i % 4) * 0.02 + Math.random() * 0.03, // Variable walking speeds
        type,
        dressColor,
        secondaryColor: '#f77f00',
        skinTone,
        scale,
        stridePhase: Math.random() * Math.PI * 2,
      });
    }

    return list;
  }, []);

  // References for live transform updates
  const pilgrimRefs = useRef<{ [key: number]: THREE.Group | null }>({});
  const zPositions = useRef<number[]>(pilgrims.map((p) => p.initialZ));

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    pilgrims.forEach((p, idx) => {
      const grp = pilgrimRefs.current[p.id];
      if (!grp) return;

      // Continuously advance forward towards Ghat (+Z direction)
      zPositions.current[idx] += p.speed * 0.45;

      // If pilgrim reaches Ghat entrance (Z > 265), wrap around back to Home (Z: -285)
      if (zPositions.current[idx] > 265) {
        zPositions.current[idx] = -285 + (Math.random() - 0.5) * 10;
      }

      grp.position.z = zPositions.current[idx];

      // Biomechanical walking stride & body bob
      const stride = Math.sin(elapsed * 7 * (p.speed / 0.1) + p.stridePhase);
      grp.position.y = Math.abs(stride) * 0.04;
      grp.rotation.z = stride * 0.025;
    });
  });

  return (
    <group>
      {pilgrims.map((p, idx) => (
        <group
          key={p.id}
          ref={(el) => (pilgrimRefs.current[p.id] = el)}
          position={[p.initialX, 0, p.initialZ]}
          rotation={[0, 0, 0]} // Facing towards Ghat (+Z)
          scale={p.scale}
        >
          {/* ============================================================== */}
          {/* 1. VRATI WOMAN (व्रती महिला marching with soop & sindoor) */}
          {/* ============================================================== */}
          {p.type === 'vrati_woman' && (
            <group>
              {/* Saree Pleated Skirt */}
              <mesh position={[0, 0.85, 0]}>
                <cylinderGeometry args={[0.2, 0.36, 1.3, 10]} />
                <meshToonMaterial color={p.dressColor} gradientMap={toonGradient} />
              </mesh>
              {/* Ghoonghat covering head */}
              <mesh position={[0, 1.68, -0.04]}>
                <sphereGeometry args={[0.26, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
                <meshToonMaterial color="#c1121f" gradientMap={toonGradient} side={THREE.DoubleSide} />
              </mesh>
              {/* Head inside */}
              <mesh position={[0, 1.62, 0.03]}>
                <sphereGeometry args={[0.16, 8, 8]} />
                <meshToonMaterial color="#b57a46" gradientMap={toonGradient} />
              </mesh>
              {/* Orange Matiya Sindoor */}
              <mesh position={[0, 1.62, 0.16]} rotation={[0.18, 0, 0]}>
                <boxGeometry args={[0.025, 0.18, 0.01]} />
                <meshBasicMaterial color="#ff5400" />
              </mesh>
              {/* Woven Soop held in hands */}
              <group position={[0, 1.25, 0.3]} rotation={[0.15, 0, 0]}>
                <mesh>
                  <boxGeometry args={[0.55, 0.03, 0.6]} />
                  <meshToonMaterial color="#d4a373" gradientMap={toonGradient} />
                </mesh>
                <mesh position={[0, 0.06, 0]}>
                  <sphereGeometry args={[0.08, 6, 6]} />
                  <meshToonMaterial color="#583101" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* 2. DAURA BEARER MAN (दउरा उठाए पुरुष carrying basket on head) */}
          {/* ============================================================== */}
          {p.type === 'daura_man' && (
            <group>
              <mesh position={[0, 0.95, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 1.3, 10]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
              </mesh>
              {/* Head & Hair */}
              <mesh position={[0, 1.74, 0]}>
                <sphereGeometry args={[0.16, 8, 8]} />
                <meshToonMaterial color="#a06334" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.82, -0.02]}>
                <sphereGeometry args={[0.17, 8, 8]} />
                <meshToonMaterial color="#1f1a24" gradientMap={toonGradient} />
              </mesh>
              {/* Arms raised up to head holding basket */}
              <mesh position={[-0.2, 1.7, 0]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.04, 0.045, 0.42, 6]} />
                <meshToonMaterial color="#a06334" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0.2, 1.7, 0]} rotation={[0, 0, 0.5]}>
                <cylinderGeometry args={[0.04, 0.045, 0.42, 6]} />
                <meshToonMaterial color="#a06334" gradientMap={toonGradient} />
              </mesh>
              {/* Bamboo Daura on Head */}
              <group position={[0, 2.2, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.55, 0.35, 0.3, 12]} />
                  <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
                </mesh>
                <mesh position={[0, 0.15, 0]}>
                  <sphereGeometry args={[0.54, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                  <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* 3. KID WITH SPARKLER / SUGARCANE (उत्साही बच्चा) */}
          {/* ============================================================== */}
          {p.type === 'kid_sparkler' && (
            <group>
              <mesh position={[0, 0.7, 0]}>
                <cylinderGeometry args={[0.18, 0.22, 0.95, 8]} />
                <meshToonMaterial color={p.dressColor} gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.32, 0]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshToonMaterial color="#c98a53" gradientMap={toonGradient} />
              </mesh>
              {/* Small Sugarcane stalk */}
              <group position={[0.2, 1.1, 0.15]} rotation={[-0.1, 0, 0.1]}>
                <mesh>
                  <cylinderGeometry args={[0.02, 0.025, 1.2, 4]} />
                  <meshToonMaterial color="#2d6a4f" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* 4. SUGARCANE BUNDLE CARRIER (ईंख उठाए भाई) */}
          {/* ============================================================== */}
          {p.type === 'sugarcane_carrier' && (
            <group>
              <mesh position={[0, 0.95, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 1.3, 10]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.74, 0]}>
                <sphereGeometry args={[0.16, 8, 8]} />
                <meshToonMaterial color="#a06334" gradientMap={toonGradient} />
              </mesh>
              {/* Tall Sugarcane bundle leaning over shoulder */}
              <group position={[0.24, 1.6, -0.05]} rotation={[0.2, 0, -0.15]}>
                {[-0.05, 0.05].map((sx, sIdx) => (
                  <mesh key={sIdx} position={[sx, 0, 0]}>
                    <cylinderGeometry args={[0.03, 0.035, 2.4, 6]} />
                    <meshToonMaterial color="#5c0099" gradientMap={toonGradient} />
                  </mesh>
                ))}
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* 5. ELDER WITH SHAWL (बुजुर्ग दादा/दादी) */}
          {p.type === 'elder_shawl' && (
            <group>
              <mesh position={[0, 0.85, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 1.25, 10]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.16, 0.02]}>
                <boxGeometry args={[0.5, 0.4, 0.24]} />
                <meshToonMaterial color="#6c757d" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.68, 0]}>
                <sphereGeometry args={[0.16, 8, 8]} />
                <meshToonMaterial color="#8c582f" gradientMap={toonGradient} />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
};
