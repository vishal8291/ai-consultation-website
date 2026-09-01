"use client";

import { Canvas } from "@react-three/fiber";
import NetworkField from "./NetworkField";

interface SceneCanvasProps {
  quality: "low" | "high";
}

export default function SceneCanvas({ quality }: SceneCanvasProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={quality === "high" ? [1, 1.5] : [1, 1]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 50 }}
        frameloop="always"
      >
        <NetworkField quality={quality} />
      </Canvas>
    </div>
  );
}
