"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

/**
 * The couple figurine PNG mapped onto a plane in 3D space.
 * No displacement, no modifications — the texture is used exactly as-is.
 */
function CouplePlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useTexture("/couple-3d-figurine.png");

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.premultiplyAlpha = false;
  }, [texture]);

  // Get actual image dimensions to preserve aspect ratio
  const img = texture.image as HTMLImageElement | undefined;
  const aspect = img ? img.width / img.height : 1;

  const planeHeight = 4.8;
  const planeWidth = planeHeight * aspect;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.01}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * Minimal scene: just the figurine, white background, orbit controls.
 * No buttons, no text, no icons — user drags to rotate.
 */
export function TrimatrikScene() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { gl } = useThree();

  // Make the WebGL canvas background pure white
  useEffect(() => {
    gl.setClearColor(new THREE.Color("#ffffff"), 1);
  }, [gl]);

  return (
    <>
      {/* Soft ambient light so the texture looks exactly like the original PNG */}
      <ambientLight intensity={1.6} />

      <CouplePlane />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        // Clamp so it stays mostly frontal — can swing side-to-side and tilt slightly
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export default TrimatrikScene;
