import React, { useEffect, useMemo, useRef } from 'react'
import { render } from 'react-dom'

import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { Text, OrbitControls } from '@react-three/drei'
import './styles.css'

const textProps = {
    fontSize: 3.9,
    font: 'http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'
}
//https://codesandbox.io/s/lbzcs?file=/src/styles.css:0-146

function Title({ layers = undefined, ...props }) {
    const group = useRef()
    useEffect(() => {
        group.current.lookAt(0, 0, 0)
    }, [])
    console.log("PROPS: " + JSON.stringify(props, null, 2))
    return (
        <group {...props} ref={group}>

            <Text depthTest={false} material-toneMapped={false} {...textProps} layers={layers}>
                GOAT FINCH SWIFT
      </Text>
        </group>
    )
}

function TitleCopies({ layers }) {
    const vertices = useMemo(() => {
        const y = new THREE.IcosahedronGeometry(12)
        return y.vertices
    }, [])

    return (
        <group name="titleCopies">
            {vertices.map((vertex, i) => (
                <Title name={'titleCopy-' + i} position={vertex} layers={layers} />
            ))}
        </group>
    )
}

export default function Scene() {
    return (
        <group name="sceneContainer">
            <TitleCopies />
        </group>
    )
}

function App() {
    return (
        <Canvas concurrent shadowMap camera={{ position: [-10, 4, 20], fov: 70 }}>
            <color attach="background" args={['#000']} />
            <Scene />
            <ambientLight intensity={0.4} />
            <OrbitControls />
        </Canvas>
    )
}

render(<App />, document.querySelector('#root'))
