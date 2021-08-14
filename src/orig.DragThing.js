

import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { extend, Canvas, useThree } from 'react-three-fiber'
import { Text } from "troika-three-text";
import { OrbitControls, Stars } from "drei";
import { Html } from '@react-three/drei'

import './styles2.css'

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


function giveFocusTo(l) {
    console.log("This is giveRocusTo and it got " + l)
}


// function EndPoint({ letter, position, onDrag, onEnd, camContext }) {
//     let [bindHover, hovered] = useHover()
//     let bindDrag = useDrag(onDrag, onEnd, camContext)
//     return (
//         <mesh position={position} {...bindDrag} {...bindHover} >
//             {/* <sphereGeometry attach="geometry" args={[12, 16, 16]} />
//             <meshBasicMaterial color={hovered ? 'orange' : 'cyan'} transparent opacity={1.0} roughness={0.1} metalness={0.1} /> */}
//             <sprite position={[-8, 10, -6]}>
//                 <Html distanceFactor={10}>
//                     <div class="content" onMouseEnter={() => giveFocusTo({ letter })}>
//                         {letter}
//                     </div>
//                 </Html>
//             </sprite>
//         </mesh >
//     )
// }

function EndPoint({ letter, position, onDrag, onEnd, camContext }) {
    let [bindHover, hovered] = useHover()
    let bindDrag = useDrag(onDrag, onEnd, camContext)
    return (
        <div>
            <sprite position={[-8, 10, -6]}>
                <Html distanceFactor={10}>
                    <div class="content" onMouseEnter={() => giveFocusTo({ letter })}>
                        {letter}
                    </div>
                </Html>
            </sprite>
            <mesh position={position} {...bindDrag} {...bindHover} >
                <sphereGeometry attach="geometry" args={[12, 16, 16]} />
                <meshBasicMaterial color={hovered ? 'black' : 'pink'} transparent opacity={1.0} roughness={0.1} metalness={0.1} />

            </mesh >
        </div>
    )
}


function Agogo({ defaultPlace, letter }) {
    const [start, setStart] = useState(defaultPlace)
    return (
        <Fragment>
            <EndPoint letter={letter} position={start} onDrag={(v) => setStart(v.toArray())} />
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
                {/* <Agogo defaultStart={[r(), r(), r()]} defaultEnd={[r(), r(), r()]} defaultFinch={[r(), r(), r()]} />
                <Agogo defaultStart={[0, 0, 0]} defaultEnd={[0, 0, 200]} defaultFinch={[0, 0, 300]} /> */}
                <Agogo letter='A' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='B' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='C' defaultPlace={[0, 0, 0]} />
                <Agogo letter='D' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='E' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='F' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='G' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='H' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='I' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='J' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='K' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='L' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='M' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='N' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='O' defaultPlace={[r(), r(), r()]} />
                <Agogo letter='P' defaultPlace={[r(), r(), r()]} />

            </Controls>
        </Canvas>
    )
}