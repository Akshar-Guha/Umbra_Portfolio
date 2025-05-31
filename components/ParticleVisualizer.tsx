/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { RootState } from '@react-three/fiber';

interface ParticleConfig {
  count: number;
  size: number;
  strobeSpeed: number;
  burstStrength: number;
  baseColor: string;
  zRadius: number;
  flowDirection: THREE.Vector3;
  speedMultiplier: number;
}

interface ParticleVisualizerProps {
  config: ParticleConfig;
  isHovering: boolean;
  isDataTraceFullyRevealed: boolean;
  isUmbraTiltActive: boolean;
}

const Particles: React.FC<{
  config: ParticleConfig;
  isHovering: boolean;
  pointer: { x: number; y: number };
  burst: boolean;
  scrollSpeed: number;
  colorScrollFactor: number;
  isDataTraceFullyRevealed: boolean;
  isUmbraTiltActive: boolean;
}> = ({ config, isHovering, pointer, burst, scrollSpeed, colorScrollFactor, isDataTraceFullyRevealed, isUmbraTiltActive }) => {
  const ref = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(config.count * 3);
    for (let i = 0; i < config.count; i++) {
      // Distribute particles within a sphere, considering zRadius
      const r = Math.random() * 30; // Keep initial radius for x and y similar
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI; // For spherical distribution
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = (Math.random() - 0.5) * config.zRadius * 2; // Use zRadius for z-distribution
    }
    return arr;
  }, [config.count, config.zRadius]);

  const [deviceRotation, setDeviceRotation] = useState({ x: 0, y: 0 });
  const currentParticleScale = useRef(1);
  const targetParticleScale = useRef(1);

  // Define the color gradient for scroll-based color change
  const gradientColors = React.useMemo(() => [
    new THREE.Color('white'),
    new THREE.Color(0xff4444), // Light Red
    new THREE.Color(0x4477ff), // Light Blue
    new THREE.Color(0x55cc55), // Light Green
    new THREE.Color(0x4477ff), // Light Blue
    new THREE.Color(0xff4444), // Light Red
    new THREE.Color('white'),
  ], []);

  const colorCycleProgress = useRef(0);
  const colorCycleSpeed = 0.05; // ADJUSTED: Slowed down to 25% of previous speed

  useFrame((state: RootState, delta: number) => {
    const pts = ref.current;
    const group = groupRef.current;

    if (!pts || !group) return;

    const currentSpeed = (isDataTraceFullyRevealed || isUmbraTiltActive) ? config.speedMultiplier : 1;

    // Update target scale based on tilt state
    if (isUmbraTiltActive) {
      targetParticleScale.current = 1.5;
    } else {
      targetParticleScale.current = 1;
    }

    // Smoothly animate particle scale towards the target scale
    currentParticleScale.current += (targetParticleScale.current - currentParticleScale.current) * 0.1;
    pts.scale.set(currentParticleScale.current, currentParticleScale.current, currentParticleScale.current);

    if (isUmbraTiltActive) {
      const targetX = Math.PI / 4;
      const targetY = Math.PI / 4;
      const targetZ = Math.PI / 8;

      group.rotation.x += (targetX - group.rotation.x) * 0.05;
      group.rotation.y += (targetY - group.rotation.y) * 0.05;
      group.rotation.z += (targetZ - group.rotation.z) * 0.05;

    } else {
      group.rotation.x += (0 - group.rotation.x) * 0.05;
      group.rotation.y += (0 - group.rotation.y) * 0.05;
      group.rotation.z += (0 - group.rotation.z) * 0.05;
    }

    // Apply flow direction and speed multiplier when Umbra Tilt is active
    if (isUmbraTiltActive && pts.geometry instanceof THREE.BufferGeometry) {
      const positions = pts.geometry.attributes.position.array;
      const flow = config.flowDirection.clone().multiplyScalar(delta * currentSpeed * 5); // Adjust multiplier for visible movement

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += flow.x;
        positions[i + 1] += flow.y;
        positions[i + 2] += flow.z;

        // Optional: Wrap particles around if they go out of bounds (simple example for Z)
        // if (positions[i + 2] > config.zRadius) positions[i + 2] -= config.zRadius * 2;
        // if (positions[i + 2] < -config.zRadius) positions[i + 2] += config.zRadius * 2;

        // Wrap particles around on X, Y, and Z axes
        const boundaryX = 30; // Based on initial distribution
        const boundaryY = 30; // Based on initial distribution
        const boundaryZ = config.zRadius; // Based on config.zRadius

        if (positions[i] > boundaryX) positions[i] -= boundaryX * 2;
        if (positions[i] < -boundaryX) positions[i] += boundaryX * 2;

        if (positions[i + 1] > boundaryY) positions[i + 1] -= boundaryY * 2;
        if (positions[i + 1] < -boundaryY) positions[i + 1] += boundaryY * 2;

        if (positions[i + 2] > boundaryZ) positions[i + 2] -= boundaryZ * 2;
        if (positions[i + 2] < -boundaryZ) positions[i + 2] += boundaryZ * 2;
      }
      pts.geometry.attributes.position.needsUpdate = true;
    }

    if (deviceRotation.x !== 0 || deviceRotation.y !== 0) {
       pts.rotation.x += (deviceRotation.x - pts.rotation.x) * 0.1;
       pts.rotation.y += (deviceRotation.y - pts.rotation.y) * 0.1;
    } else if (isHovering) {
       pts.rotation.y += (pointer.x * 0.1 - pts.rotation.y) * 0.1;
       pts.rotation.x += (pointer.y * 0.1 - pts.rotation.x) * 0.1;
    } else {
       const baseRotationSpeedY = 0.02;
       const baseRotationSpeedX = 0.01;

       let currentScrollSpeed = scrollSpeed;
       let currentBaseSpeedY = baseRotationSpeedY * currentSpeed;
       let currentBaseSpeedX = baseRotationSpeedX * currentSpeed;

       if (isDataTraceFullyRevealed) {
         currentBaseSpeedY *= 4;
         currentBaseSpeedX *= 4;
         currentScrollSpeed *= 0.4; 
       }

       pts.rotation.y += (currentBaseSpeedY + currentScrollSpeed) * delta;
       pts.rotation.x += (currentBaseSpeedX + currentScrollSpeed * 0.5) * delta;
    }

    const scale = burst ? config.burstStrength : 1;
    pts.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

    const mat = pts.material as THREE.PointsMaterial;

    if (isDataTraceFullyRevealed) {
      colorCycleProgress.current += delta * colorCycleSpeed;
      colorCycleProgress.current %= 1;

      const hue = colorCycleProgress.current;
      const saturation = 1;
      const lightness = 0.5;

      mat.color.setHSL(hue, saturation, lightness);

    } else {
      const numSegments = gradientColors.length - 1;
      if (mat && numSegments > 0) {
        const segmentIndex = Math.min(Math.floor(colorScrollFactor * numSegments), numSegments - 1);
        const localFactor = (colorScrollFactor * numSegments) - segmentIndex;
        
        const c1 = gradientColors[segmentIndex];
        const c2 = gradientColors[segmentIndex + 1];
        
        mat.color.copy(c1).lerp(c2, localFactor);
      } else if (mat && gradientColors.length === 1) {
        mat.color.copy(gradientColors[0]);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={ref} positions={positions as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial transparent size={config.size} depthWrite={false} color={gradientColors[0]} />
      </Points>
    </group>
  );
};

const ParticleVisualizer: React.FC<ParticleVisualizerProps> = ({ config, isHovering, isDataTraceFullyRevealed, isUmbraTiltActive }) => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [burst, setBurst] = useState(false);
  const [smoothedScrollSpeed, setSmoothedScrollSpeed] = useState(0);
  const [colorScrollFactor, setColorScrollFactor] = useState(0);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setPointer({ x, y });
  };

  const handleClick = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const rawDeltaScroll = currentScrollY - lastScrollY.current;
      
      let speedFactor = rawDeltaScroll * 0.005;
      speedFactor = Math.max(-0.2, Math.min(0.2, speedFactor));
      setSmoothedScrollSpeed(prevSpeed => prevSpeed * 0.85 + speedFactor * 0.15);
      lastScrollY.current = currentScrollY;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      
      let progress = 0;
      if (maxScroll > 0) {
        progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));
      }
      
      const nonlinearFactor = Math.pow(progress, 1.2);
      setColorScrollFactor(nonlinearFactor);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setSmoothedScrollSpeed(0); 
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ /* background: 'black' */ }}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <Particles 
        config={config}
        isHovering={isHovering}
        pointer={pointer}
        burst={burst}
        scrollSpeed={smoothedScrollSpeed}
        colorScrollFactor={colorScrollFactor}
        isDataTraceFullyRevealed={isDataTraceFullyRevealed}
        isUmbraTiltActive={isUmbraTiltActive}
      />
      <OrbitControls enableDamping dampingFactor={0.1} />
    </Canvas>
  );
};

export default ParticleVisualizer;