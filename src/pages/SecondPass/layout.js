
import React, { Fragment, useRef, useEffect, useState, useCallback, useContext } from 'react'

import { Canvas, useThree } from 'react-three-fiber'
import { OrbitControls, Html } from '@react-three/drei'
import "./styles.css"
import { len, greenlog, redlog, bluelog, getHoL_fromAry, getData, updateData, getLookup, getUpdatedData, getFromToCollection_recurse_step1 } from '../../js/utils.js';
import SecondPass from './SecondPass.js'

import { PropTypes } from 'prop-types';



function SecondPass(
  getABCFunc,
  abcValue,
) {

  function showValue() {
    getABCFunc()
  }

  //   useEffect(() => {
  //     redlog(" len is " + len(HoL) + " and  " + Math.random())
  //     if (len(HoL) === 0) {
  //       let r = []
  //       const lookup = getLookup()
  //       const n = Object.keys(lookup).length

  // //      let theArrayOfPoints = getFromToCollection_recurse_step1()
  //       const xHoL = getHoL_fromAry(theArrayOfPoints)
  //       setHoL(xHoL)
  //       const n2 = Object.keys(HoL).length

  //       real.forEach((item, i) => {
  //         const loc = [item.x, item.y, item.z]
  //         // a.push(<Letter key={i} defaultStart={loc} letter={item.l} ></Letter>)
  //         r.push(<tr id={item.l}><td>{item.l}</td><td>{item.fullname}</td><td>{item.formalName}</td></tr>)
  //       })
  //       setRows(r)
  //     }
  //   }, [real, HoL])

  return (
    <>
      <button onClick={showValue}>showValue</button>

      {JSON.stringify(abcValue, null, 10)}
      <br></br>
    </>
  )
}

SecondPass.propTypes = {
  abcValue: PropTypes.array,
  getABCFunc: PropTypes.func,
};

export default SecondPass;