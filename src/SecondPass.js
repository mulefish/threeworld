import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { extend, Canvas, useThree } from 'react-three-fiber'
//import { OrbitControls } from '@react-three/drei/OrbitControls'
import { Text } from "troika-three-text";
import fonts from "./fonts";
import { OrbitControls, Stars } from "drei";

import { Physics, usePlane, useBox } from "use-cannon";


function Dots() {
    return (
        <mesh>
            <circleBufferGeometry />
            <meshBasicMaterial />
        </mesh>
    )
}

export default function SecondPass() {
    return (
        <Canvas colorManagement={false}>
            <color attach="background" args={['black']} />
            <Dots />
        </Canvas>
    )
}
