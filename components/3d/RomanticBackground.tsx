"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Petal shape geometry
function createPetalGeometry() {
  const shape = new THREE.Shape();
  // Delicate curved teardrop/petal shape
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.2, 0.3, 0.4, 0.8, 0.2, 1.2);
  shape.bezierCurveTo(0.0, 1.4, -0.2, 1.2, -0.2, 1.2);
  shape.bezierCurveTo(-0.4, 0.8, -0.2, 0.3, 0, 0);

  const geometry = new THREE.ShapeGeometry(shape, 12);
  // Add slight 3D curve to petal vertices
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

function FloatingPetals({ count = 45 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const petalGeo = useMemo(() => createPetalGeometry(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const petals = useMemo<PetalData[]>(() => {
    const arr: PetalData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 18,
          Math.random() * 20 - 10,
          (Math.random() - 0.5) * 10
        ),
        rot: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.015
        ),
        velocity: new THREE.Vector3(
          -0.005 - Math.random() * 0.01,
          -0.012 - Math.random() * 0.015,
          (Math.random() - 0.5) * 0.005
        ),
        scale: 0.12 + Math.random() * 0.16,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.6 + Math.random() * 0.8,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const p = petals[i];

      // Update position with gentle wind and sine swaying
      p.pos.y += p.velocity.y;
      p.pos.x += p.velocity.x + Math.sin(time * p.swaySpeed + p.swayOffset) * 0.008;
      p.pos.z += Math.cos(time * p.swaySpeed + p.swayOffset) * 0.005;

      // Update tumbling rotation
      p.rot.x += p.rotSpeed.x;
      p.rot.y += p.rotSpeed.y;
      p.rot.z += p.rotSpeed.z + Math.sin(time * 0.5) * 0.005;

      // Wrap around screen boundaries
      if (p.pos.y < -10) {
        p.pos.y = 10;
        p.pos.x = (Math.random() - 0.5) * 18;
      }
      if (p.pos.x < -10) {
        p.pos.x = 10;
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
        emissiveIntensity={0.25}
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
        transparent
        opacity={0.82}
      />
    </instancedMesh>
  );
}

// Glowing Fireflies / Warm Embers
function GlowingFireflies({ count = 50 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales, velocities, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const vel = new Float32Array(count * 3);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      scl[i] = 1.5 + Math.random() * 3.5;
      phs[i] = Math.random() * Math.PI * 2;

      vel[i * 3] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }
    return [pos, scl, vel, phs];
  }, [count]);

  const texture = useMemo(() => {
    // Generate circular soft glow texture dynamically
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(251, 191, 36, 0.9)");
      grad.addColorStop(0.5, "rgba(244, 63, 94, 0.4)");
      grad.addColorStop(1, "rgba(244, 63, 94, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i) + velocities[i * 3] + Math.sin(time * 0.5 + phases[i]) * 0.004;
      let y = posAttr.getY(i) + velocities[i * 3 + 1] + Math.cos(time * 0.4 + phases[i]) * 0.004;
      let z = posAttr.getZ(i) + velocities[i * 3 + 2];

      // Screen boundary wrap
      if (x > 10) x = -10;
      if (x < -10) x = 10;
      if (y > 9) y = -9;
      if (y < -9) y = 9;

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
        size={0.35}
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </points>
  );
}

// Mouse Follow Light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const targetPos = useRef(new THREE.Vector3(0, 0, 3));

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPos.current.set(x * 6, y * 4, 3);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.lerp(targetPos.current, 0.05);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color="#f43f5e"
      intensity={3.5}
      distance={12}
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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Gentle ethereal gradient wash in the background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/20 via-neutral-950/60 to-background"
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/40 via-pink-50/20 to-background"
        }`}
      />

      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={isDark ? 0.7 : 1.2} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={isDark ? 0.8 : 1.5}
          color="#fed7aa"
        />
        <pointLight
          position={[-6, -4, 2]}
          intensity={1.2}
          color="#f43f5e"
        />
        <MouseLight />

        {/* 3D Floating Petals */}
        <FloatingPetals count={40} />

        {/* Glowing Fireflies / Stardust */}
        <GlowingFireflies count={45} />
      </Canvas>
    </div>
  );
}

export default RomanticBackgroundScene;
