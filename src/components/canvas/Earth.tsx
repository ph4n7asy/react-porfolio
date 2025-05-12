import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

interface EarthProps {
    scale?: number;
    positionY?: number;
    rotationY?: number;
}

interface EarthCanvasProps {
    fov?: number;
    near?: number;
    far?: number;
    cameraPosition?: [number, number, number];
    autoRotate?: boolean;
    enableZoom?: boolean;
}

const Earth: React.FC<EarthProps> = ({
         scale = 3,
         positionY = 0,
         rotationY = 0,
     }) => {
    const earth = useGLTF("./planet/scene.gltf") as {
        scene: THREE.Group;
    };

    // @ts-ignore
    return <primitive
        object={earth.scene}
        scale={scale}
        position-y={positionY}
        rotation-y={rotationY}
    />;
};

const EarthCanvas: React.FC<EarthCanvasProps> = ({
         fov = 45,
         near = 0.1,
         far = 200,
         cameraPosition = [-4, 3, 6],
         autoRotate = true,
         enableZoom = false,
     }) => {
    return (
        <Canvas
            shadows
            frameloop="demand"
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov,
                near,
                far,
                position: cameraPosition,
            }}
        >
            <Suspense fallback={null}>
                <OrbitControls
                    autoRotate={autoRotate}
                    enableZoom={enableZoom}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Earth />
                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default EarthCanvas;