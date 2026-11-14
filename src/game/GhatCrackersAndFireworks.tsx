import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { animeTexGen } from '../utils/animeTextures';
import { audio } from '../utils/audio';

interface RocketBurst {
  id: number;
  launchPos: THREE.Vector3;
  targetY: number;
  currentPos: THREE.Vector3;
  color: string;
  state: 'launching' | 'exploding' | 'dead';
  progress: number;
  burstScale: number;
}

interface GhatCrackersAndFireworksProps {
  manualBurstCount?: number;
}

export const GhatCrackersAndFireworks: React.FC<GhatCrackersAndFireworksProps> = ({
  manualBurstCount = 0,
}) => {
  const toonGradient = useMemo(() => animeTexGen.getToonGradientMap(), []);

  // ============================================================================
  // 1. SKYROCKET FIREWORKS SYSTEM
  // ============================================================================
  const rocketColors = useMemo(
    () => ['#ff0054', '#ffd166', '#06d6a0', '#ff9e00', '#f72585', '#4cc9f0', '#fee440'],
    []
  );

  const rocketsRef = useRef<RocketBurst[]>([]);
  const nextId = useRef(1);
  const lastAutoLaunch = useRef(0);
  const prevManualCount = useRef(manualBurstCount);

  // Spawn a new skyrocket over the Ganges
  const spawnRocket = (customX?: number) => {
    const launchX = customX !== undefined ? customX : (Math.random() - 0.5) * 50;
    const launchZ = 280 + Math.random() * 45;
    const targetY = 28 + Math.random() * 22; // Explode 28-50m up in the sky

    const color = rocketColors[Math.floor(Math.random() * rocketColors.length)];

    rocketsRef.current.push({
      id: nextId.current++,
      launchPos: new THREE.Vector3(launchX, -0.2, launchZ),
      targetY,
      currentPos: new THREE.Vector3(launchX, -0.2, launchZ),
      color,
      state: 'launching',
      progress: 0,
      burstScale: 0.1,
    });

    audio.playFireworkBurst();
  };

  // Check manual burst trigger from HUD button
  useEffect(() => {
    if (manualBurstCount > prevManualCount.current) {
      spawnRocket((Math.random() - 0.5) * 20);
      prevManualCount.current = manualBurstCount;
    }
  }, [manualBurstCount]);

  // Animated Anaar fountains & Chakris references
  const anaarLight1 = useRef<THREE.PointLight>(null);
  const anaarLight2 = useRef<THREE.PointLight>(null);
  const chakriRef1 = useRef<THREE.Group>(null);
  const chakriRef2 = useRef<THREE.Group>(null);
  const sparklerKidsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Periodic auto launch every 4.5 seconds
    if (time - lastAutoLaunch.current > 4.5) {
      spawnRocket();
      lastAutoLaunch.current = time;
    }

    // Update active sky rockets
    rocketsRef.current.forEach((r) => {
      if (r.state === 'launching') {
        // Rise rapidly
        r.currentPos.y += delta * 38;
        if (r.currentPos.y >= r.targetY) {
          r.state = 'exploding';
          r.progress = 0;
        }
      } else if (r.state === 'exploding') {
        r.progress += delta * 1.1; // Burst lasts ~0.9s
        r.burstScale = Math.sin(r.progress * Math.PI) * 14;
        r.currentPos.y -= delta * 3.5; // Gentle gravity fall
        if (r.progress >= 1.0) {
          r.state = 'dead';
        }
      }
    });

    // Clean dead rockets
    rocketsRef.current = rocketsRef.current.filter((r) => r.state !== 'dead');

    // Pulsate Anaar lights
    if (anaarLight1.current) {
      anaarLight1.current.intensity = 2.0 + Math.sin(time * 28) * 1.2;
    }
    if (anaarLight2.current) {
      anaarLight2.current.intensity = 2.0 + Math.cos(time * 32) * 1.2;
    }

    // Spin ground chakris
    if (chakriRef1.current) {
      chakriRef1.current.rotation.y += delta * 25;
    }
    if (chakriRef2.current) {
      chakriRef2.current.rotation.y -= delta * 28;
    }

    // Wave sparklers in hands of kids
    if (sparklerKidsRef.current) {
      sparklerKidsRef.current.children.forEach((child, i) => {
        const arm = child.getObjectByName('sparklerArm');
        if (arm) {
          arm.rotation.z = Math.sin(time * 7 + i) * 0.45;
          arm.rotation.x = Math.cos(time * 6 + i * 2) * 0.35;
        }
      });
    }
  });

  // Fixed positions for Anaar fountains along steps & sand
  const anaars = useMemo(
    () => [
      { id: 1, pos: [-16, 0.4, 244] as [number, number, number], color: '#ffd166' },
      { id: 2, pos: [16, 0.4, 244] as [number, number, number], color: '#06d6a0' },
      { id: 3, pos: [-8, -0.2, 262] as [number, number, number], color: '#ff0054' },
      { id: 4, pos: [8, -0.2, 262] as [number, number, number], color: '#ffd166' },
    ],
    []
  );

  // Sparkler kid locations along ghat
  const sparklerKids = useMemo(
    () => [
      { id: 1, pos: [-12, 0.35, 246] as [number, number, number], color: '#ff0054', kurta: '#ffbe0b' },
      { id: 2, pos: [12, 0.35, 246] as [number, number, number], color: '#00f5d4', kurta: '#ff0054' },
      { id: 3, pos: [-22, 0.2, 252] as [number, number, number], color: '#ffd166', kurta: '#06d6a0' },
      { id: 4, pos: [22, 0.2, 252] as [number, number, number], color: '#ff7b00', kurta: '#9d4edd' },
      { id: 5, pos: [-4, -0.3, 268] as [number, number, number], color: '#00f5d4', kurta: '#fb5607' },
      { id: 6, pos: [5, -0.3, 268] as [number, number, number], color: '#ffd166', kurta: '#3a86ff' },
    ],
    []
  );

  return (
    <group>
      {/* ====================================================================== */}
      {/* A. AERIAL SKYROCKETS BURSTING OVER THE SACRED GANGES */}
      {/* ====================================================================== */}
      {rocketsRef.current.map((r) => (
        <group key={r.id} position={r.currentPos}>
          {r.state === 'launching' && (
            <group>
              {/* Rocket Body */}
              <mesh>
                <cylinderGeometry args={[0.06, 0.08, 0.7, 6]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              {/* Fiery Smoke Trail */}
              <pointLight color="#ffaa00" intensity={4} distance={12} />
              <Sparkles count={30} scale={[0.8, 4, 0.8]} size={5} speed={1.2} color="#ffdd00" />
            </group>
          )}

          {r.state === 'exploding' && (
            <group>
              {/* Central Flash */}
              <pointLight color={r.color} intensity={12 * (1 - r.progress)} distance={60} />
              {/* Expanding Spherical Burst of Stars */}
              <mesh scale={r.burstScale}>
                <sphereGeometry args={[1, 12, 12]} />
                <meshBasicMaterial
                  color={r.color}
                  wireframe
                  transparent
                  opacity={Math.max(0, 0.9 * (1 - r.progress))}
                />
              </mesh>
              {/* Glittering Falling Spark Particles */}
              <Sparkles
                count={85}
                scale={r.burstScale * 1.4}
                size={7}
                speed={0.4}
                color={r.color}
              />
              <Sparkles
                count={40}
                scale={r.burstScale * 0.9}
                size={5}
                speed={0.6}
                color="#ffffff"
              />
            </group>
          )}
        </group>
      ))}

      {/* ====================================================================== */}
      {/* B. GROUND ANAARS (TERRACOTTA FOUNTAIN CRACKERS SPRAYING HIGH SPARKS) */}
      {/* ====================================================================== */}
      {anaars.map((a, i) => (
        <group key={a.id} position={a.pos}>
          {/* Terracotta Cone */}
          <mesh position={[0, 0.22, 0]}>
            <coneGeometry args={[0.22, 0.44, 10]} />
            <meshToonMaterial color="#b08968" gradientMap={toonGradient} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.05, 10]} />
            <meshToonMaterial color="#3d2614" gradientMap={toonGradient} />
          </mesh>

          {/* Conical Fountain Particle Spray */}
          <group position={[0, 0.44, 0]}>
            <Sparkles
              count={55}
              scale={[1.8, 4.5, 1.8]}
              position={[0, 2.0, 0]}
              size={6}
              speed={1.5}
              color={a.color}
            />
            <Sparkles
              count={25}
              scale={[1.0, 3.2, 1.0]}
              position={[0, 1.4, 0]}
              size={4}
              speed={1.8}
              color="#ffffff"
            />
            {/* Blazing Fountain Core Light */}
            <pointLight
              ref={i === 0 ? anaarLight1 : i === 1 ? anaarLight2 : undefined}
              color={a.color}
              intensity={2.8}
              distance={7}
            />
          </group>
        </group>
      ))}

      {/* ====================================================================== */}
      {/* C. GROUND CHAKRI (SPINNING WHEEL CRACKERS) */}
      {/* ====================================================================== */}
      <group position={[0, 0.42, 242]}>
        <group ref={chakriRef1}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
            <meshToonMaterial color="#d90429" gradientMap={toonGradient} />
          </mesh>
          <Sparkles count={45} scale={[1.8, 0.3, 1.8]} size={5} speed={2} color="#ffd166" />
        </group>
        <pointLight color="#ffd166" intensity={2} distance={5} />
      </group>

      <group position={[-20, 0.22, 248]}>
        <group ref={chakriRef2}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
            <meshToonMaterial color="#06d6a0" gradientMap={toonGradient} />
          </mesh>
          <Sparkles count={40} scale={[1.6, 0.3, 1.6]} size={5} speed={2} color="#00f5d4" />
        </group>
        <pointLight color="#00f5d4" intensity={1.8} distance={5} />
      </group>

      {/* ====================================================================== */}
      {/* D. KIDS & YOUNGSTERS WAVING PHULJHARI (SPARKLERS) */}
      {/* ====================================================================== */}
      <group ref={sparklerKidsRef}>
        {sparklerKids.map((k) => (
          <group key={k.id} position={k.pos} scale={0.68}>
            {/* Child Body */}
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.22, 0.28, 1.05, 8]} />
              <meshToonMaterial color={k.kurta} gradientMap={toonGradient} />
            </mesh>
            {/* Child Head */}
            <mesh position={[0, 1.48, 0]}>
              <sphereGeometry args={[0.18, 10, 10]} />
              <meshToonMaterial color="#fcd5ce" gradientMap={toonGradient} />
            </mesh>
            {/* Joyful Hair */}
            <mesh position={[0, 1.62, 0]}>
              <sphereGeometry args={[0.19, 8, 8]} />
              <meshToonMaterial color="#1a1a1a" gradientMap={toonGradient} />
            </mesh>

            {/* Waving Arm holding Phuljhari */}
            <group name="sparklerArm" position={[0.24, 1.15, 0.1]}>
              {/* Arm */}
              <mesh position={[0.1, 0, 0.15]} rotation={[0.4, 0.3, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.38, 6]} />
                <meshToonMaterial color={k.kurta} gradientMap={toonGradient} />
              </mesh>
              {/* Sparkler Wire Rod */}
              <mesh position={[0.2, 0.18, 0.32]} rotation={[0.2, 0, -0.4]}>
                <cylinderGeometry args={[0.012, 0.012, 0.48, 4]} />
                <meshToonMaterial color="#8d99ae" gradientMap={toonGradient} />
              </mesh>
              {/* Sparkling Tip */}
              <group position={[0.28, 0.42, 0.36]}>
                <pointLight color={k.color} intensity={2.2} distance={3.5} />
                <mesh>
                  <sphereGeometry args={[0.06, 6, 6]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                <Sparkles count={35} scale={1.1} size={6} speed={1.4} color={k.color} />
              </group>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
};