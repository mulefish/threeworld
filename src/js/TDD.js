const { getComplexIds, numberToExcelLikeLetters, getNewXY_fromAngleAndDistance, getRawData, getData, updateData, getLookup, sortData_byDepth, getFileSystemOrganize } = require('./utils.js');

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
    // 1: Data is set and 
    // 2: Lookup is built
    const data = getData()
    let isOk = true
    const obj = data[0]
    const x = obj.x
    const y = obj.y
    const z = obj.y
    if (isOk) {
        if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
            console.log("PASS test_getData")
        } else {
            console.log("FAIL test_getData")
        }
    }
    console.log(JSON.stringify(obj, null, 2))
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

const test_sortData_byDepth = () => {
    sortData_byDepth()
    let data = getData()
    let isOk = true
    for (let i = 1, j = 0; i < data.length; i++, j++) {
        const a = data[j]
        const b = data[i]
        if (a.ary.length > b.ary.length) {
            isOk = false
        }
    }
    if (isOk === true) {
        console.log("PASS test_sortData_byDepth")
    } else {
        console.log("FAIL test_sortData_byDepth")
    }
}

const test_getFileSystemOrganize = () => {

    getFileSystemOrganize()
    // const generations = getFileSystemOrganize()
    // console.log(JSON.stringify(generations, null, 22))
}
function test_getComplexIds() {
    const complex = getComplexIds()
    for (let k in complex) {
        const count = complex[k]
        console.log(count, k)
    }
    console.log(" !!!!!!!!! ")
    const ary = getLookup()
    const data = getData()
    console.log(JSON.stringify(ary, null, 2))
}


function finch() {
    const x = [
        "src",
        "src/index.js",
        "src/app.js",
        //
        "src/redux",
        "src/redux/thunks.js",
        "src/redux/types.js",
        "src/redux/redux.js",
        "src/redux/actions.js",
        //
        "src/pages/abc",
        "src/pages/abc/redux",
        "src/pages/abc/redux/thunks.js",
        "src/pages/abc/redux/types.js",
        "src/pages/abc/redux/redux.js",
        "src/pages/abc/redux/actions.js",
        "src/pages/abc/layout.js",
        "src/pages/abc/index.js",
        //
        "src/pages/classify",
        "src/pages/classify/redux",
        "src/pages/classify/redux/thunks.js",
        "src/pages/classify/redux/types.js",
        "src/pages/classify/redux/redux.js",
        "src/pages/classify/redux/actions.js",
        "src/pages/classify/layout.js",
        "src/pages/classify/index.js",
        //
        "src/pages/classify/pdfviewer/layout.js",
        "src/pages/classify/pdfviewer/index.js"
    ]
}




const init = () => {
    test_letter()
    test_getNewXY_fromAngleAndDistance()
    test_getRawData()
    test_getData()
    // test_updateData()
    // test_getLookup()
    // test_sortData_byDepth()
    // console.log(" ....................... ")
    // // test_getFileSystemOrganize()
    // test_getComplexIds()
    finch()
}
init()