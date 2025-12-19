import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  controls?: boolean;
  background?: string;
}

const Scene: React.FC<SceneProps> = ({
  children,
  cameraPosition = [0, 0, 5],
  controls = true,
  background = '#000000',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {isVisible && (
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
          className="w-full h-full"
          style={{ background }}
        >
          <PerspectiveCamera makeDefault position={cameraPosition} fov={75} />
          <color attach="background" args={[background]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <MouseFollowLight />
          {children}
          {controls && <OrbitControls enableZoom={false} enablePan={false} />}
        </Canvas>
      )}
    </div>
  );
};

// Custom light that follows mouse position
const MouseFollowLight = () => {
  const light = useRef<THREE.PointLight>(null);
  const { viewport, mouse } = useThree();
  
  useFrame(() => {
    if (light.current) {
      light.current.position.x = mouse.x * viewport.width / 2;
      light.current.position.y = mouse.y * viewport.height / 2;
    }
  });
  
  return (
    <pointLight
      ref={light}
      position={[0, 0, 3]}
      intensity={0.8}
      color="#ffffff"
    />
  );
};

export default Scene;