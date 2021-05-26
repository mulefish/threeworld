

import * as THREE from 'three'
// import ReactDOM from 'react-dom'
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { extend, Canvas, useThree } from 'react-three-fiber'
//import { OrbitControls } from '@react-three/drei/OrbitControls'
// import { Text } from "troika-three-text";
import fonts from "./fonts";
import { OrbitControls, Stars } from "drei";


import './styles.css'

// extend({ Text });

const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";



function Box(props) {
    return (
        <mesh
            position={[props.position]}
        >
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    );
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
            <sphereBufferGeometry args={[2, 16, 16]} />
            <meshBasicMaterial color={hovered ? 'red' : 'blue'} />
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


            <Text opacity={1} position={start}    >
                whale
      </Text>


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



function Text({ children, position, scale, color = 'green', fontSize = 45 }) {
    console.log("children " + children)
    console.log("position " + position)
    console.log("scale " + scale)
    console.log("color " + color)
    console.log("fontSize " + fontSize)
    console.log("............")
    const canvas = useMemo(() => {
        var fontface = 'Arial'
        var fontsize = fontSize
        var borderThickness = 4

        var canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')
        context.textBaseline = 'middle'
        var metrics = context.measureText(children)
        var textWidth = metrics.width

        context.lineWidth = borderThickness
        context.fillStyle = color
        context.fillText(children, textWidth - textWidth * 0.8, fontsize)
        return canvas
    }, [children])

    return (
        <sprite scale={scale} position={position}>
            <spriteMaterial sizeAttenuation={false} attach="material" transparent alphaTest={0.5}>
                <canvasTexture attach="map" image={canvas} />
            </spriteMaterial>
        </sprite>
    )
}

export default function DragThing() {

    let boxes = [
        <Box key='1' position={[10, 100, r()]} />,
        <Box key='2' position={[11, 80, r()]} />,
        <Box key='3' position={[12, 70, r()]} />,
        <Box key='4' position={[13, 60, r()]} />,
        <Box key='5' position={[14, 50, r()]} />,
        <Box key='6' position={[15, 40, r()]} />,
        <Box key='7' position={[16, 30, r()]} />,
        <Box key='8' position={[17, 20, r()]} />,
        <Box key='9' position={[18, 15, r()]} />,
        <Box key='10' position={[19, 11, r()]} />,
        <Box key='11' position={[20, 10, r()]} />,

    ]
    var h = {
        height: 500
    };

    return (
        <div>
            <Canvas invalidateFrameloop orthographic camera={{ position: [0, 0, 500] }} style={h}>
                <Controls>
                    <Line defaultStart={[r(), r(), r()]} defaultEnd={[r(), r(), r()]} defaultFinch={[r(), r(), r()]} />
                    <Line defaultStart={[0, 0, 0]} defaultEnd={[0, 0, 200]} defaultFinch={[0, 0, 300]} />


                    <Text scale={[20, 20, 20]} opacity={1} position={[0, 0, 0]}>
                        This is a ball
      </Text>


                    {/* <sprite scale={scale} position={position}>
                        <spriteMaterial sizeAttenuation={false} attach="material" transparent alphaTest={0.5}>
                            <canvasTexture attach="map" image={canvas} />
                        </spriteMaterial>
                    </sprite> */}


                    {/* <Stars /> */}
                    {/* <ambientLight intensity={1.0} /> */}
                    {/* <spotLight position={[10, 15, 10]} angle={0.3} /> */}
                    {/* {boxes} */}
                    {/* <Plane /> */}

                </Controls>
                {/* <text
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
                </text> */}

            </Canvas>
            <hr></hr>
        Hello
        </div>
    )
}