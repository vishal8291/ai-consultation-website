"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./ScrollProgress";

const PALETTE = ["#0a0a0a", "#404040", "#a3a3a3", "#ffffff"];

function buildPointCloud(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const r = radius * (0.4 + Math.random() * 0.6);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    color.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return { positions, colors };
}

function buildEdges(positions: Float32Array, count: number, maxDist: number, maxSegments: number) {
  const edgePositions: number[] = [];
  let segments = 0;

  for (let i = 0; i < count && segments < maxSegments; i++) {
    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];

    // Sparse nearest-neighbor pass — only check a limited forward window per point.
    const window = Math.min(24, count - i - 1);
    for (let j = 1; j <= window && segments < maxSegments; j++) {
      const idx = i + j;
      const bx = positions[idx * 3];
      const by = positions[idx * 3 + 1];
      const bz = positions[idx * 3 + 2];
      const dist = Math.hypot(ax - bx, ay - by, az - bz);
      if (dist < maxDist) {
        edgePositions.push(ax, ay, az, bx, by, bz);
        segments++;
      }
    }
  }

  return new Float32Array(edgePositions);
}

interface NetworkFieldProps {
  quality: "low" | "high";
}

export default function NetworkField({ quality }: NetworkFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const count = quality === "high" ? 700 : 180;
  const maxSegments = quality === "high" ? 450 : 110;
  const radius = 5.5;

  const { positions, colors, edgePositions } = useMemo(() => {
    const { positions, colors } = buildPointCloud(count, radius);
    const edgePositions = buildEdges(positions, count, radius * 0.35, maxSegments);
    return { positions, colors, edgePositions };
  }, [count, maxSegments]);

  useFrame((state, delta) => {
    const progress = scrollState.progress;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
      groupRef.current.rotation.x = progress * Math.PI * 0.5;
      groupRef.current.rotation.z = progress * Math.PI * 0.15;
    }
    if (state.camera) {
      state.camera.position.z = 6 - progress * 2.5;
      state.camera.position.y = progress * 1.2;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={quality === "high" ? 0.045 : 0.06}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.85}
        />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#a3a3a3"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
