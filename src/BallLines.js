
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'

// import ReactDOM, { render } from 'react-dom'
import * as THREE from 'three'
// import { Canvas, useThree } from 'react-three-fiber'
// import { Text, OrbitControls, Html } from '@react-three/drei'


function useHover() {
  // What is """Line 25:56:  Unexpected use of comma operator  no-sequences"""?! Hate.
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


function Line({ defaultStart, defaultEnd, camContext }) {
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
      <EndPoint position={start} onDrag={(v) => setStart(v.toArray())} camContext={camContext} />
      <EndPoint position={end} onDrag={(v) => setEnd(v.toArray())} camContext={camContext} />
    </Fragment>
  )
}

function EndPoint({ position, onDrag, onEnd, camContext }) {
  let [bindHover, hovered] = useHover()
  let bindDrag = useDrag(onDrag, onEnd, camContext)
  return (
    <mesh position={position} {...bindDrag} {...bindHover} >
      {/* <sphereBufferGeometry args={[7.5, 16, 16]} /> */}
      <sphereGeometry attach="geometry" args={[6, 16, 16]} />
      <meshBasicMaterial color={hovered ? 'black' : 'pink'} transparent opacity={1.0} roughness={0.1} metalness={0.1} />
      {/* <meshStandardMaterial attach="material" color="white" transparent roughness={0.1} metalness={0.1} /> */}
    </mesh >
  )
}


// const camContext = React.createContext()
// function Controls({ children }) {
//   const { gl, camera } = useThree()
//   const api = useState(true)
//   return (
//     <Fragment>
//       <OrbitControls args={[camera, gl.domElement]} enableDamping enabled={api[0]} />
//       <camContext.Provider value={api}>{children}</camContext.Provider>
//     </Fragment>
//   )
// }

function BallLines({
  camContext
}) {

  let lines = []
  for (let i = 0; i < 20; i++) {
    const x1 = -550 + (Math.random() * 1100)
    const y1 = -550 + (Math.random() * 1100)
    const z1 = -550 + (Math.random() * 1100)
    const x2 = -550 + (Math.random() * 1100)
    const y2 = -550 + (Math.random() * 1100)
    const z2 = -550 + (Math.random() * 1100)
    lines.push(<Line camContext={camContext} defaultStart={[x1, y1, z1]} defaultEnd={[x2, y2, z2]} />)

  }


  return (
    <>
      {lines}
    </>
  )
}

export default BallLines;