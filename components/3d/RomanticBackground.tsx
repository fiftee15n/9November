"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Petal shape geometry for floating 3D rose petals
function createPetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.2, 0.3, 0.4, 0.8, 0.2, 1.2);
  shape.bezierCurveTo(0.0, 1.4, -0.2, 1.2, -0.2, 1.2);
  shape.bezierCurveTo(-0.4, 0.8, -0.2, 0.3, 0, 0);

  const geometry = new THREE.ShapeGeometry(shape, 12);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = Math.sin(y * 2) * 0.08 - (x * x) * 0.2;
    pos.setZ(i, z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

interface PetalData {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  rotSpeed: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
  swayOffset: number;
  swaySpeed: number;
}

function FloatingPetals({ count = 35 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const petalGeo = useMemo(() => createPetalGeometry(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  const boundX = Math.max(viewport.width * 1.2, 20);
  const boundY = Math.max(viewport.height * 1.2, 18);

  const petals = useMemo<PetalData[]>(() => {
    const arr: PetalData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * boundX * 2,
          Math.random() * boundY * 2 - boundY,
          (Math.random() - 0.5) * 8
        ),
        rot: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.016,
          (Math.random() - 0.5) * 0.012
        ),
        velocity: new THREE.Vector3(
          -0.004 - Math.random() * 0.008,
          -0.01 - Math.random() * 0.012,
          (Math.random() - 0.5) * 0.004
        ),
        scale: 0.12 + Math.random() * 0.16,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.5 + Math.random() * 0.7,
      });
    }
    return arr;
  }, [count, boundX, boundY]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const p = petals[i];

      p.pos.y += p.velocity.y;
      p.pos.x += p.velocity.x + Math.sin(time * p.swaySpeed + p.swayOffset) * 0.006;
      p.pos.z += Math.cos(time * p.swaySpeed + p.swayOffset) * 0.004;

      p.rot.x += p.rotSpeed.x;
      p.rot.y += p.rotSpeed.y;
      p.rot.z += p.rotSpeed.z;

      if (p.pos.y < -boundY) {
        p.pos.y = boundY;
        p.pos.x = (Math.random() - 0.5) * boundX * 2;
      }
      if (p.pos.x < -boundX) {
        p.pos.x = boundX;
      }

      dummy.position.copy(p.pos);
      dummy.rotation.copy(p.rot);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeo, undefined, count]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        color="#fb7185"
        emissive="#e11d48"
        emissiveIntensity={0.35}
        roughness={0.35}
        metalness={0.1}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}

// Glowing Fireflies / Warm Bokeh Embers
function GlowingFireflies({ count = 50 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const boundX = Math.max(viewport.width * 1.2, 22);
  const boundY = Math.max(viewport.height * 1.2, 20);

  const [positions, velocities, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * boundX * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * boundY * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      phs[i] = Math.random() * Math.PI * 2;

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.007;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel, phs];
  }, [count, boundX, boundY]);

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.25, "rgba(251, 191, 36, 0.95)");
      grad.addColorStop(0.6, "rgba(244, 63, 94, 0.4)");
      grad.addColorStop(1, "rgba(244, 63, 94, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i) + velocities[i * 3] + Math.sin(time * 0.5 + phases[i]) * 0.003;
      let y = posAttr.getY(i) + velocities[i * 3 + 1] + Math.cos(time * 0.4 + phases[i]) * 0.003;
      let z = posAttr.getZ(i) + velocities[i * 3 + 2];

      if (x > boundX) x = -boundX;
      if (x < -boundX) x = boundX;
      if (y > boundY) y = -boundY;
      if (y < -boundY) y = boundY;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  if (!texture) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.45}
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </points>
  );
}

// Mouse Follow Warm Light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const targetPos = useRef(new THREE.Vector3(0, 0, 2.5));

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPos.current.set(x * 8, y * 5, 2.5);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.lerp(targetPos.current, 0.06);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color="#f43f5e"
      intensity={2.8}
      distance={14}
      decay={2}
    />
  );
}

export function RomanticBackgroundScene() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none -z-10 overflow-hidden">
      {/* Background Photo with Sunset Ambience */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
        style={{ backgroundImage: "url('/couple-sunset-bg.jpg')" }}
      />

      {/* Atmospheric Scrim / Overlay for readability */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          isDark
            ? "bg-black/60 backdrop-blur-[1.5px]"
            : "bg-white/40 backdrop-blur-[1px]"
        }`}
      />

      {/* Subtle vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/50" />

      {/* 3D Floating Petals and Firefly Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        className="w-full h-full"
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none" }}
      >
        <ambientLight intensity={isDark ? 0.9 : 1.4} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={isDark ? 1.0 : 1.6}
          color="#fed7aa"
        />
        <MouseLight />

        {/* 3D Floating Petals */}
        <FloatingPetals count={40} />

        {/* Glowing Fireflies / Stardust */}
        <GlowingFireflies count={55} />
      </Canvas>
    </div>
  );
}

export default RomanticBackgroundScene;
