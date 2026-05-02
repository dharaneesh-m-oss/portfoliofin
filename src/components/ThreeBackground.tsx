"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 300;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      // Update t for slow drift
      t = particle.t += speed / 2;
      
      // Mouse parallax
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // Calculate parallax movement based on mouse
      particle.mx += (mouse.x * viewport.width * 2 - particle.mx) * 0.01;
      particle.my += (mouse.y * viewport.height * 2 - particle.my) * 0.01;

      // Position logic for "PCB traces" feeling
      // We snap them to a loose grid
      const x = (xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10) / 2 + particle.mx * 0.1;
      const y = (yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10) / 2 + particle.my * 0.1;
      const z = (zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10) / 2;

      dummy.position.set(x, y, z);
      
      // Sometimes they rotate by 90 degrees to simulate traces
      const rotationY = Math.round(t) % 2 === 0 ? Math.PI / 2 : 0;
      dummy.rotation.set(s * 5, rotationY, s * 5);
      
      // Flat, trace-like scales
      const scaleBase = Math.max(0.1, Math.sin(t));
      dummy.scale.set(scaleBase * 2, scaleBase * 0.2, scaleBase * 0.2);
      
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      {/* Cyan/Violet materials to match the theme */}
      <meshPhysicalMaterial 
        color="#00F0FF" 
        emissive="#00F0FF"
        emissiveIntensity={0.5}
        transparent 
        opacity={0.6} 
        roughness={0.2}
      />
    </instancedMesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7A00FF" />
        <Particles />
      </Canvas>
      
      {/* Ambient radial gradient blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-glow/5 via-void/80 to-void pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-glow/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-glow/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}
