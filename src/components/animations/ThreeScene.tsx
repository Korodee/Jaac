import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  // This is a placeholder for a 3D model
  // You can replace this with your own model or create a simple geometry
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#6B46C1" />
    </mesh>
  );
}

interface ThreeSceneProps {
  className?: string;
}

export default function ThreeScene({ className = '' }: ThreeSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
} 