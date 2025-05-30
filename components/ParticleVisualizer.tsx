'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleConfig {
  count: number;
  size: number;
  strobeSpeed: number;
  burstStrength: number;
  baseColor: string;
}

interface ParticleVisualizerProps {
  config: ParticleConfig;
  isHovering: boolean;
  scrollColor: any;
}

const Particles: React.FC<{config: ParticleConfig; isHovering: boolean; pointer: {x:number,y:number}; burst: boolean; scrollColor: any}> = ({ config, isHovering, pointer, burst, scrollColor }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(config.count * 3);
    for (let i = 0; i < config.count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, [config.count]);

  const [deviceRotation, setDeviceRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        const x = THREE.MathUtils.degToRad(e.beta) * 0.5;
        const y = THREE.MathUtils.degToRad(e.gamma) * 0.5;
        setDeviceRotation({ x, y });
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;

    if (deviceRotation.x !== 0 || deviceRotation.y !== 0) {
       pts.rotation.x += (deviceRotation.x - pts.rotation.x) * 0.1;
       pts.rotation.y += (deviceRotation.y - pts.rotation.y) * 0.1;
    } else if (isHovering) {
       pts.rotation.y += (pointer.x * 0.1 - pts.rotation.y) * 0.1;
       pts.rotation.x += (pointer.y * 0.1 - pts.rotation.x) * 0.1;
    } else {
       pts.rotation.y += delta * 0.02;
       pts.rotation.x += delta * 0.01;
    }

    const scale = burst ? config.burstStrength : 1;
    pts.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

    const mat = pts.material as THREE.PointsMaterial;
    mat.color.set(scrollColor.get());
  });

  return (
    <Points ref={ref} positions={positions as any} stride={3} frustumCulled={false}>
      <PointMaterial transparent size={config.size} depthWrite={false} color={config.baseColor} />
    </Points>
  );
};

const ParticleVisualizer: React.FC<ParticleVisualizerProps> = ({ config, isHovering, scrollColor }) => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [burst, setBurst] = useState(false);

  const handlePointerMove = (e: any) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setPointer({ x, y });
  };

  const handleClick = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 500);
  };

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // Could pass to pointer or rotation if needed
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ background: 'black' }}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <Particles 
        config={config} 
        isHovering={isHovering} 
        pointer={pointer} 
        burst={burst} 
        scrollColor={scrollColor}
      />
      <OrbitControls enableDamping dampingFactor={0.1} />
    </Canvas>
  );
};

export default ParticleVisualizer;