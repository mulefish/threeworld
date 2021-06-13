const { numberToExcelLikeLetters, getNewXY_fromAngleAndDistance, getRawData, getData, updateData, getLookup } = require('./utils.js');

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
const init = () => {
    test_letter()
    test_getNewXY_fromAngleAndDistance()
    test_getRawData()
    test_getData()
    test_updateData()
    test_getLookup()
}
init()