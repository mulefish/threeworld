const { len, getPosition, getHoL_fromAry, numberToExcelLikeLetters, getNewXY_fromAngleAndDistance, getRawData, getData, updateData, getLookup, getFromToCollection_recurse_step1 } = require('./utils.js');

const test_getNewXY_fromAngleAndDistance = () => {
    const givens = [
        { x: 0, y: 0, angle: 0, distance: 0 },
        { x: 0, y: 0, angle: 0, distance: 100 },
        { x: 0, y: 0, angle: 90, distance: 100 },
        { x: 0, y: 0, angle: 180, distance: 100 },
        { x: 0, y: 0, angle: 270, distance: 100 },
        { x: 0, y: 0, angle: 360, distance: 100 },
    ]
    const expected = [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 0, y: 100 },
        { x: -100, y: 0 },
        { x: -0, y: -100 },
        { x: 100, y: -0 }
    ]
    const actual = []
    givens.forEach((obj, i) => {
        const xy = getNewXY_fromAngleAndDistance(obj)
        actual.push(xy)
    })
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log("PASS test_getNewXY_fromAngleAndDistance")
    } else {
        console.log("FAIL test_getNewXY_fromAngleAndDistance")
        console.log(actual)
        console.log(expected)

    }
}



const test_letter = () => {

    const given = [0, 1, 25, 26, 27, 100, 1000, 10000]
    const actual = []
    given.forEach((n) => {
        actual.push(numberToExcelLikeLetters(n))
    })
    const result = JSON.stringify(actual)
    const expected = `["A","B","Z","AA","AB","CW","ALM","NTQ"]`

    if (expected === result) {
        console.log("PASS letterTest | " + expected)
    } else {
        console.log("FAIL letterTest | " + result)
    }
}

const test_getRawData = () => {
    const ary = getRawData()
    if (ary && ary.length > 0) {
        console.log("PASS test_getRawData")
    } else {
        console.log("FAIL test_getRawData")
    }
}

const test_getData = () => {
    const data = getData()
    // console.log(JSON.stringify(data, null, 2))
    const isOk = data[0].hasOwnProperty("x") && data[0].hasOwnProperty("id") && data[0].hasOwnProperty("fullname") && data[0].fullname.includes(data[0].id)
    if (isOk) {
        console.log("PASS test_getData")
    } else {
        console.log("FAIL test_getData")
    }
}
const test_updateData = () => {
    const data = getData()
    const before = data[25].x
    updateData("Z", [-9999999, 0, 0])
    const after = data[25].x
    const isOk = before > -9999999 && after === -9999999
    if (isOk) {
        console.log("PASS test_updateData")
    } else {
        console.log("FAIL test_updateData")
    }
}
const test_getLookup = () => {
    const len = Object.keys(getLookup()).length
    const isOk = len > 24
    if (isOk) {
        console.log("PASS test_getLookup " + len)
    } else {
        console.log("FAIL test_getLookup " + len)
    }
}
function test_getFromToCollection_recurse_step1() {
    // This is a test of one of the more complex things in this project.

    getData()
    const fromToList = getFromToCollection_recurse_step1()
    // console.log(JSON.stringify(arrayOfPoints, null, 2))
    const isOk = fromToList.length > 5 && fromToList[0].hasOwnProperty("from") && fromToList[0].hasOwnProperty("to")
    if (isOk === true) {
        console.log("PASS test_getFromToCollection_recurse_step1 ( recursive magic! )")
    } else {
        console.log("FAIL test_getFromToCollection_recurse_step1 ( recursive magic! )")
    }
    return fromToList
}
function test_getHoL_fromAry(fromToList) {
    const myData = getData()
    const lookup = getLookup(); 
    const HoL = getHoL_fromAry(fromToList, lookup)
    let keys = Object.keys(HoL)
    keys = keys.sort()
    let j = 0 
    keys.forEach((k) => {
        let ary = HoL[k]
        //console.log(k)
        ary.forEach((a) => {
            // console.log("\t", j, a)
            j++
        })
    })

    const isOk = j > 1 && keys.length < j
    if (isOk) {
        console.log("PASS test_getHoL_fromAry j " + j + " and " + keys.length + "  isOk " + isOk)
    } else {
        console.log("FAIL test_getHoL_fromAry j " + j + " and " + keys.length + "  isOk " + isOk)
    }
    return HoL
}


function test_howTheObjectsVennDiagramTogether_notReallyTestingAFunctionPerSe(fromTo, HoL) {
    const theLookup = getLookup()
    const data = getData()

    fromTo.forEach((item, i)=>{
        const f = theLookup[item.from]
        const t = theLookup[item.to]
        console.log(`${i}  from: ${item.from} | to: ${item.to}` )

        const fObj = data[f]
        const tObj = data[t]
        console.log("SSSS " + i,  item.from, item.to, f, t, fObj.x,fObj.y,fObj.z, tObj.x, tObj.y,tObj.z )
    })
}


function test_getPosition(fromTo, HoL) {
    const xyz = getPosition("A")
    const isOk = ! isNaN(xyz[0]) &&  ! isNaN(xyz[1]) &&  ! isNaN(xyz[2])  
    if (isOk === true ) {
        console.log("PASS test_getPosition => " + JSON.stringify(xyz))
    } else {
        console.log("FAIL test_getPosition => " + JSON.stringify( xyz))
    }
}

function test_len() { 
    const m1  = {
        a:1,
        b:2,
        c:3
    }
    const m2 = {}
    const m3 = undefined
    const isOk = len(m1) === 3  && len(m2) === 0 && len(m3) === 0
    if  (isOk === true ) {
        console.log("PASS test_len()")
    } else {
        console.log("FAIL test_len()")
    }

}
const init = () => {
    test_letter()
    test_getNewXY_fromAngleAndDistance()
    test_getRawData()
    test_getData()
    test_getLookup()
    test_updateData()
    const fromToList = test_getFromToCollection_recurse_step1()
    const HoL = test_getHoL_fromAry(fromToList)
    // test_howTheObjectsVennDiagramTogether_notReallyTestingAFunctionPerSe(fromToList, HoL)
    test_getPosition()
    test_len()
}
init()