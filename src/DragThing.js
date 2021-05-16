

import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { extend, Canvas, useThree } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei/OrbitControls'
import { Text } from "troika-three-text";
import fonts from "./fonts";

import './styles.css'

extend({ Text });

const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";



const opts = {
    font: "Philosopher",
    fontSize: 12,
    color: "#99ccff",
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: "justify",
    materialType: "MeshPhongMaterial"
}


function useHover() {
    const [hovered, setHover] = useState(false)
    const hover = useCallback((e) => (e.stopPropagation(), setHover(true)), [])
    const unhover = useCallback((e) => setHover(false), [])
    return [{ onPointerOver: hover, onPointerOut: unhover }, hovered]
}

function useDrag(onDrag, onEnd) {
    const [active, setActive] = useState(false)
    const [, toggle] = useContext(camContext)
    const activeRef = useRef()
    const down = useCallback((e) => (setActive(true), toggle(false), e.stopPropagation(), e.target.setPointerCapture(e.pointerId)), [toggle])
    const up = useCallback((e) => (setActive(false), toggle(true), e.target.releasePointerCapture(e.pointerId), onEnd && onEnd()), [onEnd, toggle])
    const move = useCallback((event) => activeRef.current && (event.stopPropagation(), onDrag(event.unprojectedPoint)), [onDrag])
    useEffect(() => void (activeRef.current = active))
    return { onPointerDown: down, onPointerUp: up, onPointerMove: move }
}

function EndPoint({ position, onDrag, onEnd }) {
    let [bindHover, hovered] = useHover()
    let bindDrag = useDrag(onDrag, onEnd)
    return (
        <mesh position={position} {...bindDrag} {...bindHover}>
            <sphereBufferGeometry args={[7.5, 16, 16]} />
            <meshBasicMaterial color={hovered ? 'hotpink' : 'white'} />
        </mesh>
    )
}

function Line({ defaultStart, defaultEnd, defaultFinch }) {
    const [start, setStart] = useState(defaultStart)
    const [end, setEnd] = useState(defaultEnd)
    const [finch, setFinch] = useState(defaultFinch)
    const vertices = useMemo(() => [start, end, finch].map((v) => new THREE.Vector3(...v)), [start, end, finch])
    const update = useCallback((self) => {
        self.verticesNeedUpdate = true
        self.computeBoundingSphere()
    }, [])
    return (
        <Fragment>
            <line>
                <geometry vertices={vertices} onUpdate={update} />
                <lineBasicMaterial color="white" />
            </line>
            <EndPoint position={start} onDrag={(v) => setStart(v.toArray())} />
            <EndPoint position={end} onDrag={(v) => setEnd(v.toArray())} />
            <EndPoint position={finch} onDrag={(v) => setFinch(v.toArray())} />
        </Fragment>
    )
}

const camContext = React.createContext()
function Controls({ children }) {
    const { gl, camera } = useThree()
    const api = useState(true)
    return (
        <Fragment>
            <OrbitControls args={[camera, gl.domElement]} enableDamping enabled={api[0]} />
            <camContext.Provider value={api}>{children}</camContext.Provider>
        </Fragment>
    )
}
const r = (range = 200) => {
    return (Math.random() * (range * 2)) - range
}
export default function DragThing() {
    return (
        <Canvas invalidateFrameloop orthographic camera={{ position: [0, 0, 500] }}>
            <Controls>
                <Line defaultStart={[r(), r(), r()]} defaultEnd={[r(), r(), r()]} defaultFinch={[r(), r(), r()]} />
                <Line defaultStart={[r(), r(), r()]} defaultEnd={[100, -100, 0]} defaultFinch={[r(), r(), r()]} />

            </Controls>
            <text
                // position-z={-180}
                // rotation={rotation}
                {...opts}
                text={text}
                font={fonts[opts.font]}
                anchorX="center"
                anchorY="middle"
            >
                {opts.materialType === "MeshPhongMaterial" ? (
                    <meshPhongMaterial attach="material" color={opts.color} />
                ) : null}
            </text>

        </Canvas>
    )
}