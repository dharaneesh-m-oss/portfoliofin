"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const vertexShader = `
  uniform float uTime;
  attribute vec2 aAnimation;
  attribute vec3 aStartPosition;
  attribute vec3 aControl0;
  attribute vec3 aControl1;
  attribute vec3 aEndPosition;
  attribute float aPhase; // 0 for 'out', 1 for 'in'

  varying vec2 vUv;

  vec3 cubicBezier(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t) {
    float t2 = t * t;
    float t3 = t2 * t;
    float mt = 1.0 - t;
    float mt2 = mt * mt;
    float mt3 = mt2 * mt;
    return mt3 * p0 + 3.0 * mt2 * t * p1 + 3.0 * mt * t2 * p2 + t3 * p3;
  }

  float easeInOutCubic(float t) {
    return t < 0.5 ? 4.0 * t * t * t : (t - 1.0) * (2.0 * t - 2.0) * (2.0 * t - 2.0) + 1.0;
  }

  void main() {
    vUv = uv;
    float tDelay = aAnimation.x;
    float tDuration = aAnimation.y;
    float tTime = clamp(uTime - tDelay, 0.0, tDuration);
    float tProgress = easeInOutCubic(tTime / tDuration);

    vec3 transformed = position;
    
    if (aPhase < 0.5) { // 'out'
      transformed *= (1.0 - tProgress);
    } else { // 'in'
      transformed *= tProgress;
    }

    transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(uMap, vUv);
  }
`;

interface SlideProps {
  width: number;
  height: number;
  phase: "in" | "out";
  textureUrl: string;
  timeRef: React.MutableRefObject<number>;
}

function Slide({ width, height, phase, textureUrl, timeRef }: SlideProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl, (loader) => {
    loader.setCrossOrigin("anonymous");
  });

  const geometry = useMemo(() => {
    const segmentsX = width * 2;
    const segmentsY = height * 2;
    const baseGeom = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    
    // We need to explode the geometry into individual triangles (faces)
    // to apply the fragmentation effect correctly.
    const explodedGeom = new THREE.BufferGeometry();
    const positions = baseGeom.attributes.position.array;
    const uvs = baseGeom.attributes.uv.array;
    const indices = baseGeom.index?.array || [];
    
    const faceCount = indices.length / 3;
    const newPositions = new Float32Array(faceCount * 3 * 3);
    const newUvs = new Float32Array(faceCount * 3 * 2);
    
    const aAnimation = new Float32Array(faceCount * 3 * 2);
    const aStartPosition = new Float32Array(faceCount * 3 * 3);
    const aControl0 = new Float32Array(faceCount * 3 * 3);
    const aControl1 = new Float32Array(faceCount * 3 * 3);
    const aEndPosition = new Float32Array(faceCount * 3 * 3);
    const aPhase = new Float32Array(faceCount * 3);

    const minDuration = 0.8;
    const maxDuration = 1.2;
    const maxDelayX = 0.9;
    const maxDelayY = 0.125;
    const stretch = 0.11;

    for (let i = 0; i < faceCount; i++) {
      const idx1 = indices[i * 3];
      const idx2 = indices[i * 3 + 1];
      const idx3 = indices[i * 3 + 2];

      // Centroid calculation
      const cx = (positions[idx1 * 3] + positions[idx2 * 3] + positions[idx3 * 3]) / 3;
      const cy = (positions[idx1 * 3 + 1] + positions[idx2 * 3 + 1] + positions[idx3 * 3 + 1]) / 3;
      const cz = (positions[idx1 * 3 + 2] + positions[idx2 * 3 + 2] + positions[idx3 * 3 + 2]) / 3;

      // Animation parameters
      const duration = minDuration + Math.random() * (maxDuration - minDuration);
      const delayX = ((cx + width / 2) / width) * maxDelayX;
      let delayY;
      if (phase === "in") {
        delayY = (Math.abs(cy) / (height / 2)) * maxDelayY;
      } else {
        delayY = (1.0 - Math.abs(cy) / (height / 2)) * maxDelayY;
      }

      const totalDelay = delayX + delayY + Math.random() * stretch * duration;

      // Control points
      const signY = Math.sign(cy);
      const cp0 = new THREE.Vector3(
        (0.1 + Math.random() * 0.2) * 50,
        signY * (0.1 + Math.random() * 0.2) * 70,
        (Math.random() - 0.5) * 40
      );
      const cp1 = new THREE.Vector3(
        (0.3 + Math.random() * 0.3) * 50,
        -signY * (0.3 + Math.random() * 0.3) * 70,
        (Math.random() - 0.5) * 40
      );

      const startPos = new THREE.Vector3(cx, cy, cz);
      const endPos = new THREE.Vector3(cx, cy, cz);
      const ctrl0 = phase === "in" ? startPos.clone().sub(cp0) : startPos.clone().add(cp0);
      const ctrl1 = phase === "in" ? startPos.clone().sub(cp1) : startPos.clone().add(cp1);

      for (let v = 0; v < 3; v++) {
        const vi = i * 3 + v;
        const baseIdx = [idx1, idx2, idx3][v];
        
        newPositions[vi * 3] = positions[baseIdx * 3] - cx;
        newPositions[vi * 3 + 1] = positions[baseIdx * 3 + 1] - cy;
        newPositions[vi * 3 + 2] = positions[baseIdx * 3 + 2] - cz;
        
        newUvs[vi * 2] = uvs[baseIdx * 2];
        newUvs[vi * 2 + 1] = uvs[baseIdx * 2 + 1];

        aAnimation[vi * 2] = totalDelay;
        aAnimation[vi * 2 + 1] = duration;

        aStartPosition[vi * 3] = startPos.x;
        aStartPosition[vi * 3 + 1] = startPos.y;
        aStartPosition[vi * 3 + 2] = startPos.z;

        aControl0[vi * 3] = ctrl0.x;
        aControl0[vi * 3 + 1] = ctrl0.y;
        aControl0[vi * 3 + 2] = ctrl0.z;

        aControl1[vi * 3] = ctrl1.x;
        aControl1[vi * 3 + 1] = ctrl1.y;
        aControl1[vi * 3 + 2] = ctrl1.z;

        aEndPosition[vi * 3] = endPos.x;
        aEndPosition[vi * 3 + 1] = endPos.y;
        aEndPosition[vi * 3 + 2] = endPos.z;

        aPhase[vi] = phase === "in" ? 1.0 : 0.0;
      }
    }

    explodedGeom.setAttribute("position", new THREE.BufferAttribute(newPositions, 3));
    explodedGeom.setAttribute("uv", new THREE.BufferAttribute(newUvs, 2));
    explodedGeom.setAttribute("aAnimation", new THREE.BufferAttribute(aAnimation, 2));
    explodedGeom.setAttribute("aStartPosition", new THREE.BufferAttribute(aStartPosition, 3));
    explodedGeom.setAttribute("aControl0", new THREE.BufferAttribute(aControl0, 3));
    explodedGeom.setAttribute("aControl1", new THREE.BufferAttribute(aControl1, 3));
    explodedGeom.setAttribute("aEndPosition", new THREE.BufferAttribute(aEndPosition, 3));
    explodedGeom.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));

    return explodedGeom;
  }, [width, height, phase]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMap: { value: texture }
  }), [texture]);

  useFrame(() => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = timeRef.current;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

export default function ThreeFragmentationEffect() {
  const timeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });
    tl.to(timeRef, {
      current: 2.5, // Total duration approx
      duration: 3,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[600px] relative bg-black rounded-3xl overflow-hidden mb-20 shadow-2xl">
      <Canvas camera={{ position: [0, 0, 60], fov: 80 }}>
        <ambientLight intensity={0.5} />
        <Slide
          width={100}
          height={60}
          phase="out"
          textureUrl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/winter.jpg"
          timeRef={timeRef}
        />
        <Slide
          width={100}
          height={60}
          phase="in"
          textureUrl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/spring.jpg"
          timeRef={timeRef}
        />
      </Canvas>
      <div className="absolute bottom-6 left-6 text-white/50 text-xs font-mono tracking-widest uppercase pointer-events-none">
        Fragmentation Visualizer v1.0
      </div>
    </div>
  );
}
