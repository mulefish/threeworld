import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { Html } from '@react-three/drei'
import { getData, getLookup } from '../../js/utils.js';
import * as THREE from 'three'
import { Canvas, extend, useThree, useResource } from 'react-three-fiber'

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

const stopDragging = (id, pos, parent) => {
    const lookup = getLookup()
    const index = lookup[id]
    const d = getData()
    const item = d[index]
    //console.log(`${id} ${pos} ${index}  ${JSON.stringify(item)}  parent ${parent}`)

    const index2 = lookup[parent]
    const item2 = d[index2]
    console.log(item)
    console.log(item2)
    // console.log(lookup)





}

function VerticeOuter({ id, parent, defaultStart, camContext }) {
    const [pos, setPos] = useState(defaultStart)
    const updatePos = (vector) => {
        setPos(vector)
    }
    return (
        <Fragment>
            <VerticeInner id={id} position={pos} onDrag={(v) => updatePos(v.toArray())} onEnd={(v) => stopDragging(id, pos, parent)} camContext={camContext} />
        </Fragment>
    )
}

// const [rowId, setRowId] = useState(null)
let rowId = null
function giveFocusTo(letter) {

    if (rowId !== null) {
        const row = document.getElementById(rowId.id)
        row.bgColor = "white"

    }
    rowId = letter
    const row = document.getElementById(rowId.id)
    row.bgColor = "yellow"

}

function VerticeInner({ id, position, onDrag, onEnd, camContext, }) {
    let [bindHover, hovered] = useHover()
    let bindDrag = useDrag(onDrag, onEnd, camContext)
    let pos2 = position
    pos2[0] += 200
    pos2[1] += 200
    pos2[2] += 200

    return (
        <mesh position={position} {...bindDrag} {...bindHover} >
            <sphereGeometry attach="geometry" args={[12, 16, 16]} />
            <meshBasicMaterial color={hovered ? 'black' : 'pink'} transparent opacity={1.0} roughness={0.1} metalness={0.1} />
            <sprite position={[-8, 10, -6]}>
                <Html distanceFactor={10}>
                    <div className="content" onMouseEnter={() => giveFocusTo({ id })}>
                        {id}
                    </div>
                </Html>
            </sprite>
            {/* <Line defaultStart={position} defaultEnd={pos2} camContext={camContext} /> */}
        </mesh >
    )
}

const Scene = (camContext) => {

    const points = []
    points.push(new THREE.Vector3(-10, 0, 0))
    points.push(new THREE.Vector3(0, 10, 0))
    points.push(new THREE.Vector3(10, 0, 0))

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

    // const positions = new Float32Array(points.length * 2)

    return (
        <>
            <group position={[0, -2.5, -100]}>
                <line geometry={lineGeometry}>
                    <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
                </line>
                {/* <line ref={ref}>
            <bufferGeometry attach="geometry" setFromPoints={points} />
            <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
          </line> */}
                {/* <points ref={ref}>
            <bufferGeometry>
              <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 2} array={positions} itemSize={2} />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={0x0000ff} linewidth={3} linecap={'round'} linejoin={'round'} />
          </points> */}
            </group>
            {/* <dragControls args={[[object], camContext, domElement]} /> */}
        </>
    )
}

// function Line({ defaultStart, defaultEnd, camContext }) {
//     const [start, setStart] = useState(defaultStart)
//     const [end, setEnd] = useState(defaultEnd)
//     const vertices = useMemo(() => [start, end].map((v) => new THREE.Vector3(...v)), [start, end])
//     const update = useCallback((self) => {
//         self.verticesNeedUpdate = true
//         self.computeBoundingSphere()
//     }, [])
//     return (
//         <Fragment>
//             <line>
//                 <geometry vertices={vertices} onUpdate={update} />
//                 <lineBasicMaterial color="white" />
//             </line>
//             <EndPoint position={start} onDrag={(v) => setStart(v.toArray())} />
//             <EndPoint position={end} onDrag={(v) => setEnd(v.toArray())} camContext={camContext} />
//         </Fragment>
//     )
// }


// function EndPoint({ position, camContext }) {
//     // let [bindHover, hovered] = useHover()
//     console.lo
//     // let bindDrag = useDrag(onDrag, onEnd, camContext)
//     return (
//         <mesh position={position}>
//             {/* <sphereBufferGeometry args={[7.5, 16, 16]} /> */}
//             <sphereGeometry attach="geometry" args={[6, 16, 16]} />
//             <meshBasicMaterial color={'black'} transparent opacity={1.0} roughness={0.1} metalness={0.1} />
//             {/* <meshStandardMaterial attach="material" color="white" transparent roughness={0.1} metalness={0.1} /> */}
//         </mesh >
//     )
// }


// const points = []
// points.push(new THREE.Vector3(-10, 0, 0))
// points.push(new THREE.Vector3(0, 10, 0))
// points.push(new THREE.Vector3(10, 0, 0))



function SecondPass({
    HoL,
    camContext
}) {
    const keys = Object.keys(HoL)
    let paintThese = []
    keys.forEach((k) => {
        let ary = HoL[k]
        ary.forEach((a) => {
            const pos = getPosition(a)
            paintThese.push(<VerticeOuter key={a} id={a} parent={k} defaultStart={pos} camContext={camContext} />)
        })
    })
    return (
        <>
            <Scene camContext={camContext} />
            {paintThese}
        </>
    )
}

export default SecondPass;