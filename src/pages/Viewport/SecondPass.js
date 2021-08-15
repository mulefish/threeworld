import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
const { getPosition } = require('../../js/utils.js');

function useHover() {
    const [hovered, setHover] = useState(false)
    const hover = useCallback((e) => (e.stopPropagation(), setHover(true)), [])
    const unhover = useCallback((e) => setHover(false), [])
    return [{ onPointerOver: hover, onPointerOut: unhover }, hovered]
}

function useDrag(onDrag, onEnd, camContext) {
    const [active, setActive] = useState(false)
    const [, toggle] = useContext(camContext)
    const activeRef = useRef()
    const down = useCallback((e) => (setActive(true), toggle(false), e.stopPropagation(), e.target.setPointerCapture(e.pointerId)), [toggle])
    const up = useCallback((e) => (setActive(false), toggle(true), e.target.releasePointerCapture(e.pointerId), onEnd && onEnd()), [onEnd, toggle])
    const move = useCallback((event) => activeRef.current && (event.stopPropagation(), onDrag(event.unprojectedPoint)), [onDrag])
    useEffect(() => void (activeRef.current = active))
    return { onPointerDown: down, onPointerUp: up, onPointerMove: move }
}

function EEBOO({ id, defaultStart, camContext }) {
    const [pos, setPos] = useState(defaultStart)
    const updatePos = (vector) => {
        setPos(vector)
    }
    return (
        <Fragment>
            <EndPoint id={id} position={pos} onDrag={(v) => updatePos(v.toArray())} onEnd={(v) => console.log("The end")} camContext={camContext} />
        </Fragment>
    )
}

function giveFocusTo(letter) {
    console.log("Give focus to " + JSON.stringify(letter))
}

function EndPoint({ id, position, onDrag, onEnd, camContext }) {
    let [bindHover, hovered] = useHover()
    let bindDrag = useDrag(onDrag, onEnd, camContext)
    return (
        <mesh position={position} {...bindDrag} {...bindHover} >
            <sphereGeometry attach="geometry" args={[12, 16, 16]} />
            <meshBasicMaterial color={hovered ? 'black' : 'pink'} transparent opacity={1.0} roughness={0.1} metalness={0.1} />
            <sprite position={[-8, 10, -6]}>
                <Html distanceFactor={10}>
                    <div class="content" onMouseEnter={() => giveFocusTo({ id })}>
                        {id}
                    </div>
                </Html>
            </sprite>
        </mesh >
    )
}

function SecondPass({
    HoL,
    camContext
}) {
    const keys = Object.keys(HoL)
    let paintThese = []
    keys.forEach((k) => {
        let ary = HoL[k]
        const pos = getPosition(k)
        ary.forEach((a) => {
            paintThese.push(<EEBOO id={k} defaultStart={pos} camContext={camContext} />)
        })
    })
    return (
        <>
            {paintThese}
        </>
    )
}

export default SecondPass;