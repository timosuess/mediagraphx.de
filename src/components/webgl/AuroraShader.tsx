"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;
  uniform vec3 uD;

  // Classic Simplex-like noise via hashing
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(
      dot(a, hash(i)),
      dot(b, hash(i + o)),
      dot(c, hash(i + 1.0))
    );
    return dot(n, vec3(70.0));
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 3.0;
    p += uMouse * 0.8;

    float t = uTime * 0.08;
    float n1 = noise(p + vec2(t, t * 1.3));
    float n2 = noise(p * 1.8 + vec2(-t * 1.1, t * 0.7));
    float n3 = noise(p * 2.4 + vec2(t * 0.6, -t));

    vec3 col = mix(uA, uB, smoothstep(-0.6, 0.6, n1));
    col = mix(col, uC, smoothstep(-0.5, 0.5, n2) * 0.65);
    col = mix(col, uD, smoothstep(-0.4, 0.7, n3) * 0.45);

    // soft vignette
    float v = smoothstep(1.0, 0.3, distance(uv, vec2(0.5)));
    col *= mix(0.75, 1.05, v);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function AuroraPlane() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uA: { value: new THREE.Color("#f5ede1") },
      uB: { value: new THREE.Color("#f4c95d") },
      uC: { value: new THREE.Color("#d86c3f") },
      uD: { value: new THREE.Color("#b8562e") },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    uniforms.uMouse.value.lerp(new THREE.Vector2(x, y), 0.05);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

export default function AuroraShader({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1], zoom: 1 }}
      >
        <AuroraPlane />
      </Canvas>
    </div>
  );
}
