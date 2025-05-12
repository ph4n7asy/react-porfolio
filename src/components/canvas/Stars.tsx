import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
import styled from "styled-components";
const random = require('maath/random/dist/maath-random.esm') as {
  inSphere: (array: Float32Array, options?: { radius?: number }) => Float32Array;
};

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  inset: 0;
`;

const Stars: React.FC = () => {
  const ref = useRef<THREE.Points>(null);

  const sphere = useMemo(() =>
          random.inSphere(new Float32Array(1000), { radius: 1.2 }),
      []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
            transparent
            color="#f272c8"
            size={0.002}
            sizeAttenuation={true}
            depthWrite={false}
        />
      </Points>
  );
};

const StarsCanvas: React.FC = () => {
  return (
      <StyledCanvasWrapper>
        <Canvas
            camera={{ position: [0, 0, 1] }}
            gl={{
              antialias: false,
              powerPreference: "low-power"
            }}
            dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
          <Preload all />
        </Canvas>
      </StyledCanvasWrapper>
  );
};

export default React.memo(StarsCanvas);