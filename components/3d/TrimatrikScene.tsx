"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type TrimatrikLighting = "sunset" | "twilight";

interface TrimatrikSceneProps {
  autoRotate: boolean;
  showParticles: boolean;
  lighting: TrimatrikLighting;
  cameraResetTrigger: number;
}

// Aspect ratio for the couple cutout plane (1670 x 941 original)
const COUPLE_HEIGHT = 2.75;
const COUPLE_WIDTH = COUPLE_HEIGHT * (1670 / 941); // ~4.88

/**
 * Creates high-res canvas texture for a Bengali letter clay tablet
 */
function createGlyphTexture(char: string, bgColor: string, fgColor: string = "#fef3c7"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 192;
  const ctx = canvas.getContext("2d")!;

  // Smooth circular clay tablet background
  const cx = 96;
  const cy = 96;
  const radius = 86;

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = bgColor;
  ctx.fill();

  // Bevel border highlight
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 5;
  ctx.stroke();

  // Bengali letter
  ctx.font = "bold 96px 'Hind Siliguri', 'Tiro Bangla', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = fgColor;
  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 8;
  ctx.fillText(char, cx, cy + 8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates texture for the 3D diorama front nameplate plaque
 */
function createNameplateTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 144;
  const ctx = canvas.getContext("2d")!;

  // Dark mahogany / bronze plaque with golden rim
  ctx.fillStyle = "rgba(26, 17, 14, 0.94)";
  ctx.beginPath();
  ctx.roundRect(8, 8, 496, 128, 16);
  ctx.fill();

  ctx.strokeStyle = "rgba(245, 158, 11, 0.55)";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Title in Bengali
  ctx.font = "bold 42px 'Hind Siliguri', 'Tiro Bangla', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fef3c7";
  ctx.shadowColor = "rgba(245, 158, 11, 0.5)";
  ctx.shadowBlur = 10;
  ctx.fillText("তুমি ও আমি • আমাদের গল্প", 256, 56);

  // Subtitle
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#f59e0b";
  ctx.shadowBlur = 0;
  ctx.fillText("9 NOVEMBER • FOREVER TOGETHER", 256, 102);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates soft radial contact shadow texture for stage base
 */
function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(128, 128, 30, 128, 128, 126);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.7)");
  gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.35)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates radial sunset aura glow sprite texture
 */
function createSunAuraTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 170, 60, 0.9)");
  gradient.addColorStop(0.4, "rgba(255, 120, 50, 0.35)");
  gradient.addColorStop(1, "rgba(255, 80, 40, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Falling 3D Bengali Letter Glyphs (Amar Lipi signature feature)
 */
function FallingBengaliGlyphs() {
  const glyphData = useMemo(() => {
    // Selection of romantic Bengali words & letters
    const characters = [
      { char: "তু", bg: "#9f2241" }, // Rose clay
      { char: "মি", bg: "#7c2d12" }, // Warm terracotta
      { char: "হৃ", bg: "#831843" }, // Crimson wine
      { char: "দ", bg: "#581c87" },  // Twilight purple
      { char: "য়", bg: "#9a3412" },  // Amber clay
      { char: "আ", bg: "#854d0e" },  // Golden ochre
      { char: "মি", bg: "#9f1239" }, // Rose clay
      { char: "ভা", bg: "#1e3a5f" }, // Deep dusk blue
      { char: "লো", bg: "#365314" }, // Forest clay
      { char: "বা", bg: "#991b1b" }, // Crimson
      { char: "সা", bg: "#78350f" }, // Warm bronze
      { char: "স্মৃ", bg: "#86198f" }, // Royal violet
      { char: "তি", bg: "#b45309" }, // Sunset gold
    ];

    return characters.map((c, i) => {
      const texture = createGlyphTexture(c.char, c.bg);
      const angle = (i / characters.length) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 2.2;
      return {
        texture,
        x: Math.cos(angle) * radius,
        y: 1.5 + Math.random() * 4.5,
        z: Math.sin(angle) * radius,
        vy: 0.22 + Math.random() * 0.28,
        rotSpeedX: (Math.random() - 0.5) * 1.2,
        rotSpeedY: (Math.random() - 0.5) * 1.5,
        rotSpeedZ: (Math.random() - 0.5) * 1.0,
        driftPhase: Math.random() * Math.PI * 2,
        driftAmp: 0.2 + Math.random() * 0.3,
        scale: 0.75 + Math.random() * 0.3,
      };
    });
  }, []);

  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    glyphData.forEach((glyph, i) => {
      const group = groupRefs.current[i];
      if (!group) return;

      // Fall downwards with slight wind flutter
      glyph.y -= glyph.vy * delta * 2.2;
      const flutterX = Math.sin(time * 1.2 + glyph.driftPhase) * glyph.driftAmp * delta;
      const flutterZ = Math.cos(time * 0.9 + glyph.driftPhase) * glyph.driftAmp * delta;

      glyph.x += flutterX;
      glyph.z += flutterZ;

      // Rotation around multiple axes
      group.rotation.x += glyph.rotSpeedX * delta;
      group.rotation.y += glyph.rotSpeedY * delta;
      group.rotation.z += glyph.rotSpeedZ * delta;

      // Loop back to the sky when reaching floor level
      if (glyph.y < -1.8) {
        glyph.y = 4.2 + Math.random() * 2.0;
        const angle = Math.random() * Math.PI * 2;
        const radius = 2.0 + Math.random() * 2.2;
        glyph.x = Math.cos(angle) * radius;
        glyph.z = Math.sin(angle) * radius;
      }

      group.position.set(glyph.x, glyph.y, glyph.z);
    });
  });

  return (
    <group>
      {glyphData.map((glyph, i) => (
        <group
          key={i}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
          scale={[glyph.scale, glyph.scale, glyph.scale]}
        >
          {/* Dual-sided thin circular clay tablet */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.035, 32]} />
            <meshStandardMaterial
              map={glyph.texture}
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Falling soft rose petals drifting gently through 3D air
 */
function FallingRosePetals({ count = 22 }: { count?: number }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 3.0;
      return {
        x: Math.cos(angle) * radius,
        y: Math.random() * 5.0,
        z: Math.sin(angle) * radius,
        vy: 0.18 + Math.random() * 0.22,
        wobbleFreq: 1.5 + Math.random() * 2.0,
        wobblePhase: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 2.0,
        scale: 0.8 + Math.random() * 0.4,
        color: Math.random() > 0.4 ? "#f43f5e" : "#fb7185",
      };
    });
  }, [count]);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    petals.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      p.y -= p.vy * delta * 2.0;
      p.x += Math.sin(time * p.wobbleFreq + p.wobblePhase) * 0.015;
      p.z += Math.cos(time * p.wobbleFreq * 0.8 + p.wobblePhase) * 0.015;

      mesh.rotation.x += delta * p.rotSpeed;
      mesh.rotation.y += delta * (p.rotSpeed * 0.7);
      mesh.rotation.z = Math.sin(time * 2.0 + p.wobblePhase) * 0.5;

      if (p.y < -1.8) {
        p.y = 4.0 + Math.random() * 2.0;
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.0 + Math.random() * 3.0;
        p.x = Math.cos(angle) * radius;
        p.z = Math.sin(angle) * radius;
      }

      mesh.position.set(p.x, p.y, p.z);
    });
  });

  return (
    <group>
      {petals.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          scale={[p.scale, p.scale, p.scale]}
        >
          {/* Curved petal geometry */}
          <planeGeometry args={[0.16, 0.22, 4, 4]} />
          <meshStandardMaterial
            color={p.color}
            roughness={0.65}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Golden sunset firefly sparks floating around the pedestal
 */
function SunsetEmbers({ count = 35 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const embers = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 7.5,
      y: (Math.random() - 0.5) * 4.0 + 0.5,
      z: (Math.random() - 0.5) * 5.0,
      vy: 0.006 + Math.random() * 0.008,
      vx: (Math.random() - 0.5) * 0.006,
      scale: 0.018 + Math.random() * 0.024,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    embers.forEach((e, i) => {
      e.y += e.vy;
      e.x += e.vx + Math.sin(time * 1.5 + e.phase) * 0.004;

      if (e.y > 3.2) e.y = -1.8;
      if (e.x > 4.5) e.x = -4.5;
      if (e.x < -4.5) e.x = 4.5;

      const currentScale = e.scale * (0.8 + 0.4 * Math.sin(time * 3.0 + e.phase));
      dummy.position.set(e.x, e.y, e.z);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#fbbf24"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

/**
 * Tactile Stage Base / Diorama Pedestal (Amar Lipi style plaza)
 */
function DioramaPedestal() {
  const nameplateTexture = useMemo(() => createNameplateTexture(), []);
  const contactShadowTexture = useMemo(() => createContactShadowTexture(), []);

  return (
    <group position={[0, -1.35, 0]}>
      {/* Soft Contact Drop Shadow on floor */}
      <mesh position={[0, -0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.5, 9.5]} />
        <meshBasicMaterial
          map={contactShadowTexture}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </mesh>

      {/* Tier 1: Outer clay foundation base */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[3.8, 4.0, 0.22, 64]} />
        <meshStandardMaterial
          color="#22181b"
          roughness={0.92}
          metalness={0.02}
        />
      </mesh>

      {/* Tier 2: Main wooden park promenade deck where the bench rests */}
      <mesh position={[0, 0.0, 0]} receiveShadow>
        <cylinderGeometry args={[3.55, 3.55, 0.24, 64]} />
        <meshStandardMaterial
          color="#38231a"
          roughness={0.72}
          metalness={0.05}
        />
      </mesh>

      {/* Tier 3: Inlaid warm sunset promenade disc */}
      <mesh position={[0, 0.125, 0]} receiveShadow>
        <cylinderGeometry args={[3.38, 3.38, 0.03, 64]} />
        <meshStandardMaterial
          color="#42291c"
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>

      {/* Glowing bronze outer rim ring */}
      <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.39, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#d97706"
          roughness={0.4}
          metalness={0.6}
          emissive="#78350f"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Front 3D Nameplate Plaque (like "আমার লিপি" on Amar Lipi floor) */}
      <group position={[0, 0.16, 2.95]} rotation={[-0.32, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.65, 0.08]} />
          <meshStandardMaterial
            map={nameplateTexture}
            roughness={0.4}
            metalness={0.25}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 3D Couple on the Bench Figurine with Depth Displacement
 */
function CoupleFigurine() {
  const groupRef = useRef<THREE.Group>(null);

  const [coupleMap, depthMap] = useTexture([
    "/couple-cutout-aligned.png",
    "/bench-sunset-depth.png",
  ]);

  useEffect(() => {
    coupleMap.colorSpace = THREE.SRGBColorSpace;
    coupleMap.minFilter = THREE.LinearMipmapLinearFilter;
    coupleMap.magFilter = THREE.LinearFilter;
    coupleMap.premultiplyAlpha = false;

    depthMap.minFilter = THREE.LinearFilter;
    depthMap.magFilter = THREE.LinearFilter;
  }, [coupleMap, depthMap]);

  // Subtle organic float / breathing
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = -0.08 + Math.sin(t * 0.9) * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -0.08, 0.1]}>
      {/* Front 3D Displaced Relief Mesh */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[COUPLE_WIDTH, COUPLE_HEIGHT, 200, 200]} />
        <meshStandardMaterial
          map={coupleMap}
          displacementMap={depthMap}
          displacementScale={0.36}
          displacementBias={-0.06}
          roughness={0.58}
          metalness={0.08}
          transparent
          alphaTest={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tactile backing silhouette to give figurine depth from side angles */}
      <mesh position={[0, 0, -0.04]} castShadow receiveShadow>
        <planeGeometry args={[COUPLE_WIDTH, COUPLE_HEIGHT, 40, 40]} />
        <meshStandardMaterial
          map={coupleMap}
          color="#1e1619"
          roughness={0.88}
          metalness={0.0}
          transparent
          alphaTest={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Curved Sunset Lake Backdrop Arch & Sun Halo (Amar Lipi sun halo style)
 */
function SunsetBackdropArch() {
  const [bgMap] = useTexture(["/bench-sunset-3d.png"]);
  const sunAuraTexture = useMemo(() => createSunAuraTexture(), []);

  useEffect(() => {
    bgMap.colorSpace = THREE.SRGBColorSpace;
    bgMap.minFilter = THREE.LinearMipmapLinearFilter;
    bgMap.magFilter = THREE.LinearFilter;
  }, [bgMap]);

  return (
    <group position={[0, 0.35, -1.25]}>
      {/* Golden Sunset Aura Sprite behind the arch */}
      <sprite position={[-0.4, 0.5, -0.1]} scale={[7.0, 7.0, 1]}>
        <spriteMaterial
          map={sunAuraTexture}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Sunset Lake Portal Disc */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[2.45, 64]} />
        <meshStandardMaterial
          map={bgMap}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* Golden Halo Ring around the Sunset Disc */}
      <mesh position={[0, 0, 0.02]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.48, 0.045, 16, 64]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.3}
          metalness={0.5}
          emissive="#d97706"
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  );
}

/**
 * Lighting presets matching Amar Lipi's warm clay & sunset palette
 */
function SceneLighting({ lighting }: { lighting: TrimatrikLighting }) {
  const mouseLightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (mouseLightRef.current) {
      mouseLightRef.current.position.x = (mouse.x * viewport.width) / 2.2;
      mouseLightRef.current.position.y = (mouse.y * viewport.height) / 2.2;
    }
  });

  const isSunset = lighting === "sunset";

  return (
    <>
      {/* Ambient Fill */}
      <ambientLight
        color={isSunset ? "#fed7aa" : "#e0e7ff"}
        intensity={isSunset ? 0.95 : 0.75}
      />

      {/* Main Setting Sun from left lake horizon */}
      <directionalLight
        position={[-8, 2.2, 4.5]}
        intensity={isSunset ? 2.5 : 1.8}
        color={isSunset ? "#ff9933" : "#f472b6"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />

      {/* Soft Rim Light from right side to catch silhouette edges */}
      <directionalLight
        position={[6, 3, -3.5]}
        intensity={isSunset ? 1.2 : 1.4}
        color={isSunset ? "#f43f5e" : "#38bdf8"}
      />

      {/* Front subtle keylight */}
      <directionalLight
        position={[0, 4, 6]}
        intensity={0.45}
        color="#fffbeb"
      />

      {/* Interactive mouse specular highlight */}
      <pointLight
        ref={mouseLightRef}
        position={[0, 0, 3.5]}
        intensity={0.6}
        color="#ffeedd"
        distance={8}
      />
    </>
  );
}

/**
 * Main Trimatrik 3D Scene Controller
 */
export function TrimatrikScene({
  autoRotate,
  showParticles,
  lighting,
  cameraResetTrigger,
}: TrimatrikSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  // Handle Home / Reset Camera action
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      camera.position.set(0, 0.4, 5.6);
      controlsRef.current.target.set(0, -0.1, 0);
      controlsRef.current.update();
    }
  }, [cameraResetTrigger, camera]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        minDistance={3.8}
        maxDistance={8.5}
        maxPolarAngle={1.44} // Clamped right above horizontal to prevent clipping under floor
        minPolarAngle={0.7}  // Clamped so user can view from romantic overhead perspective
        enablePan={false}
      />

      <SceneLighting lighting={lighting} />

      {/* Full 3D Diorama Stage */}
      <group position={[0, 0, 0]}>
        <DioramaPedestal />
        <SunsetBackdropArch />
        <CoupleFigurine />
      </group>

      {/* Falling 3D Bengali Letters & Rose Petals */}
      {showParticles && (
        <>
          <FallingBengaliGlyphs />
          <FallingRosePetals count={20} />
          <SunsetEmbers count={35} />
        </>
      )}
    </>
  );
}

export default TrimatrikScene;
