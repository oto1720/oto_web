import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface SpinningCubeProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
  wireframe?: boolean;
  speed?: number;
}

const SpinningCube: React.FC<SpinningCubeProps> = ({
  position = [0, 0, 0],
  size = 1,
  color = '#ffffff',
  wireframe = false,
  speed = 1
}) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.5;
      meshRef.current.rotation.y += delta * speed;
    }
  });
  
  return (
    <mesh position={position} ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
};

export default SpinningCube;