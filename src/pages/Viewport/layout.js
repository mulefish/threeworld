
import React, { Fragment, useEffect, useState } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import "./styles.css"
//import { len, redlog, getHoL_fromAry, getData, getLookup, getFromToCollection_recurse_step1 } from '../../js/utils.js';
import { len, redlog, getHoL_fromAry, getData, getLookup, getFromToCollection_recurse_step1 } from '../../js/utils.js';
import SecondPass from './SecondPass.js'
//import { PropTypes } from 'prop-types';
import * as THREE from 'three'

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

  // const [fromTo, setFromTo] = useState([])
  const [rows, setRows] = useState([])
  let ary = []
  //const [ary, setAry] = useState([])
  const [real,] = useState(getData())
  const [HoL, setHoL] = useState({})
  useEffect(() => {
    if (len(HoL) === 0) {
      let r = []
      // const lookup = getLookup()

      let theArrayOfPoints = getFromToCollection_recurse_step1()
      const xHoL = getHoL_fromAry(theArrayOfPoints)
      setHoL(xHoL)

      real.forEach((item, i) => {
        const loc = [item.x, item.y, item.z]
        r.push(<tr id={item.id}><td>{item.l}</td><td>{item.fullname}</td><td>{item.formalName}</td></tr>)
      })
      setRows(r)
    }
  }, [real, HoL])


  function superzoom() {
    let keys = Object.keys(HoL)
    console.log(keys)
    let obj = HoL["A"]
    console.log(JSON.stringify(obj, null, 2))
    const lookup = getLookup()
    console.log(JSON.stringify(lookup))


    //   const defaultStart = [-100, -200, -300]
    //   const defaultEnd = [100, 200, 300]

    //   const [start, setStart] = useState(defaultStart)
    //   const [end, setEnd] = useState(defaultEnd)
    //   const vertices = useMemo(() => [start, end].map((v) => new THREE.Vector3(...v)), [start, end])
    //   const update = useCallback((self) => {
    //     self.verticesNeedUpdate = true
    //     self.computeBoundingSphere()
    //   }, [])
    //   return (
    //     <Fragment>
    //       <line>
    //         <geometry vertices={vertices} onUpdate={update} />
    //         <lineBasicMaterial color="white" />
    //       </line>
    //       <EndPoint position={start} onDrag={(v) => setStart(v.toArray())} />
    //       <EndPoint position={end} onDrag={(v) => setEnd(v.toArray())} />
    //     </Fragment>
    //   )



    // }
  }
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
        <div className='right-box'>
          <button onClick={() => superzoom()}>doti</button>
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