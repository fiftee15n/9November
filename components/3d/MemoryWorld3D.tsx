"use client";

import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";

export interface MemoryData {
  id: string;
  step: string;
  category: string;
  title: string;
  location: string;
  date: string;
  story: string;
  image: string;
  accent: string;
}

const MEMORIES: MemoryData[] = [
  {
    id: "spot-1",
    step: "০১",
    category: "সূচনা ও প্রথম স্পর্শ",
    title: "প্রথম হাত ধরা",
    location: "ফার্মগেট",
    date: "০৯ নভেম্বর",
    story: "শহরের শত ব্যস্ততার মাঝে একটি শান্ত মুহূর্ত—প্রথমবার যখন তোমার হাতটা ধরেছিলাম, মনে হয়েছিল এই পথ যেন কখনো শেষ না হয়।",
    image: "/memories/memory-2.jpg",
    accent: "#f43f5e",
  },
  {
    id: "spot-2",
    step: "০২",
    category: "বিকেলের আলাপ ও নির্জনতা",
    title: "টিএসসির বিকেল",
    location: "টিএসসি চত্বর",
    date: "নভেম্বর ২০২৪",
    story: "গাছের ছায়ায়, ইটের বেদিতে বসে ঘণ্টার পর ঘণ্টা কথা। তোমার প্রতিটি হাসিতে হারিয়ে যাওয়া ছিল আমার সবচেয়ে প্রিয় অনুভূতি।",
    image: "/memories/memory-4.jpg",
    accent: "#10b981",
  },
  {
    id: "spot-3",
    step: "০৩",
    category: "স্নিগ্ধতা ও মায়ার বাঁধন",
    title: "চোখের মায়ায় হারিয়ে",
    location: "সবুজের প্রান্তর",
    date: "স্মৃতির অ্যালবাম",
    story: "খোলা বাতাসের স্নিগ্ধতা আর তোমার চোখের গভীরতা—যেখানে কোনো শব্দের প্রয়োজন ছিল না, শুধু হৃদয়ের নীরব বোঝাপড়া।",
    image: "/memories/memory-3.jpg",
    accent: "#06b6d4",
  },
  {
    id: "spot-4",
    step: "০৪",
    category: "চিরন্তন নির্ভরতা",
    title: "উষ্ণ আলিঙ্গন",
    location: "উত্তরা",
    date: "বিশেষ মুহূর্ত",
    story: "দিনের শেষে সকল ক্লান্তি ভুলে তোমার মিষ্টি সান্নিধ্যে খুঁজে পাওয়া অসীম প্রশান্তি ও আজীবন নির্ভরতার আশ্রয়।",
    image: "/memories/memory-1.jpg",
    accent: "#a855f7",
  },
  {
    id: "spot-5",
    step: "০৫",
    category: "আমাদের পূর্ণতা",
    title: "ঐতিহ্যের আঙিনায়",
    location: "ঐতিহাসিক প্রাঙ্গণ",
    date: "আমাদের দিন",
    story: "ঐতিহ্যের রাজসিক আবহে রঙিন সাজে তুমি আর আমি। দুজনে মিলে এক নতুন স্বপ্নের সূচনা, চিরদিনের অঙ্গীকার।",
    image: "/memories/memory-5.jpg",
    accent: "#f59e0b",
  },
];

// 3D Spatial positions arranged in an organic gentle arc
const SPOT_POSITIONS: { pos: [number, number, number]; rot: [number, number, number] }[] = [
  { pos: [-3.4, 0.2, 0.4], rot: [0, 0.28, 0] },
  { pos: [-1.7, -0.1, -0.2], rot: [0, 0.12, 0] },
  { pos: [0, 0.35, -0.6], rot: [0, 0, 0] },
  { pos: [1.7, -0.1, -0.2], rot: [0, -0.12, 0] },
  { pos: [3.4, 0.2, 0.4], rot: [0, -0.28, 0] },
];

function MemoryCard3D({
  memory,
  index,
  activeIdx,
  onSelect,
}: {
  memory: MemoryData;
  index: number;
  activeIdx: number;
  onSelect: (idx: number) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useTexture(memory.image);
  const [hovered, setHovered] = useState(false);

  const isSelected = activeIdx === index;
  const spot = SPOT_POSITIONS[index];

  const basePos = useMemo(() => new THREE.Vector3(...spot.pos), [spot.pos]);
  const baseRot = useMemo(() => new THREE.Euler(...spot.rot), [spot.rot]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Floating breathing motion
    const floatY = Math.sin(time * 1.6 + index * 1.3) * 0.07;
    const targetY = basePos.y + floatY + (isSelected ? 0.2 : hovered ? 0.1 : 0);
    const targetZ = basePos.z + (isSelected ? 0.7 : hovered ? 0.35 : 0);

    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 4, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 4, delta);
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, basePos.x, 4, delta);

    // Interactive mouse tilt
    const targetRotY = isSelected ? 0 : baseRot.y + (hovered ? (state.pointer.x * 0.2) : 0);
    const targetRotX = isSelected ? 0 : baseRot.x + (hovered ? (-state.pointer.y * 0.2) : 0);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 5, delta);
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 5, delta);

    // Dynamic scale
    const targetScale = isSelected ? 1.18 : hovered ? 1.06 : 0.96;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 6, delta)
    );
  });

  return (
    <group
      ref={meshRef}
      position={[spot.pos[0], spot.pos[1], spot.pos[2]]}
      rotation={[spot.rot[0], spot.rot[1], spot.rot[2]]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Floating Ethereal Aura */}
      {(isSelected || hovered) && (
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[2.2, 2.8]} />
          <meshBasicMaterial
            color={memory.accent}
            transparent
            opacity={isSelected ? 0.35 : 0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Floating Photo Canvas without ugly box borders */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.75, 2.2]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Delicate floating glowing halo outline */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.76, 2.21)]} />
        <lineBasicMaterial
          color={isSelected ? memory.accent : "#ffffff"}
          transparent
          opacity={isSelected ? 0.9 : 0.25}
        />
      </lineSegments>

      {/* Floating Step Number */}
      <group position={[-0.7, 0.9, 0.05]}>
        <mesh>
          <circleGeometry args={[0.15, 24]} />
          <meshBasicMaterial color={memory.accent} />
        </mesh>
      </group>
    </group>
  );
}

// 3D Glowing Walking Path Spline
function WalkingPath() {
  const curve = useMemo(() => {
    const points = SPOT_POSITIONS.map((s) => new THREE.Vector3(s.pos[0], s.pos[1] - 1.25, s.pos[2]));
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const lineGeo = useMemo(() => {
    const pts = curve.getPoints(80);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [curve]);

  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!pulseRef.current) return;
    const t = (state.clock.getElapsedTime() * 0.12) % 1;
    const pt = curve.getPoint(t);
    pulseRef.current.position.copy(pt);
  });

  return (
    <group>
      <primitive
        object={
          new THREE.Line(
            lineGeo,
            new THREE.LineBasicMaterial({
              color: "#fb7185",
              transparent: true,
              opacity: 0.35,
            })
          )
        }
      />
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color="#f43f5e"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function CameraController({ activeIdx }: { activeIdx: number }) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 4.4));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const spot = SPOT_POSITIONS[activeIdx];
    if (spot) {
      targetCamPos.current.set(spot.pos[0] * 0.75, spot.pos[1] + 0.1, 3.6);
      targetLookAt.current.set(spot.pos[0], spot.pos[1] + 0.1, spot.pos[2]);
    }
  }, [activeIdx]);

  useFrame((_, delta) => {
    camera.position.lerp(targetCamPos.current, 3.5 * delta);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

export function MemoryWorld3D({
  activeIdx,
  onSelectSpot,
  onOpenLightbox,
}: {
  activeIdx: number;
  onSelectSpot: (idx: number) => void;
  onOpenLightbox: () => void;
}) {
  const activeSpot = MEMORIES[activeIdx];

  return (
    <div className="relative w-full my-6">
      {/* 3D WebGL Canvas without any box container or borders - completely open to background */}
      <div className="relative h-[380px] sm:h-[440px] w-full">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 6, 4]} intensity={1.4} color="#fff" />
          <pointLight position={[-4, 3, 2]} intensity={2.0} color={activeSpot.accent} />
          <pointLight position={[4, -2, 2]} intensity={1.2} color="#fda4af" />

          <Suspense fallback={null}>
            <WalkingPath />

            {MEMORIES.map((m, idx) => (
              <MemoryCard3D
                key={m.id}
                memory={m}
                index={idx}
                activeIdx={activeIdx}
                onSelect={onSelectSpot}
              />
            ))}

            <CameraController activeIdx={activeIdx} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.4}
            maxAzimuthAngle={Math.PI / 6}
            minAzimuthAngle={-Math.PI / 6}
            rotateSpeed={0.4}
          />
        </Canvas>
      </div>

      {/* Floating Story Card Overlay below the 3D Canvas */}
      <div className="relative mx-auto mt-2 max-w-xl text-center px-4">
        <div className="inline-flex items-center gap-2 mb-2">
          <span
            className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800"
            style={{ color: activeSpot.accent }}
          >
            স্পট {activeSpot.step} • {activeSpot.location}
          </span>
          <span className="text-[11px] text-neutral-400 font-mono">
            {activeSpot.date}
          </span>
        </div>

        <h3
          className="text-lg sm:text-xl font-bold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
        >
          {activeSpot.title}
        </h3>

        <p
          className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
          style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
        >
          "{activeSpot.story}"
        </p>

        {/* Milestone Steps Bar */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {MEMORIES.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectSpot(i)}
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                activeIdx === i
                  ? "bg-foreground text-background shadow-md scale-105"
                  : "bg-neutral-100 dark:bg-neutral-900/80 text-neutral-500 hover:text-foreground border border-neutral-200/40 dark:border-neutral-800"
              }`}
              style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
            >
              <span className="font-mono font-bold text-[10px]">{m.step}</span>
              <span className="hidden sm:inline font-medium">{m.location}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenLightbox}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-medium transition-colors"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            পূর্ণাঙ্গ দেখুন ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemoryWorld3D;
