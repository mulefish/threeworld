
import React, { Fragment, useEffect, useState } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { OrbitControls, Html } from '@react-three/drei'
import "./styles.css"
import { len, redlog, getHoL_fromAry, getData, getLookup, getFromToCollection_recurse_step1 } from '../../js/utils.js';
import SecondPass from './SecondPass.js'
//import { PropTypes } from 'prop-types';

const style = {
  height: (window.innerHeight * 0.8) + "px",
  width: (window.innerWidth * 0.6) + "px",
  border: '3px solid #e0e0e0'
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

function Viewport() {

  const [fromTo, setFromTo] = useState([])
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
        console.log(item.id + " " + JSON.stringify(loc))
        r.push(<tr id={item.id}><td>{item.l}</td><td>{item.fullname}</td><td>{item.formalName}</td></tr>)
      })
      setRows(r)
    }
  }, [real, HoL])

  return (
    <>
      <div className="flexbox-container">
        <Canvas style={style} invalidateFrameloop orthographic camera={{ position: [0, 0, 500] }}>
          <color attach="background" args={['0xe0e0e0']} />
          <Controls>
            <SecondPass HoL={HoL} camContext={camContext} />
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
      <hr />
    </>
  )
}

Viewport.propTypes = {
};

export default Viewport;