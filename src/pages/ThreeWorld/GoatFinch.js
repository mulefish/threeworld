import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { Text, OrbitControls } from '@react-three/drei'
import './styles.css'

const textProps = {
    fontSize: 3.9,
    // font: 'http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'
    font: '/OnlineWebFonts_COM_5c4a6802514b9c5d5d11de486181ad93/Calibri/Calibri.woff2',
    color: 'black'

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

function EndPoint({ label, position, onDrag, onEnd }) {
    let [bindHover, hovered] = useHover()
    let bindDrag = useDrag(onDrag, onEnd)
    return (
        <mesh position={position} {...bindDrag} {...bindHover} >
            {/* <sphereBufferGeometry args={[7.5, 16, 16]} /> */}
            <sphereGeometry attach="geometry" args={[6, 16, 16]} />
            <meshBasicMaterial color={hovered ? 'red' : 'blue'} transparent opacity={0.5} roughness={0.1} metalness={0.1} />
            {/* <meshStandardMaterial attach="material" color="white" transparent roughness={0.1} metalness={0.1} /> */}
            <Text depthTest={false} material-toneMapped={false} {...textProps}>
                {label}
            </Text>
        </mesh>
    )
}


function Sphere() { return (<mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>      <sphereGeometry attach="geometry" args={[1, 16, 16]} />      <meshStandardMaterial attach="material" color="white" transparent roughness={0.1} metalness={0.1} />    </mesh>); }

export default function Thing({ label, loc }) {
    const [start, setStart] = useState(loc)
    const vertices = useMemo(() => [start].map((v) => new THREE.Vector3(...v)), [start])
    const update = useCallback((self) => {
        self.verticesNeedUpdate = true
        self.computeBoundingSphere()
    }, [])
    return (
        <Fragment>
            <EndPoint label={label} position={start} onDrag={(v) => setStart(v.toArray())} />
        </Fragment>
    )
}

