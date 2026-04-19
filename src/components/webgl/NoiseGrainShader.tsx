"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uWarm;
  uniform vec3 uDeep;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float grain = rand(uv * vec2(1920.0, 1080.0) + uTime * 60.0);
    grain = (grain - 0.5) * uIntensity;

    float vignette = smoothstep(0.9, 0.25, distance(uv, vec2(0.5)));
    vec3 warm = mix(uDeep, uWarm, vignette);
    vec3 col = warm + grain;

    gl_FragColor = vec4(col, grain * 0.35 + 0.06);
  }
`;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function GrainPlane({ intensity = 0.5 }: { intensity?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uWarm: { value: new THREE.Color("#d86c3f") },
      uDeep: { value: new THREE.Color("#141210") },
    }),
    [intensity]
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function NoiseGrainShader({
  intensity = 0.5,
  className = "",
  blendMode = "overlay",
}: {
  intensity?: number;
  className?: string;
  blendMode?: React.CSSProperties["mixBlendMode"];
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: blendMode }}
    >
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1], zoom: 1 }}
      >
        <GrainPlane intensity={intensity} />
      </Canvas>
    </div>
  );
}
