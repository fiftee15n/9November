"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type TrimatrikMode = "spatial" | "layered" | "wireframe";
export type TrimatrikLighting = "sunset" | "twilight" | "afternoon";

interface TrimatrikSceneProps {
  mode: TrimatrikMode;
  depthScale: number;
  lighting: TrimatrikLighting;
  autoRotate: boolean;
  showParticles: boolean;
  cameraResetTrigger: number;
}

// Aspect ratio of the original 1670 x 941 image
const ASPECT = 1670 / 941;
const PLANE_HEIGHT = 4.2;
const PLANE_WIDTH = PLANE_HEIGHT * ASPECT; // ~7.45

/**
 * Spatial Displaced Mesh: Displaces geometry with depth map to pop out the couple in 3D
 */
function SpatialMesh({
  depthScale,
  wireframe,
}: {
  depthScale: number;
  wireframe: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load color and depth textures
  const [colorMap, depthMap] = useTexture([
    "/bench-sunset-3d.png",
    "/bench-sunset-depth.png",
  ]);

  useEffect(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.minFilter = THREE.LinearMipmapLinearFilter;
    colorMap.magFilter = THREE.LinearFilter;
    colorMap.generateMipmaps = true;

    depthMap.minFilter = THREE.LinearFilter;
    depthMap.magFilter = THREE.LinearFilter;
  }, [colorMap, depthMap]);

  // Subtle breathing animation
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.03;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      {/* 256x256 dense grid geometry for smooth 3D relief displacement */}
      <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, 220, 220]} />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={depthMap}
        displacementScale={depthScale}
        displacementBias={-depthScale * 0.1}
        roughness={0.65}
        metalness={0.08}
        wireframe={wireframe}
        wireframeLinewidth={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Layered Diorama: Background sunset plane with separate 3D couple cutout floating in front
 */
function LayeredDiorama({ depthScale }: { depthScale: number }) {
  const bgRef = useRef<THREE.Mesh>(null);
  const fgRef = useRef<THREE.Mesh>(null);

  const [bgMap, coupleMap, depthMap] = useTexture([
    "/bench-sunset-3d.png",
    "/couple-cutout-aligned.png",
    "/bench-sunset-depth.png",
  ]);

  useEffect(() => {
    bgMap.colorSpace = THREE.SRGBColorSpace;
    coupleMap.colorSpace = THREE.SRGBColorSpace;
    coupleMap.premultiplyAlpha = false;
  }, [bgMap, coupleMap]);

  // Subtle organic float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (fgRef.current) {
      fgRef.current.position.y = Math.sin(t * 1.0) * 0.04;
      fgRef.current.position.x = Math.cos(t * 0.7) * 0.02;
    }
  });

  const coupleExtrusion = Math.max(0.15, depthScale * 0.45);

  return (
    <group position={[0, 0, 0]}>
      {/* Background Lake Sunset Plane */}
      <mesh ref={bgRef} position={[0, 0, -0.65]} receiveShadow>
        <planeGeometry args={[PLANE_WIDTH * 1.08, PLANE_HEIGHT * 1.08, 32, 32]} />
        <meshStandardMaterial
          map={bgMap}
          roughness={0.8}
          metalness={0.02}
        />
      </mesh>

      {/* Foreground 3D Couple Cutout */}
      <mesh
        ref={fgRef}
        position={[0, 0, coupleExtrusion]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, 160, 160]} />
        <meshStandardMaterial
          map={coupleMap}
          displacementMap={depthMap}
          displacementScale={depthScale * 0.35}
          transparent
          alphaTest={0.05}
          roughness={0.55}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Floating 3D golden dust motes & romantic fireflies in sunset atmosphere
 */
function SunsetParticles({ count = 55 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 9,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 3 + 0.5,
        vx: (Math.random() - 0.5) * 0.005,
        vy: Math.random() * 0.008 + 0.003,
        vz: (Math.random() - 0.5) * 0.004,
        scale: Math.random() * 0.035 + 0.015,
        pulseSpeed: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      p.x += p.vx + Math.sin(time + p.phase) * 0.003;
      p.y += p.vy;
      p.z += p.vz;

      // Wrap around bounds
      if (p.y > 3) p.y = -3;
      if (p.x > 5) p.x = -5;
      if (p.x < -5) p.x = 5;

      const currentScale = p.scale * (0.8 + 0.3 * Math.sin(time * p.pulseSpeed + p.phase));

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial
        color="#ffcc66"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

/**
 * Lighting presets and mouse light
 */
function SceneLighting({ lighting }: { lighting: TrimatrikLighting }) {
  const mouseLightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (mouseLightRef.current) {
      mouseLightRef.current.position.x = (mouse.x * viewport.width) / 2.5;
      mouseLightRef.current.position.y = (mouse.y * viewport.height) / 2.5;
    }
  });

  const config = useMemo(() => {
    switch (lighting) {
      case "twilight":
        return {
          sunColor: "#f472b6",
          sunIntensity: 1.4,
          sunPos: [-6, 0.5, 3] as [number, number, number],
          ambientColor: "#673ab7",
          ambientIntensity: 0.9,
          rimColor: "#38bdf8",
        };
      case "afternoon":
        return {
          sunColor: "#fffbeb",
          sunIntensity: 2.0,
          sunPos: [-4, 3, 4] as [number, number, number],
          ambientColor: "#fed7aa",
          ambientIntensity: 1.2,
          rimColor: "#fef08a",
        };
      case "sunset":
      default:
        return {
          sunColor: "#ff9233",
          sunIntensity: 2.2,
          sunPos: [-7, 0.2, 4.5] as [number, number, number],
          ambientColor: "#fde68a",
          ambientIntensity: 1.1,
          rimColor: "#fdba74",
        };
    }
  }, [lighting]);

  return (
    <>
      <ambientLight color={config.ambientColor} intensity={config.ambientIntensity} />

      {/* Main setting sun from the left lake horizon */}
      <directionalLight
        position={config.sunPos}
        intensity={config.sunIntensity}
        color={config.sunColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Rim light from right tree side */}
      <directionalLight
        position={[6, 2, 2]}
        intensity={0.6}
        color={config.rimColor}
      />

      {/* Interactive mouse cursor specular light */}
      <pointLight
        ref={mouseLightRef}
        position={[0, 0, 3]}
        intensity={0.7}
        color="#ffeedd"
        distance={7}
      />
    </>
  );
}

/**
 * Main 3D Scene Controller
 */
export function TrimatrikScene({
  mode,
  depthScale,
  lighting,
  autoRotate,
  showParticles,
  cameraResetTrigger,
}: TrimatrikSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  // Handle camera reset
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      camera.position.set(0, 0, 5.2);
    }
  }, [cameraResetTrigger, camera]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        minDistance={3.2}
        maxDistance={7.5}
        // Limit rotation angles so the scene remains frontal diorama style
        maxAzimuthAngle={Math.PI / 3.5}
        minAzimuthAngle={-Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.5}
      />

      <SceneLighting lighting={lighting} />

      {mode === "layered" ? (
        <LayeredDiorama depthScale={depthScale} />
      ) : (
        <SpatialMesh
          depthScale={depthScale}
          wireframe={mode === "wireframe"}
        />
      )}

      {showParticles && <SunsetParticles count={50} />}
    </>
  );
}

export default TrimatrikScene;
