import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import { Physics, usePlane, useBox } from "use-cannon";
import "./styles.css";

function Box(props) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      {/* <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshLambertMaterial attach="material" color="lightblue" /> */}
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial
        attach="material"
        color="black"
        opacity={0.5}
        transparent
      />
    </mesh>
  );
}

export default function App() {
  let boxes = [
    <Box position={[5, 1, 0]} />,
    <Box position={[10, 2, 0]} />,
    <Box position={[20, 1, 0]} />

  ]


  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        {boxes}
        <Plane />
      </Physics>
    </Canvas>
  );
}