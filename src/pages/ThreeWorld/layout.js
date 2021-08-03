
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext } from 'react'

import { Canvas, useThree } from 'react-three-fiber'
import { OrbitControls, Html } from '@react-three/drei'
import "./styles.css"
import { len, greenlog, redlog, bluelog, getHoL_fromAry, getData, updateData, getLookup, getUpdatedData, getFromToCollection_recurse_step1 } from '../../js/utils.js';
// import BallLines from './BallLines.js'
import LettersAndLines from './LettersAndLines.js'
import { PropTypes } from 'prop-types';






const h = {
  height: (window.innerHeight * 0.8) + "px",
  width: (window.innerWidth * 0.6) + "px",
  border: '3px solid #e0e0e0'
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

function giveFocusTo({ letter }) {
  var elems = document.querySelectorAll(".rowhighlight");
  [].forEach.call(elems, function (el) {
    el.classList.remove("rowhighlight");
  })
  document.getElementById(letter).classList.add("rowhighlight");
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

function ThreeWorld(
  getABCFunc,
  abcValue,
) {

  function showValue() {
    getABCFunc()
  }

  // function setKittyCatValue() {
  //   let tmp = [
  //     'a',
  //     'b',
  //     Math.random()
  //   ]
  //   setKittyCat(tmp)
  // }



  const [fromTo, setFromTo] = useState([])


  function jiggle() {
    let r = getData()
    setReal(r)
  }

  function jiggle2() {
    setReal([])
    const lookup = getLookup()
    for (let key in lookup) {
      bluelog(key + "    " + lookup[key])
      const x = -500 + (Math.random() * 1000)
      const y = -500 + (Math.random() * 1000)
      const z = -500 + (Math.random() * 1000)
      updateData(key, [x, y, z])
    }
    const ary = getUpdatedData()
    setTimeout(() => { setReal(ary) }, 100);
  }


  const [rows, setRows] = useState([])
  const [ary, setAry] = useState([])
  const [real, setReal] = useState(getData())
  const [HoL, setHoL] = useState({})

  useEffect(() => {
    redlog(" len is " + len(HoL) + " and  " + Math.random())
    if (len(HoL) === 0) {
      let r = []
      const lookup = getLookup()
      const n = Object.keys(lookup).length

      let theArrayOfPoints = getFromToCollection_recurse_step1()
      const xHoL = getHoL_fromAry(theArrayOfPoints)
      setHoL(xHoL)
      const n2 = Object.keys(HoL).length

      real.forEach((item, i) => {
        const loc = [item.x, item.y, item.z]
        // a.push(<Letter key={i} defaultStart={loc} letter={item.l} ></Letter>)
        r.push(<tr id={item.l}><td>{item.l}</td><td>{item.fullname}</td><td>{item.formalName}</td></tr>)
      })
      setRows(r)
    }
  }, [real, HoL])

  return (
    <>
      <div class="flexbox-container">
        <Canvas style={h} invalidateFrameloop orthographic camera={{ position: [0, 0, 500] }}>
          <color attach="background" args={['0xe0e0e0']} />
          <Controls>
            <LettersAndLines HoL={HoL} camContext={camContext} />
            {ary}
          </Controls>
        </Canvas>
        <div class='right-box'>
          <button onClick={jiggle}>jiggle</button>
          <button onClick={jiggle2}>jiggle2</button>
          <table border='1'>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
      <hr />

      <button onClick={showValue}>showValue</button>

      {JSON.stringify(abcValue, null, 10)}
      <br></br>
      {/* kittyValue */}
      {/* <button onClick={setKittyCatValue}>setKittyCatValue</button>
      {JSON.stringify(kittyValue, null, 10)} */}


    </>
  )
}

ThreeWorld.propTypes = {
  abcValue: PropTypes.array,
  getABCFunc: PropTypes.func,
};

export default ThreeWorld;