import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sparkles, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ChhathDay, FloatingDiya, KafilaMember, VillagerNPC, CollectibleItem } from '../types';
import { textureGen } from '../utils/proceduralTextures';

export type CameraMode = 'cinematic_tour' | 'panorama' | 'arghya_closeup' | 'kosi_view' | 'soop_macro' | 'interactive_player';

interface RealisticGameWorldProps {
  playerPos: { x: number; y: number; z: number; rotY: number };
  isWalking: boolean;
  isInWater: boolean;
  isOffering: boolean;
  currentDay: ChhathDay;
  kafila: KafilaMember[];
  villagers: VillagerNPC[];
  collectibles: CollectibleItem[];
  diyas: FloatingDiya[];
  cameraMode: CameraMode;
}

// 1. Photorealistic Banana Tree with Arching Fronds & Banana Blossom
const RealisticBananaTree: React.FC<{ position: [number, number, number]; rotation?: [number, number, number]; scale?: number }> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}) => {
  const leafCount = 9;
  const leaves = useMemo(() => {
    return Array.from({ length: leafCount }).map((_, i) => ({
      angle: (i / leafCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2,
      droop: 0.45 + (i % 3) * 0.1,
      length: 2.8 + (i % 2) * 0.4,
      width: 0.85,
    }));
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Tapered fibrous trunk */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.2, 0.35, 3.2, 12]} />
        <meshStandardMaterial color="#415a3c" roughness={0.9} />
      </mesh>

      {/* Bamboo support stake */}
      <mesh position={[0.45, 1.5, 0.2]} rotation={[0.08, 0, -0.28]}>
        <cylinderGeometry args={[0.035, 0.045, 3.6, 6]} />
        <meshStandardMaterial color="#c6a75a" roughness={0.8} />
      </mesh>

      {/* Arching Banana Fronds with Subsurface Scattering Glow */}
      {leaves.map((leaf, idx) => (
        <group key={idx} position={[0, 3.1, 0]} rotation={[0, leaf.angle, 0]}>
          <group rotation={[leaf.droop, 0, 0]}>
            {/* Broad leaf blade */}
            <mesh position={[0, 0.18, leaf.length * 0.45]} rotation={[-0.15, 0, 0]}>
              <boxGeometry args={[leaf.width, 0.025, leaf.length]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#38b000' : '#48cae4'}
                roughness={0.4}
                metalness={0.05}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Pale green central leaf spine */}
            <mesh position={[0, 0.2, leaf.length * 0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.025, 0.04, leaf.length, 6]} />
              <meshStandardMaterial color="#d8f3dc" roughness={0.3} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Hanging Banana Bunch & Purple Blossom (Mocha) */}
      <group position={[0.28, 2.4, 0.2]} rotation={[0.4, 0, 0.2]}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.045, 0.035, 0.9, 6]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
        {/* Tiered Bananas */}
        {[0, 0.18, 0.36].map((y, rowIdx) => (
          <group key={rowIdx} position={[0, -y, 0]}>
            {[0, 1.05, 2.1, 3.14, 4.2, 5.25].map((rot, bIdx) => (
              <mesh key={bIdx} position={[Math.cos(rot) * 0.16, 0, Math.sin(rot) * 0.16]} rotation={[0.45, rot, 0]}>
                <capsuleGeometry args={[0.045, 0.32, 4, 8]} />
                <meshStandardMaterial color={rowIdx === 0 ? '#f9c74f' : '#90be6d'} roughness={0.3} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Deep Burgundy Banana Blossom */}
        <mesh position={[0, -0.85, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.15, 0.45, 8]} />
          <meshStandardMaterial color="#4a0e2e" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

// 2. Photorealistic Sugarcane Kosi Canopy & Terracotta Elephant
const RealisticKosiCanopy: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const aipanTex = useMemo(() => textureGen.getTerracottaAipanTexture(), []);

  return (
    <group position={position}>
      {/* 5 Tall Segmented Sugarcane Stalks */}
      {[
        [-0.8, -0.8, 0.2, -0.2],
        [0.8, -0.8, -0.2, -0.2],
        [0.8, 0.8, -0.2, 0.2],
        [-0.8, 0.8, 0.2, 0.2],
        [0, -0.95, 0, -0.24],
      ].map(([x, z, rZ, rX], idx) => (
        <group key={idx} position={[x, 1.8, z]} rotation={[rX, 0, rZ]}>
          {/* Canes with nodes */}
          <mesh>
            <cylinderGeometry args={[0.05, 0.065, 4.0, 8]} />
            <meshStandardMaterial color="#7209b7" roughness={0.6} />
          </mesh>
          {/* White growth rings */}
          {[-1.2, -0.4, 0.4, 1.2].map((ringY) => (
            <mesh key={ringY} position={[0, ringY, 0]}>
              <cylinderGeometry args={[0.058, 0.058, 0.05, 8]} />
              <meshStandardMaterial color="#e9d8a6" roughness={0.8} />
            </mesh>
          ))}
          {/* Spiky Top Crown Leaves */}
          <group position={[0, 2.1, 0]}>
            {[-0.3, 0, 0.3].map((angle, leafIdx) => (
              <mesh key={leafIdx} position={[angle * 0.4, 0.4, 0]} rotation={[0, 0, angle]}>
                <boxGeometry args={[0.09, 0.9, 0.015]} />
                <meshStandardMaterial color="#2d6a4f" side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* Red/Yellow Kalava Thread at apex */}
      <mesh position={[0, 3.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.05, 8, 16]} />
        <meshStandardMaterial color="#d90429" />
      </mesh>

      {/* Hand-sculpted Terracotta Elephant (Kosi Haathi) */}
      <group position={[0, 0.4, 0]} scale={0.85}>
        {/* Body with Aipan Painting Texture */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.8, 0.6, 1.1]} />
          <meshStandardMaterial map={aipanTex} roughness={0.85} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.7, 0.65]}>
          <sphereGeometry args={[0.34, 12, 12]} />
          <meshStandardMaterial map={aipanTex} roughness={0.85} />
        </mesh>
        {/* Upraised Trunk */}
        <mesh position={[0, 0.95, 0.95]} rotation={[-0.8, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.7, 8]} />
          <meshStandardMaterial color="#963f24" roughness={0.85} />
        </mesh>
        {/* Curved Ivory Tusks */}
        <mesh position={[0.15, 0.6, 0.85]} rotation={[-0.4, 0.2, 0]}>
          <coneGeometry args={[0.04, 0.35, 6]} />
          <meshStandardMaterial color="#fdf0d5" roughness={0.3} />
        </mesh>
        <mesh position={[-0.15, 0.6, 0.85]} rotation={[-0.4, -0.2, 0]}>
          <coneGeometry args={[0.04, 0.35, 6]} />
          <meshStandardMaterial color="#fdf0d5" roughness={0.3} />
        </mesh>
        {/* 4 Sturdy Legs */}
        {[-0.28, 0.28].map((x) =>
          [-0.38, 0.38].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.18, z]}>
              <cylinderGeometry args={[0.12, 0.14, 0.45, 8]} />
              <meshStandardMaterial color="#7d341d" />
            </mesh>
          ))
        )}

        {/* 4 Glowing Clay Lamps on Elephant Back */}
        {[
          [-0.22, 0.78, -0.25],
          [0.22, 0.78, -0.25],
          [-0.22, 0.78, 0.25],
          [0.22, 0.78, 0.25],
        ].map((pos, dIdx) => (
          <group key={dIdx} position={pos as [number, number, number]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.05, 0.06, 8]} />
              <meshStandardMaterial color="#8b3a1f" />
            </mesh>
            <pointLight color="#ff9e00" intensity={1.8} distance={3.5} />
            <mesh position={[0, 0.08, 0]}>
              <coneGeometry args={[0.04, 0.11, 6]} />
              <meshBasicMaterial color="#ffea00" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

// 3. Photorealistic Vrati Devotee & Detailed Bamboo Soop
export const RealisticVrati: React.FC<{
  position: [number, number, number];
  isOffering?: boolean;
}> = ({ position, isOffering = false }) => {
  const sareeTex = useMemo(() => textureGen.getSareeFabricTexture(), []);
  const bambooTex = useMemo(() => textureGen.getBambooWovenTexture(), []);
  const thekuaTex = useMemo(() => textureGen.getThekuaTexture(), []);

  return (
    <group position={position}>
      {/* Saree Draped Body */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.26, 0.44, 1.6, 16]} />
        <meshStandardMaterial map={sareeTex} roughness={0.7} />
      </mesh>

      {/* Saree Ghoonghat / Pallu over head */}
      <mesh position={[0, 1.85, -0.05]}>
        <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
        <meshStandardMaterial color="#c1121f" roughness={0.75} side={THREE.DoubleSide} />
      </mesh>

      {/* Realistic Head & Face */}
      <mesh position={[0, 1.78, 0.06]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#cb997e" roughness={0.45} />
      </mesh>

      {/* ICONIC: Bold Orange Matiya Sindoor from nose bridge to hairline */}
      <mesh position={[0, 1.84, 0.26]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.045, 0.32, 0.025]} />
        <meshBasicMaterial color="#ff4800" />
      </mesh>

      {/* Arms holding the Bamboo Soop at chest/eye level */}
      <group position={[0, 1.45, 0.32]} rotation={[isOffering ? -0.35 : 0.15, 0, 0]}>
        {/* Left & Right Arms */}
        <mesh position={[-0.28, 0, 0.18]} rotation={[0.65, -0.3, 0]}>
          <cylinderGeometry args={[0.06, 0.055, 0.6, 8]} />
          <meshStandardMaterial color="#cb997e" />
        </mesh>
        <mesh position={[0.28, 0, 0.18]} rotation={[0.65, 0.3, 0]}>
          <cylinderGeometry args={[0.06, 0.055, 0.6, 8]} />
          <meshStandardMaterial color="#cb997e" />
        </mesh>

        {/* Photorealistic Woven Bamboo Soop (सुपवा) */}
        <group position={[0, 0.12, 0.52]}>
          {/* Curved Bamboo Tray */}
          <mesh rotation={[0.22, 0, 0]}>
            <boxGeometry args={[0.7, 0.045, 0.85]} />
            <meshStandardMaterial map={bambooTex} roughness={0.65} />
          </mesh>
          {/* Back rim */}
          <mesh position={[0, 0.1, -0.38]}>
            <boxGeometry args={[0.7, 0.16, 0.05]} />
            <meshStandardMaterial map={bambooTex} roughness={0.7} />
          </mesh>

          {/* Central Vermilion Swastika mark */}
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.22, 0.22]} />
            <meshBasicMaterial color="#ff3800" />
          </mesh>

          {/* Offerings Inside Soop */}
          {/* 1. Akhand Coconut with Kalava Thread */}
          <group position={[-0.18, 0.14, -0.08]}>
            <mesh>
              <sphereGeometry args={[0.13, 12, 12]} />
              <meshStandardMaterial color="#4a2810" roughness={0.95} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[0.135, 0.015, 6, 16]} />
              <meshStandardMaterial color="#d90429" />
            </mesh>
          </group>

          {/* 2. Giant Wild Pomelo (Dabh Nimbu) */}
          <group position={[0.18, 0.16, -0.08]}>
            <mesh>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#a7c957" roughness={0.5} />
            </mesh>
            {/* Stem and small leaf */}
            <mesh position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.08, 4]} />
              <meshStandardMaterial color="#386641" />
            </mesh>
          </group>

          {/* 3. Stack of Golden Thekuas with Saancha Motif */}
          <group position={[-0.16, 0.1, 0.18]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
              <meshStandardMaterial map={thekuaTex} roughness={0.45} />
            </mesh>
          </group>

          {/* 4. Horned Water Chestnuts (Singhara) */}
          <mesh position={[0, 0.08, 0.18]} rotation={[0.3, 0.5, 0]}>
            <coneGeometry args={[0.07, 0.14, 4]} />
            <meshStandardMaterial color="#1b4332" roughness={0.6} />
          </mesh>

          {/* 5. Glowing Ghee Diya on Soop */}
          <group position={[0.16, 0.1, 0.18]}>
            <mesh>
              <cylinderGeometry args={[0.07, 0.035, 0.05, 8]} />
              <meshStandardMaterial color="#963f24" />
            </mesh>
            <pointLight color="#ffb703" intensity={2.5} distance={3.5} />
            <mesh position={[0, 0.06, 0]}>
              <coneGeometry args={[0.03, 0.09, 6]} />
              <meshBasicMaterial color="#ffee32" />
            </mesh>
          </group>

          {/* Glistening Stream of Arghya Milk & Gangajal */}
          {isOffering && (
            <group position={[0, 0.45, 0.25]}>
              {/* Polished Brass Kalash (Lota) */}
              <mesh position={[0.2, 0.25, 0]} rotation={[0, 0, -0.8]}>
                <sphereGeometry args={[0.12, 10, 10]} />
                <meshStandardMaterial color="#e9d8a6" metalness={0.9} roughness={0.15} />
              </mesh>
              {/* Flowing illuminated milk stream */}
              <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.03, 0.07, 1.6, 8]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.88} />
              </mesh>
              <pointLight color="#ffffff" intensity={3} distance={4} />
            </group>
          )}
        </group>
      </group>
    </group>
  );
};

// 4. Photorealistic Ghat Sandstone Steps & Balustrades
const RealisticGhatArchitecture: React.FC = () => {
  const sandstoneTex = useMemo(() => textureGen.getGhatSandstoneTexture(), []);

  return (
    <group position={[0, 0, 0]}>
      {/* 6 Terracotta/Sandstone Steps descending to water */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[0, -0.18 * i, 6 + i * 1.6]}>
          <boxGeometry args={[52, 0.38, 1.7]} />
          <meshStandardMaterial map={sandstoneTex} roughness={0.85} />
        </mesh>
      ))}

      {/* Wet Sand at Water's Edge */}
      <mesh position={[0, -0.16, 17.5]}>
        <boxGeometry args={[56, 0.2, 4]} />
        <meshStandardMaterial color="#8c6a46" roughness={0.2} metalness={0.15} />
      </mesh>

      {/* Decorative Ornate Stone Pillars / Chhatris on the Ghat */}
      {[-12, 12].map((x) => (
        <group key={x} position={[x, 1.8, 6]}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.45, 4.2, 8]} />
            <meshStandardMaterial map={sandstoneTex} roughness={0.85} />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[0.65, 0.8, 6]} />
            <meshStandardMaterial color="#6a381f" roughness={0.9} />
          </mesh>
          {/* Glowing oil lamp inside lantern */}
          <pointLight position={[0, 1.8, 0]} color="#ff9e00" intensity={2} distance={8} />
        </group>
      ))}
    </group>
  );
};

// 5. Photorealistic Holy River with Real-time Reflection (MeshReflectorMaterial)
const RealisticReflectiveRiver: React.FC<{ day: ChhathDay; diyas: FloatingDiya[] }> = ({ day, diyas }) => {
  const waterNormal = useMemo(() => textureGen.getWaterNormalTexture(), []);

  const waterTint = useMemo(() => {
    switch (day) {
      case 'sandhya-arghya':
        return '#80320e'; // Crimson golden twilight
      case 'kharna':
        return '#02182b'; // Deep starry night
      case 'usha-arghya':
        return '#193f66'; // Dawn blue with morning sheen
      case 'nahay-khay':
      default:
        return '#1b6a73';
    }
  }, [day]);

  return (
    <group position={[0, -0.22, 34]}>
      {/* Real-time Reflective Water Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[75, 34, 64, 64]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mirror={0.75}
          mixBlur={0.8}
          mixStrength={1.5}
          roughness={0.15}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={waterTint}
          metalness={0.65}
          normalMap={waterNormal}
          normalScale={new THREE.Vector2(0.2, 0.2)}
        />
      </mesh>

      {/* Floating Diyas Bobbing on River */}
      {diyas.map((diya) => (
        <group key={diya.id} position={[diya.x, 0.05, diya.z - 30]}>
          {/* Marigold Flower Garland Ring (Genda Phool) */}
          <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.07, 6, 12]} />
            <meshStandardMaterial color="#f77f00" roughness={0.8} />
          </mesh>
          {/* Leaf dona base */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.14, 0.08, 0.06, 8]} />
            <meshStandardMaterial color="#386641" />
          </mesh>
          {/* Earthen Diya with Flickering Flame */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.08, 0.04, 0.05, 8]} />
            <meshStandardMaterial color="#7f381b" />
          </mesh>
          <pointLight color="#ffba08" intensity={2.2} distance={3.5} />
          <mesh position={[0, 0.14, 0]}>
            <coneGeometry args={[0.035, 0.11, 6]} />
            <meshBasicMaterial color="#ffee32" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 6. Photorealistic Atmospheric Sun & Lighting System
const RealisticAtmosphere: React.FC<{ day: ChhathDay }> = ({ day }) => {
  const isNight = day === 'kharna';
  const isDawn = day === 'usha-arghya';
  const isDusk = day === 'sandhya-arghya';

  const sunColor = isDusk ? '#ff3800' : isDawn ? '#ff6b00' : '#ffd000';
  const sunPos = isDusk
    ? ([0, 5.5, 46] as [number, number, number])
    : isDawn
    ? ([0, 7.5, 46] as [number, number, number])
    : ([12, 24, 38] as [number, number, number]);

  return (
    <>
      <ambientLight intensity={isNight ? 0.25 : 0.75} color={isNight ? '#0a1128' : '#fff1e6'} />
      <directionalLight position={sunPos} color={sunColor} intensity={isNight ? 0.2 : 2.8} castShadow />

      {!isNight && (
        <group position={sunPos}>
          {/* Giant Radiant Sun Core */}
          <mesh>
            <sphereGeometry args={[4.5, 32, 32]} />
            <meshBasicMaterial color={sunColor} />
          </mesh>
          {/* Volumetric Corona Bloom */}
          <pointLight color={sunColor} intensity={6} distance={80} />
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <Sparkles count={60} scale={15} size={7} speed={0.3} color="#ffe6a7" />
          </Float>
        </group>
      )}

      {(isNight || isDawn) && <Stars radius={100} depth={50} count={4500} factor={4} fade />}
    </>
  );
};

// 7. Cinematic Showcase Camera Controller
const ShowcaseCameraController: React.FC<{
  cameraMode: CameraMode;
  playerPos: { x: number; y: number; z: number; rotY: number };
}> = ({ cameraMode, playerPos }) => {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.25;

    switch (cameraMode) {
      case 'cinematic_tour': {
        // Dramatic continuous cinematic flythrough
        const camX = Math.sin(t) * 16;
        const camZ = 18 + Math.cos(t) * 18;
        const camY = 4.5 + Math.sin(t * 0.7) * 2.5;
        camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.04);
        camera.lookAt(0, 1.4, 20);
        break;
      }
      case 'panorama': {
        // High-angle sweeping panoramic drone shot
        camera.position.lerp(new THREE.Vector3(0, 14, -4), 0.06);
        camera.lookAt(0, 1, 24);
        break;
      }
      case 'arghya_closeup': {
        // Intimate dramatic view of the Vrati offering Arghya
        camera.position.lerp(new THREE.Vector3(1.8, 1.5, 22), 0.06);
        camera.lookAt(0, 1.4, 20);
        break;
      }
      case 'kosi_view': {
        // Low-angle view looking up at the sugarcane canopy and terracotta elephant
        camera.position.lerp(new THREE.Vector3(-6, 1.2, 16), 0.06);
        camera.lookAt(-6, 1.5, 12);
        break;
      }
      case 'soop_macro': {
        // Macro view directly into the bamboo winnowing tray
        camera.position.lerp(new THREE.Vector3(0, 2.2, 21.2), 0.06);
        camera.lookAt(0, 1.4, 20.4);
        break;
      }
      case 'interactive_player':
      default: {
        // Third-person smooth follow camera behind player
        const dist = 7.5;
        const height = 4.8;
        const camX = playerPos.x - Math.sin(playerPos.rotY) * dist;
        const camZ = playerPos.z - Math.cos(playerPos.rotY) * dist;
        const camY = playerPos.y + height;
        camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.08);
        camera.lookAt(playerPos.x, playerPos.y + 1.6, playerPos.z);
        break;
      }
    }
  });

  return null;
};

export const RealisticGameWorld: React.FC<RealisticGameWorldProps> = ({
  playerPos,
  isWalking,
  isInWater,
  isOffering,
  currentDay,
  kafila,
  villagers,
  collectibles,
  diyas,
  cameraMode,
}) => {
  return (
    <>
      {/* Cinematic / Gameplay Camera */}
      <ShowcaseCameraController cameraMode={cameraMode} playerPos={playerPos} />

      {/* Atmospheric Sun & Sky */}
      <RealisticAtmosphere day={currentDay} />

      {/* Photorealistic Sandstone Ghat Steps */}
      <RealisticGhatArchitecture />

      {/* Photorealistic Reflective Holy Ganges with real mirror reflections */}
      <RealisticReflectiveRiver day={currentDay} diyas={diyas} />

      {/* Banana Tree Groves */}
      <RealisticBananaTree position={[-6.5, 0, 5]} scale={1.2} />
      <RealisticBananaTree position={[6.5, 0, 5]} scale={1.15} />
      <RealisticBananaTree position={[-14, 0, 8]} scale={1.25} />
      <RealisticBananaTree position={[14, 0, 8]} scale={1.2} />

      {/* Sugarcane Kosi Canopies with Terracotta Elephants */}
      <RealisticKosiCanopy position={[-6, 0.1, 12]} />
      <RealisticKosiCanopy position={[6, 0.1, 12]} />

      {/* Primary Vrati Standing in the River Offering Arghya */}
      <RealisticVrati position={[0, -0.25, 20]} isOffering={isOffering} />

      {/* Additional River Floating Mist & Incense Particles */}
      <Sparkles count={70} scale={[28, 4, 20]} position={[0, 0.6, 26]} size={3.5} speed={0.25} color="#ffd166" />
    </>
  );
};
