import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface SphereProps {
  position?: [number, number, number];
  radius?: number;
  color?: string;
  wireframe?: boolean;
  speed?: number;
  segments?: number;
}

const Sphere: React.FC<SphereProps> = ({
  position = [0, 0, 0],
  radius = 1,
  color = '#ffffff',
  wireframe = false,
  speed = 1,
  segments = 32
}) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed * 0.2;
      meshRef.current.rotation.z += delta * speed * 0.1;
    }
  });
  
  return (
    <mesh position={position} ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[radius, segments, segments]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
};

export default Sphere;