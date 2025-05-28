import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';

interface FloatingTextProps {
  text: string;
  position?: [number, number, number];
  color?: string;
  size?: number;
  font?: string;
  maxWidth?: number;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  fadeIn?: boolean;
}

const FloatingText: React.FC<FloatingTextProps> = ({
  text,
  position = [0, 0, 0],
  color = '#ffffff',
  size = 1,
  font = '/fonts/Inter-Bold.woff',
  maxWidth = 10,
  textAlign = 'center',
  fadeIn = false
}) => {
  const groupRef = useRef<Group>(null);
  const { mouse, viewport } = useThree();
  
  // Subtle floating animation
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Subtle breathing effect
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.1;
      
      // Subtle tilt based on mouse position
      groupRef.current.rotation.x = (mouse.y * 0.1);
      groupRef.current.rotation.y = (mouse.x * 0.1);
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      <Text
        color={color}
        fontSize={size}
        maxWidth={maxWidth}
        lineHeight={1.2}
        textAlign={textAlign}
        font="https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

export default FloatingText;