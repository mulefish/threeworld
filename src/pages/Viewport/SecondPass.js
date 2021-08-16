import React, { Fragment, useRef, useEffect, useState, useCallback, useContext } from 'react'
import { Html } from '@react-three/drei'
import { getData, getLookup, redlog } from '../../js/utils.js';
import * as THREE from 'three'


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

const stopDragging = (id, pos, parent, camContext) => {
    const lookup = getLookup()
    const index = lookup[id]
    const d = getData()
    const item = d[index]
    //console.log(`${id} ${pos} ${index}  ${JSON.stringify(item)}  parent ${parent}`)

    const index2 = lookup[parent]
    const item2 = d[index2]
    // console.log(item.id, parent, item.x, item.y, item.z)
    // console.log(item2.id, parent, item2.x, item2.y, item2.z)
    // console.log(lookup)


    // const data = getData()
    // if (parent === id) {
    //     const index = lookup[id]
    //     const item = data[index]
    //     console.log(JSON.stringify(item))

    // } else {
    //     console.log(" NOPE! " + parent + "  and " + id);
    // }
    // console.log("What " + JSON.stringify(item) + "  " + JSON.stringify(item2))
    const start = [item.x, item.y, item.z]
    const end = [item2.x, item2.y, item2.z]
    console.log("start " + JSON.stringify(start) + " and " + JSON.stringify(end))
    return (
        <>
            < Scene start={start} end={end} camContext={camContext} />
        </>
    )

}

function VerticeOuter({ id, parent, defaultStart, camContext }) {
    const [pos, setPos] = useState(defaultStart)
    const updatePos = (vector) => {
        setPos(vector)
    }
    return (
        <Fragment>
            <VerticeInner id={id} position={pos} onDrag={(v) => updatePos(v.toArray())} onEnd={(v) => stopDragging(id, pos, parent, camContext)} camContext={camContext} />
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
        </mesh >
    )
}



const Scene = (start, stop, camContext) => {
    // console.log("BFORE: " + JSON.stringify(start));
    // console.log(" stop: " + JSON.stringify(stop));
    const points = []
    //points.push(new THREE.Vector3(start[0], start[1], start[2]))
    //points.push(new THREE.Vector3(stop[0], stop[1], stop[2]))
    //    points.push(new THREE.Vector3(-100, -100, -100))

    points.push(new THREE.Vector3(-100, -100, -100))
    points.push(new THREE.Vector3(0, 0, 0))
    //    points.push(new THREE.Vector3(100, 100, 100))
    // points.push(new THREE.Vector3(10, 0, 0))
    console.log("POINT: " + JSON.stringify(points))

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    return (
        <>
            <group position={[0, 0, 0]}>
                <line geometry={lineGeometry}>
                    <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
                </line>
            </group>
        </>
    )
}

// const lookup = getLookup()
// const index = lookup[id]
// const d = getData()
// const item = d[index]
// //console.log(`${id} ${pos} ${index}  ${JSON.stringify(item)}  parent ${parent}`)

// const index2 = lookup[parent]
// const item2 = d[index2]
// // console.log(item.id, parent, item.x, item.y, item.z)
// // console.log(item2.id, parent, item2.x, item2.y, item2.z)
// // console.log(lookup)


// // const data = getData()
// // if (parent === id) {
// //     const index = lookup[id]
// //     const item = data[index]
// //     console.log(JSON.stringify(item))

// // } else {
// //     console.log(" NOPE! " + parent + "  and " + id);
// // }
// // console.log("What " + JSON.stringify(item) + "  " + JSON.stringify(item2))
// const start = [item.x, item.y, item.z]
// const end = [item2.x, item2.y, item2.z]
function SecondPass({
    HoL,
    camContext
}) {
    const [lines, setLines] = useState([])


    const keys = Object.keys(HoL)
    let paintThese = []
    const lookup = getLookup()
    // const data = getData()
    const temp = []
    keys.forEach((k, myindex) => {
        let ary = HoL[k]


        const index = lookup[k]

        let parent = {}
        parent.x = Math.random() * 200
        parent.y = Math.random() * 200
        parent.z = Math.random() * 200

        // console.log(JSON.stringify(parent, null, 1))
        // console.log(" ............ " + parent.x)
        // console.log(" >>>>>>>>> " + JSON.stringify(parent, null, 1) + " <<<<<<<< ")

        ary.forEach((a, i) => {
            ///  console.log(i + "   " + a + " ............................ ")
            const pos = getPosition(a)
            const index2 = lookup[k]
            const child = getData(index2)
            console.log(i + "  : " + JSON.stringify(child))
            temp.push(< Scene start={parent.x, parent.y, parent.z} stop={child.x, child.y, child.z} camContext={camContext} />)

            paintThese.push(<VerticeOuter key={a} id={a} parent={k} defaultStart={pos} camContext={camContext} />)
        })
        //        setLines(temp)
    })

    // lines.forEach((l) => {

    // })

    return (
        <>
            {/* <Scene camContext={camContext} /> */}
            {temp}
            {paintThese}
        </>
    )
}

export default SecondPass;