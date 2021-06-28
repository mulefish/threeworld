
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
const { getPosition } = require('./js/utils.js');

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

function Line({ letter, defaultStart, defaultEnd, camContext }) {
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
      <EndPoint letter={letter} position={start} onDrag={(v) => setStart(v.toArray())} camContext={camContext} />
      <EndPoint letter={letter} position={end} onDrag={(v) => setEnd(v.toArray())} camContext={camContext} />
    </Fragment>
  )
}
function giveFocusTo(letter) {

}

function EndPoint({ letter, position, onDrag, onEnd, camContext }) {
  let [bindHover, hovered] = useHover()
  let bindDrag = useDrag(onDrag, onEnd, camContext)
  return (
    <mesh position={position} {...bindDrag} {...bindHover} >
      <sphereGeometry attach="geometry" args={[6, 16, 16]} />
      <meshBasicMaterial color={hovered ? 'black' : 'pink'} transparent opacity={1.0} roughness={0.1} metalness={0.1} />
      <sprite position={[-8, 10, -6]}>
        <Html distanceFactor={10}>
          <div class="content" onMouseEnter={() => giveFocusTo({ letter })}>
            {letter}
          </div>
        </Html>
      </sprite>
    </mesh >
  )
}


function LettersAndLines({
  HoL,
  camContext
}) {
  console.log( JSON.stringify( HoL, null, 2 ))
  return (
    <>
      <Line letter='A' camContext={camContext} defaultStart={[-100, -100, 0]} defaultEnd={[0, 100, 0]} />
      <Line letter='B' camContext={camContext} defaultStart={[0, 100, 0]} defaultEnd={[100, -100, 0]} />
    </>
  )
}

export default LettersAndLines;