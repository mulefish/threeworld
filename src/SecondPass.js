import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";

import "./styles.css";

// Geometry
function GroundPlane() {
    return (
        <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
            <planeBufferGeometry attach="geometry" args={[500, 500]} />
            <meshStandardMaterial attach="material" color="white" />
        </mesh>
    );
}
function BackDrop() {
    return (
        <mesh receiveShadow position={[0, -1, -5]}>
            <planeBufferGeometry attach="geometry" args={[500, 500]} />
            <meshStandardMaterial attach="material" color="white" />
        </mesh>
    );
}
function Sphere() {
    return (
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[1, 16, 16]} />
            <meshStandardMaterial
                attach="material"
                color="white"
                transparent
                roughness={0.1}
                metalness={0.1}
            />
        </mesh>
    );
}

// Lights
function KeyLight({ brightness, color }) {
    return (
        <rectAreaLight
            width={3}
            height={3}
            color={color}
            intensity={brightness}
            position={[-2, 0, 5]}
            lookAt={[0, 0, 0]}
            penumbra={1}
            castShadow
        />
    );
}
function FillLight({ brightness, color }) {
    return (
        <rectAreaLight
            width={3}
            height={3}
            intensity={brightness}
            color={color}
            position={[2, 1, 4]}
            lookAt={[0, 0, 0]}
            penumbra={2}
            castShadow
        />
    );
}

function RimLight({ brightness, color }) {
    return (
        <rectAreaLight
            width={2}
            height={2}
            intensity={brightness}
            color={color}
            position={[1, 4, -2]}
            rotation={[0, 180, 0]}
            castShadow
        />
    );
}

const canvasStyle = {
    width: window.innerWidth + "px",
    height: (window.innerHeight * 0.6) + "px",
}

function SecondPass() {
    const [light, setLight] = useState(true);
    const h = 'height:500'
    return (
        <>
            <div style={canvasStyle}>
                <Canvas className="canvas" >
                    <GroundPlane />
                    <BackDrop />
                    {light && <KeyLight brightness={5.6} color={"#ffc9f9"} />}
                    <FillLight brightness={2.6} color={"#bdefff"} />
                    <RimLight brightness={54} color={"#fff"} />
                    <Sphere />
                </Canvas>
            </div>
            <hr></hr>
            <button
                onClick={() => {
                    setLight(!light);
                }}
            >
                Toggle
      </button>
        </>
    );
}
export default SecondPass;