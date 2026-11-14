import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';

interface FamilyKafilaProps {
  playerPos: { x: number; y: number; z: number; rotY: number };
  isWalking: boolean;
  isInWater: boolean;
  isOffering: boolean;
}

interface FamilyMemberConfig {
  id: string;
  name: string;
  type: 'vrati_mother' | 'dada' | 'dadi' | 'kid_boy' | 'kid_girl' | 'brother_sugarcane' | 'dholak_player' | 'dhunuchi_brother' | 'bhabhi_kalash' | 'second_daura' | 'manjeera_sister' | 'cousin_fruit';
  offset: [number, number]; // [offsetX, offsetZ] relative to player
  dressColor: string;
  secondaryColor?: string;
  skinTone: 'wheatish' | 'bronze' | 'honey' | 'dusky';
  scale: number;
}

export const FamilyKafilaProcession: React.FC<FamilyKafilaProps> = ({
  playerPos,
  isWalking,
  isInWater,
  isOffering,
}) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);
  const sareeTex = useMemo(() => animeTexGen.getAnimeSareeTexture(), []);

  // 12 Authentic Family Members marching alongside lead player from 0m Home to 600m Ghat
  const members: FamilyMemberConfig[] = useMemo(
    () => [
      // 1. Mother / Vrati (छठी व्रती माँ) walking right beside her son holding the sacred soop
      {
        id: 'vrati_mother',
        name: 'छठी व्रती माँ',
        type: 'vrati_mother',
        offset: [-1.2, 0.4],
        dressColor: '#f77f00',
        secondaryColor: '#c1121f',
        skinTone: 'wheatish',
        scale: 0.96,
      },
      // 2. Chintu / Little Boy (छोटू) running excitedly with a small sugarcane stalk
      {
        id: 'kid_boy',
        name: 'छोटू (चिंटू)',
        type: 'kid_boy',
        offset: [1.15, 0.6],
        dressColor: '#ffb703',
        secondaryColor: '#00f5d4',
        skinTone: 'honey',
        scale: 0.62,
      },
      // 3. Munni / Little Girl (मुन्नी) in ghaghra-choli with a brass flower thali
      {
        id: 'kid_girl',
        name: 'मुन्नी (गुड़िया)',
        type: 'kid_girl',
        offset: [-1.05, -1.1],
        dressColor: '#ff0054',
        secondaryColor: '#ffbe0b',
        skinTone: 'honey',
        scale: 0.58,
      },
      // 4. Brother with tall 5-Sugarcane Bundle over shoulder (पाँच ईंख का गट्ठर)
      {
        id: 'brother_sugarcane',
        name: 'ईंख उठाए भाई',
        type: 'brother_sugarcane',
        offset: [1.35, -0.9],
        dressColor: '#f8f9fa',
        secondaryColor: '#f77f00',
        skinTone: 'bronze',
        scale: 1.02,
      },
      // 5. Dholak Player Cousin (ढोलक बजाता भाई)
      {
        id: 'dholak_player',
        name: 'ढोलक वादक भाई',
        type: 'dholak_player',
        offset: [-1.55, -2.0],
        dressColor: '#f8f9fa',
        secondaryColor: '#e76f51',
        skinTone: 'bronze',
        scale: 1.0,
      },
      // 6. Dhunuchi carrier with fragrant smoking dhoop (धूप-धुंआ लिए भाई)
      {
        id: 'dhunuchi_brother',
        name: 'धूप पात्र लिए भाई',
        type: 'dhunuchi_brother',
        offset: [1.45, -2.1],
        dressColor: '#f8f9fa',
        secondaryColor: '#fcbf49',
        skinTone: 'bronze',
        scale: 1.0,
      },
      // 7. Dadi Ji (दादी जी) in cotton saree singing "काँच ही बाँस के बहँगिया"
      {
        id: 'dadi',
        name: 'दादी जी',
        type: 'dadi',
        offset: [-0.65, -2.7],
        dressColor: '#e9ecef',
        secondaryColor: '#c1121f',
        skinTone: 'wheatish',
        scale: 0.88,
      },
      // 8. Dada Ji (दादा जी) in white dhoti-kurta, woollen shawl & walking stick
      {
        id: 'dada',
        name: 'दादा जी',
        type: 'dada',
        offset: [0.65, -2.8],
        dressColor: '#f8f9fa',
        secondaryColor: '#6c757d',
        skinTone: 'bronze',
        scale: 0.94,
      },
      // 9. Bhabhi carrying brass Gangajal Kalash (गंगाजल कलश लिए भाभी)
      {
        id: 'bhabhi_kalash',
        name: 'कलश लिए भाभी',
        type: 'bhabhi_kalash',
        offset: [-1.75, -3.4],
        dressColor: '#d90429',
        secondaryColor: '#ffd000',
        skinTone: 'wheatish',
        scale: 0.93,
      },
      // 10. Second Daura Bearer carrying fruit basket (दूसरा दउरा उठवइया)
      {
        id: 'second_daura',
        name: 'दूसरा दउरा उठाए भाई',
        type: 'second_daura',
        offset: [0.0, -3.9],
        dressColor: '#f8f9fa',
        secondaryColor: '#f77f00',
        skinTone: 'bronze',
        scale: 1.02,
      },
      // 11. Cousin carrying Thekua tray (ठेकुआ थाल लिए भाई)
      {
        id: 'cousin_fruit',
        name: 'प्रसाद थाल लिए चाचा',
        type: 'cousin_fruit',
        offset: [1.6, -3.6],
        dressColor: '#f8f9fa',
        secondaryColor: '#fcbf49',
        skinTone: 'bronze',
        scale: 0.98,
      },
      // 12. Sister clashing brass Manjeera cymbals (झांझ बजाती बहन)
      {
        id: 'manjeera_sister',
        name: 'झांझ बजाती बहन',
        type: 'manjeera_sister',
        offset: [-1.15, -4.6],
        dressColor: '#9e0059',
        secondaryColor: '#ffb703',
        skinTone: 'wheatish',
        scale: 0.92,
      },
    ],
    []
  );

  // Group references for position tracking and smooth interpolation
  const groupRefs = useRef<{ [key: string]: THREE.Group | null }>({});

  useFrame((state) => {
    const t = state.clock.elapsedTime * 8;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);

    members.forEach((m) => {
      const grp = groupRefs.current[m.id];
      if (!grp) return;

      // Calculate target world position based on player position and heading
      const rad = playerPos.rotY;
      const cosR = Math.cos(rad);
      const sinR = Math.sin(rad);

      // Rotate offset by player's orientation
      const worldOffsetX = m.offset[0] * cosR + m.offset[1] * sinR;
      const worldOffsetZ = -m.offset[0] * sinR + m.offset[1] * cosR;

      const targetX = playerPos.x + worldOffsetX;
      const targetZ = playerPos.z + worldOffsetZ;
      const targetY = playerPos.y;

      // Smoothly interpolate towards formation position
      grp.position.x = THREE.MathUtils.lerp(grp.position.x, targetX, 0.12);
      grp.position.z = THREE.MathUtils.lerp(grp.position.z, targetZ, 0.12);
      grp.position.y = THREE.MathUtils.lerp(grp.position.y, targetY, 0.15);

      // Align rotation with player heading
      grp.rotation.y = THREE.MathUtils.lerp(grp.rotation.y, playerPos.rotY, 0.1);

      // Walking bounce & body bob
      if (isWalking) {
        // High energetic bounce for kids, natural step bounce for adults
        const bounce = m.type.startsWith('kid') ? Math.abs(sinT * 1.3) * 0.08 : Math.abs(sinT) * 0.04;
        grp.position.y = targetY + bounce;
        grp.rotation.z = (m.id.charCodeAt(0) % 2 === 0 ? sinT : cosT) * 0.03;
      } else {
        // Gentle breathing idle
        grp.position.y = targetY + Math.sin(state.clock.elapsedTime * 2 + m.id.length) * 0.015;
        grp.rotation.z = 0;
      }
    });
  });

  return (
    <group>
      {members.map((m) => (
        <group
          key={m.id}
          ref={(el) => (groupRefs.current[m.id] = el)}
          position={[playerPos.x + m.offset[0], playerPos.y, playerPos.z + m.offset[1]]}
          scale={m.scale}
        >
          {/* ============================================================== */}
          {/* A. VRATI MOTHER (छठी व्रती माँ carrying Woven Soop with lit Diya) */}
          {/* ============================================================== */}
          {m.type === 'vrati_mother' && (
            <group>
              {/* Saree Pleated Skirt */}
              <mesh position={[0, 0.85, 0]} castShadow>
                <cylinderGeometry args={[0.22, 0.42, 1.45, 12]} />
                <meshToonMaterial map={sareeTex} gradientMap={toonGradient} />
              </mesh>
              {/* Fitted Blouse & Diagonal Pallu */}
              <mesh position={[0, 1.25, 0]}>
                <cylinderGeometry args={[0.2, 0.22, 0.4, 10]} />
                <meshToonMaterial color="#b7094c" gradientMap={toonGradient} />
              </mesh>
              {/* Head & Ghoonghat */}
              <mesh position={[0, 1.76, 0.02]}>
                <sphereGeometry args={[0.16, 12, 12]} />
                <meshToonMaterial color="#b57a46" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.84, -0.04]}>
                <sphereGeometry args={[0.27, 14, 14, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
                <meshToonMaterial color="#c1121f" gradientMap={toonGradient} side={THREE.DoubleSide} />
              </mesh>
              {/* Gold border on Ghoonghat */}
              <mesh position={[0, 1.84, 0.05]} rotation={[0.25, 0, 0]}>
                <torusGeometry args={[0.26, 0.016, 6, 16, Math.PI]} />
                <meshToonMaterial color="#ffd700" gradientMap={toonGradient} />
              </mesh>
              {/* Orange Matiya Sindoor from nose to hairline */}
              <mesh position={[0, 1.76, 0.16]} rotation={[0.18, 0, 0]}>
                <boxGeometry args={[0.026, 0.18, 0.012]} />
                <meshBasicMaterial color="#ff5400" />
              </mesh>
              {/* Woven Bamboo Soop held reverently */}
              <group position={[0, 1.35, 0.38]}>
                <mesh rotation={[0.2, 0, 0]}>
                  <boxGeometry args={[0.62, 0.035, 0.7]} />
                  <meshToonMaterial color="#d4a373" gradientMap={toonGradient} />
                </mesh>
                {/* Whole Coconut */}
                <mesh position={[-0.14, 0.09, 0.04]}>
                  <sphereGeometry args={[0.09, 8, 8]} />
                  <meshToonMaterial color="#583101" gradientMap={toonGradient} />
                </mesh>
                {/* Green Bananas */}
                <mesh position={[0.12, 0.06, 0.06]} rotation={[0.3, 0, 0]}>
                  <capsuleGeometry args={[0.028, 0.18, 6, 6]} />
                  <meshToonMaterial color="#70e000" gradientMap={toonGradient} />
                </mesh>
                {/* Lit Ghee Diya on Soop */}
                <group position={[0.1, 0.06, -0.1]}>
                  <mesh>
                    <cylinderGeometry args={[0.05, 0.028, 0.03, 8]} />
                    <meshToonMaterial color="#78290f" gradientMap={toonGradient} />
                  </mesh>
                  <pointLight position={[0, 0.1, 0]} color="#ffb703" intensity={2.0} distance={2.8} />
                  <mesh position={[0, 0.07, 0]}>
                    <coneGeometry args={[0.022, 0.06, 6]} />
                    <meshBasicMaterial color="#ffee32" />
                  </mesh>
                </group>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* B. LITTLE BOY (छोटू with yellow kurta & miniature sugarcane) */}
          {/* ============================================================== */}
          {m.type === 'kid_boy' && (
            <group>
              <mesh position={[0, 0.7, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.22, 0.95, 8]} />
                <meshToonMaterial color={m.dressColor} gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.32, 0]}>
                <sphereGeometry args={[0.15, 10, 10]} />
                <meshToonMaterial color="#c98a53" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.4, -0.02]}>
                <sphereGeometry args={[0.16, 8, 8]} />
                <meshToonMaterial color="#1f1a24" gradientMap={toonGradient} />
              </mesh>
              {/* Small Sugarcane stalk held upright */}
              <group position={[0.22, 1.1, 0.15]} rotation={[-0.1, 0, 0.1]}>
                <mesh>
                  <cylinderGeometry args={[0.02, 0.025, 1.4, 6]} />
                  <meshToonMaterial color="#2d6a4f" gradientMap={toonGradient} />
                </mesh>
                <mesh position={[0, 0.72, 0]}>
                  <coneGeometry args={[0.12, 0.35, 4]} />
                  <meshToonMaterial color="#70e000" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* C. LITTLE GIRL (मुन्नी in ghaghra-choli with flower thali) */}
          {/* ============================================================== */}
          {m.type === 'kid_girl' && (
            <group>
              {/* Flared Ghaghra Skirt */}
              <mesh position={[0, 0.65, 0]}>
                <coneGeometry args={[0.34, 0.9, 10]} />
                <meshToonMaterial color={m.dressColor} gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.25, 0]}>
                <sphereGeometry args={[0.14, 10, 10]} />
                <meshToonMaterial color="#c98a53" gradientMap={toonGradient} />
              </mesh>
              {/* Braided Hair */}
              <mesh position={[0, 1.32, -0.03]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshToonMaterial color="#1f1a24" gradientMap={toonGradient} />
              </mesh>
              {/* Brass Flower Plate */}
              <group position={[0, 1.05, 0.2]}>
                <mesh>
                  <cylinderGeometry args={[0.16, 0.14, 0.03, 10]} />
                  <meshToonMaterial color="#ffd700" gradientMap={toonGradient} />
                </mesh>
                <mesh position={[0, 0.03, 0]}>
                  <sphereGeometry args={[0.07, 6, 6]} />
                  <meshBasicMaterial color="#ff6000" />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* D. BROTHER WITH 5-SUGARCANE BUNDLE (ईंख का गट्ठर) */}
          {/* ============================================================== */}
          {m.type === 'brother_sugarcane' && (
            <group>
              {/* White Kurta Body */}
              <mesh position={[0, 0.95, 0]} castShadow>
                <cylinderGeometry args={[0.22, 0.26, 1.3, 10]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
              </mesh>
              {/* Head & Hair */}
              <mesh position={[0, 1.74, 0]}>
                <sphereGeometry args={[0.16, 10, 10]} />
                <meshToonMaterial color="#a06334" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.82, -0.02]}>
                <sphereGeometry args={[0.17, 8, 8]} />
                <meshToonMaterial color="#1f1a24" gradientMap={toonGradient} />
              </mesh>
              {/* Tall 5-Sugarcane Bundle over Right Shoulder */}
              <group position={[0.28, 1.8, -0.1]} rotation={[0.25, 0, -0.15]}>
                {[-0.07, 0, 0.07, -0.04, 0.04].map((sx, sIdx) => (
                  <mesh key={sIdx} position={[sx, 0, (sIdx % 2) * 0.06]}>
                    <cylinderGeometry args={[0.03, 0.035, 2.7, 6]} />
                    <meshToonMaterial color={sIdx % 2 === 0 ? '#5c0099' : '#2d6a4f'} gradientMap={toonGradient} />
                  </mesh>
                ))}
                {/* Red Mauli tying bundle */}
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.1, 0.1, 0.08, 8]} />
                  <meshToonMaterial color="#d90429" />
                </mesh>
                {/* Leafy Green Tops */}
                <mesh position={[0, 1.45, 0]}>
                  <coneGeometry args={[0.28, 0.65, 6]} />
                  <meshToonMaterial color="#70e000" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* E. DHOLAK PLAYER COUSIN (पारंपरिक ढोलक वादक) */}
          {/* ============================================================== */}
          {m.type === 'dholak_player' && (
            <group>
              <mesh position={[0, 0.95, 0]} castShadow>
                <cylinderGeometry args={[0.22, 0.26, 1.3, 10]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.72, 0]}>
                <sphereGeometry args={[0.16, 10, 10]} />
                <meshToonMaterial color="#a06334" gradientMap={toonGradient} />
              </mesh>
              {/* Saffron Gamchha on shoulder */}
              <mesh position={[0.08, 1.15, 0.05]} rotation={[0.1, 0, 0.2]}>
                <boxGeometry args={[0.12, 0.5, 0.14]} />
                <meshToonMaterial color="#e76f51" gradientMap={toonGradient} />
              </mesh>
              {/* Traditional 2-Tone Wooden Dholak slung across chest */}
              <group position={[0, 1.1, 0.28]} rotation={[0, 0, 0.35]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.15, 0.19, 0.58, 12]} />
                  <meshToonMaterial color="#7f4f24" gradientMap={toonGradient} />
                </mesh>
                {/* Bass Skin */}
                <mesh position={[-0.29, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <circleGeometry args={[0.15, 12]} />
                  <meshToonMaterial color="#f8f9fa" />
                </mesh>
                {/* Treble Skin */}
                <mesh position={[0.29, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                  <circleGeometry args={[0.15, 12]} />
                  <meshToonMaterial color="#e9ecef" />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* F. DHUNUCHI BROTHER (धूप-धुंआ लिए भाई with smoking incense) */}
          {/* ============================================================== */}
          {m.type === 'dhunuchi_brother' && (
            <group>
              <mesh position={[0, 0.95, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 1.3, 10]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.72, 0]}>
                <sphereGeometry args={[0.16, 10, 10]} />
                <meshToonMaterial color="#a06334" gradientMap={toonGradient} />
              </mesh>
              {/* Clay Dhunuchi with burning incense smoke */}
              <group position={[0, 1.25, 0.3]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.14, 0.06, 0.16, 10]} />
                  <meshToonMaterial color="#963f24" gradientMap={toonGradient} />
                </mesh>
                <mesh position={[0, -0.12, 0]}>
                  <cylinderGeometry args={[0.04, 0.06, 0.1, 8]} />
                  <meshToonMaterial color="#78290f" gradientMap={toonGradient} />
                </mesh>
                {/* Burning embers */}
                <pointLight position={[0, 0.1, 0]} color="#ff7b00" intensity={1.8} distance={2.5} />
                {/* Fragrant rising smoke sparkles */}
                <Sparkles count={18} position={[0, 0.25, 0]} scale={0.4} size={3} speed={0.4} color="#e9ecef" />
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* G. DADI JI (दादी जी singing Chhath geet) */}
          {/* ============================================================== */}
          {m.type === 'dadi' && (
            <group>
              <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.22, 0.36, 1.2, 10]} />
                <meshToonMaterial color="#dee2e6" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.58, -0.04]}>
                <sphereGeometry args={[0.25, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} side={THREE.DoubleSide} />
              </mesh>
              <mesh position={[0, 1.54, 0.02]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshToonMaterial color="#a86e3d" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.54, 0.16]} rotation={[0.18, 0, 0]}>
                <boxGeometry args={[0.026, 0.16, 0.01]} />
                <meshBasicMaterial color="#ff5400" />
              </mesh>
            </group>
          )}

          {/* ============================================================== */}
          {/* H. DADA JI (दादा जी with woollen shawl & walking stick) */}
          {/* ============================================================== */}
          {m.type === 'dada' && (
            <group>
              <mesh position={[0, 0.85, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 1.25, 10]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
              </mesh>
              {/* Warm Khadi Shawl */}
              <mesh position={[0, 1.18, 0.02]} castShadow>
                <boxGeometry args={[0.52, 0.42, 0.26]} />
                <meshToonMaterial color="#6c757d" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.68, 0]}>
                <sphereGeometry args={[0.16, 10, 10]} />
                <meshToonMaterial color="#8c582f" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.78, -0.02]}>
                <sphereGeometry args={[0.175, 10, 10]} />
                <meshToonMaterial color="#e9ecef" gradientMap={toonGradient} />
              </mesh>
              {/* Wooden Walking Stick (लाठी) */}
              <group position={[0.28, 0.7, 0.12]} rotation={[0.05, 0, -0.08]}>
                <mesh>
                  <cylinderGeometry args={[0.02, 0.022, 1.45, 6]} />
                  <meshToonMaterial color="#582f0e" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* I. BHABHI WITH BRASS KALASH (कलश लिए भाभी) */}
          {/* ============================================================== */}
          {m.type === 'bhabhi_kalash' && (
            <group>
              <mesh position={[0, 0.85, 0]}>
                <cylinderGeometry args={[0.2, 0.38, 1.3, 10]} />
                <meshToonMaterial color={m.dressColor} gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.62, -0.04]}>
                <sphereGeometry args={[0.26, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
                <meshToonMaterial color="#ffd000" gradientMap={toonGradient} side={THREE.DoubleSide} />
              </mesh>
              <mesh position={[0, 1.58, 0.04]}>
                <sphereGeometry args={[0.16, 10, 10]} />
                <meshToonMaterial color="#b57a46" gradientMap={toonGradient} />
              </mesh>
              {/* Polished Brass Kalash */}
              <group position={[0, 1.25, 0.24]}>
                <mesh>
                  <sphereGeometry args={[0.13, 10, 10]} />
                  <meshToonMaterial color="#ffd700" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* J. SECOND DAURA BEARER (दूसरा दउरा उठवइया) */}
          {/* ============================================================== */}
          {m.type === 'second_daura' && (
            <group>
              <mesh position={[0, 0.98, 0]}>
                <cylinderGeometry args={[0.24, 0.27, 1.3, 10]} />
                <meshToonMaterial color="#f8f9fa" gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.76, 0]}>
                <sphereGeometry args={[0.16, 10, 10]} />
                <meshToonMaterial color="#a06334" gradientMap={toonGradient} />
              </mesh>
              {/* Head Daura */}
              <group position={[0, 2.22, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.55, 0.35, 0.3, 12]} />
                  <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
                </mesh>
                <mesh position={[0, 0.15, 0]}>
                  <sphereGeometry args={[0.54, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                  <meshToonMaterial color="#ffb703" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}

          {/* ============================================================== */}
          {/* K. COUSIN & SISTER (प्रसाद थाल व झांझ) */}
          {/* ============================================================== */}
          {(m.type === 'cousin_fruit' || m.type === 'manjeera_sister') && (
            <group>
              <mesh position={[0, 0.85, 0]}>
                <cylinderGeometry args={[0.2, 0.35, 1.25, 10]} />
                <meshToonMaterial color={m.dressColor} gradientMap={toonGradient} />
              </mesh>
              <mesh position={[0, 1.62, 0]}>
                <sphereGeometry args={[0.16, 10, 10]} />
                <meshToonMaterial color="#b57a46" gradientMap={toonGradient} />
              </mesh>
              {/* Brass Manjeera or Tray */}
              <group position={[0, 1.25, 0.22]}>
                <mesh>
                  <cylinderGeometry args={[0.14, 0.12, 0.03, 8]} />
                  <meshToonMaterial color="#ffd700" gradientMap={toonGradient} />
                </mesh>
              </group>
            </group>
          )}
        </group>
      ))}
    </group>
  );
};
