
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'

// import ReactDOM, { render } from 'react-dom'
import * as THREE from 'three'
import { Canvas, useThree } from 'react-three-fiber'
import { Text, OrbitControls, Html } from '@react-three/drei'
import "./styles.css"
import { numberToExcelLikeLetters, getData } from './js/utils.js';
import BallLines from './BallLines.js'
const h = {
  height: (window.innerHeight * 1.0) + "px",
  width: (window.innerWidth * 0.6) + "px",
  border: '3px solid #e0e0e0'
}

const textProps = {
  fontSize: 3.9,
  // font: 'http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'
  font: 'OnlineWebFonts_COM_5c4a6802514b9c5d5d11de486181ad93/Calibri/Calibri.woff2',
  color: 'black'

}

function useHover() {
  // What is """Line 25:56:  Unexpected use of comma operator  no-sequences"""?! Hate.
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


function MyIcon({ position, onDrag, onEnd, letter }) {
  let [bindHover, hovered] = useHover()
  let bindDrag = useDrag(onDrag, onEnd)
  let pos = position[0].toFixed(0) + " " + position[1].toFixed(0) + " " + position[2].toFixed(0)
  return (
    <mesh position={position} {...bindDrag} {...bindHover} >
      <sphereGeometry attach="geometry" args={[6, 16, 16]} />
      <meshBasicMaterial color={hovered ? 'red' : 'yellow'} transparent opacity={0.5} roughness={0.1} metalness={0.1} />
      <sprite>
        <Html distanceFactor={10}>
          <div class="content" onMouseEnter={() => giveFocusTo({ letter })}>
            {/* {pos} */}
            {letter}
          </div>
        </Html>
      </sprite>
    </mesh>
  )
}
let active = undefined
function giveFocusTo({ letter }) {

  var elems = document.querySelectorAll(".rowhighlight");

  [].forEach.call(elems, function (el) {
    el.classList.remove("rowhighlight");
  })


  document.getElementById(letter).classList.add("rowhighlight");
}

function Letter({ defaultStart, letter }) {
  const [start, setStart] = useState(defaultStart)
  return (
    <Fragment>
      <MyIcon letter={letter} position={start} onDrag={(v) => setStart(v.toArray())} />
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

function App() {

  const [ary, setAry] = useState([])
  const [rows, setRows] = useState([])
  useEffect(() => {
    let a = []
    let r = []
    const ary2 = getData()
    ary2.forEach((item, i) => {
      const loc = [item.x, item.y, item.z]
      const l = item.l
      a.push(<Letter key={i} defaultStart={loc} letter={l} ></Letter>)
      //  r.push(<tr class='rowhighlight' id={l}><td>{l}</td><td>{item.f}</td></tr>)
      r.push(<tr id={l}><td>{l}</td><td>{item.f}</td></tr>)
    })
    setAry(a)
    setRows(r)
  }, ary)
  return (

    <div class="flexbox-container">
      <Canvas style={h} invalidateFrameloop orthographic camera={{ position: [0, 0, 500] }}>
        <color attach="background" args={['0xe0e0e0']} />
        {/* <ambientLight intensity={1} color={0xe0e0e0} /> */}
        <Controls>
          {/* <Line defaultStart={[-100, -100, 0]} defaultEnd={[0, 100, 0]} />
          <Line defaultStart={[0, 100, 0]} defaultEnd={[100, -100, 0]} /> */}
          <BallLines camContext={camContext} />
          {ary}
        </Controls>
      </Canvas>
      <div class='right-box'>
        <table border='1'>
          <tbody>
            {rows}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default App;