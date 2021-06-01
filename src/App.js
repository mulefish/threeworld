
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'

// import ReactDOM, { render } from 'react-dom'
import * as THREE from 'three'
import { Canvas, useThree } from 'react-three-fiber'
import { Text, OrbitControls, Html } from '@react-three/drei'
import "./styles.css"
import { numberToExcelLikeLetters, getData } from './js/utils.js';
const h = {
  height: (window.innerHeight * 0.8) + "px",
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

function EndPoint({ position, onDrag, onEnd }) {
  let [bindHover, hovered] = useHover()
  let bindDrag = useDrag(onDrag, onEnd)
  return (
    <mesh position={position} {...bindDrag} {...bindHover} >
      {/* <sphereBufferGeometry args={[7.5, 16, 16]} /> */}
      <sphereGeometry attach="geometry" args={[6, 16, 16]} />
      <meshBasicMaterial color={hovered ? 'red' : 'blue'} transparent opacity={0.5} roughness={0.1} metalness={0.1} />
      {/* <meshStandardMaterial attach="material" color="white" transparent roughness={0.1} metalness={0.1} /> */}
      <sprite>
        <Text depthTest={false} material-toneMapped={false} {...textProps}>
          WHALEkfgsdkgksdfkskfkf kask
            </Text>
      </sprite>
    </mesh>
  )
}

// function FillLight({ brightness, color }) { return (<rectAreaLight width={3} height={3} intensity={brightness} color={color} position={[2, 1, 4]} lookAt={[0, 0, 0]} penumbra={2} castShadow />); } function RimLight({ brightness, color }) { return (<rectAreaLight width={2} height={2} intensity={brightness} color={color} position={[1, 4, -2]} rotation={[0, 180, 0]} castShadow />); }

// function Light({ brightness, color }) { return (<rectAreaLight width={3} height={3} color={color} intensity={brightness} position={[-2, 0, 5]} lookAt={[0, 0, 0]} penumbra={1} castShadow />); }

// function KeyLight({ brightness, color }) {
//   return (
//     <rectAreaLight
//       width={3}
//       height={3}
//       color={color}
//       intensity={brightness}
//       position={[-2, 0, 5]}
//       lookAt={[0, 0, 0]}
//       penumbra={1}
//       castShadow
//     />
//   );
// }

// function GroundPlane() { return (<mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>      <planeBufferGeometry attach="geometry" args={[500, 500]} />      <meshStandardMaterial attach="material" color="white" />    </mesh>); }
// function BackDrop() { return (<mesh receiveShadow position={[0, -1, -5]}>      <planeBufferGeometry attach="geometry" args={[500, 500]} />      <meshStandardMaterial attach="material" color="white" />    </mesh>); }
// function Sphere() { return (<mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>      <sphereGeometry attach="geometry" args={[1, 16, 16]} />      <meshStandardMaterial attach="material" color="white" transparent roughness={0.1} metalness={0.1} />    </mesh>); }


function Line({ defaultStart, defaultEnd }) {
  const [start, setStart] = useState(defaultStart)
  const [end, setEnd] = useState(defaultEnd)
  const vertices = useMemo(() => [start, end].map((v) => new THREE.Vector3(...v)), [start, end])
  const update = useCallback((self) => {
    self.verticesNeedUpdate = true
    self.computeBoundingSphere()
  }, [])
  return (
    <Fragment>
      <line>
        <geometry vertices={vertices} onUpdate={update} />
        <lineBasicMaterial color="black" transparent opacity={0.5} />
      </line>
      <EndPoint position={start} onDrag={(v) => setStart(v.toArray())} />
      <EndPoint position={end} onDrag={(v) => setEnd(v.toArray())} />
    </Fragment>
  )
}

function MyIcon({ position, onDrag, onEnd, letter }) {
  let [bindHover, hovered] = useHover()
  let bindDrag = useDrag(onDrag, onEnd)
  let pos = position[0].toFixed(0) + " " + position[1].toFixed(0) + " " + position[2].toFixed(0)
  return (
    <mesh position={position} {...bindDrag} {...bindHover} >
      <sphereGeometry attach="geometry" args={[6, 16, 16]} />
      <meshBasicMaterial color={hovered ? 'red' : 'yellow'} transparent opacity={0.5} roughness={0.1} metalness={0.1} />
      {/* <meshStandardMaterial attach="material" color="white" transparent roughness={0.1} metalness={0.1} /> */}
      <sprite>
        {/* <Text depthTest={false} material-toneMapped={false} {...textProps}>
          {letter}
        </Text> */}
        <Html distanceFactor={10}>
          <div class="content">
            {/* {pos} */}
            {letter}
          </div>
        </Html>
      </sprite>
    </mesh>
  )
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
  useEffect(() => {
    let a = []
    const ary2 = getData()
    ary2.forEach((item, i) => {
      const loc = [item.x, item.y, item.z]
      // console.log(item)
      const l = item.l
      a.push(<Letter key={i} defaultStart={loc} letter={l} ></Letter>)
    })
    setAry(a)
  }, ary)
  // let ary = []
  console.log("EAR " + ary.length)
  return (

    <div>
      <Canvas style={h} invalidateFrameloop orthographic camera={{ position: [0, 0, 500] }}>
        <color attach="background" args={['0xe0e0e0']} />
        {/* <ambientLight intensity={1} color={0xe0e0e0} /> */}
        <Controls>
          {/* <Line defaultStart={[-100, -100, 0]} defaultEnd={[0, 100, 0]} />
          <Line defaultStart={[0, 100, 0]} defaultEnd={[100, -100, 0]} /> */}
          {ary}
        </Controls>
      </Canvas>
      <hr>
      </hr>
    Hello { numberToExcelLikeLetters(322)}
    </div>
  )
}

export default App;