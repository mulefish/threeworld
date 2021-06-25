const { getHoL_fromAry, numberToExcelLikeLetters, getNewXY_fromAngleAndDistance, getRawData, getData, updateData, getLookup, getFromToCollection_recurse_step1 } = require('./utils.js');

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
    const arrayOfPoints = getFromToCollection_recurse_step1()
    // console.log(JSON.stringify(arrayOfPoints, null, 2))
    const isOk = arrayOfPoints.length > 5 && arrayOfPoints[0].hasOwnProperty("from") && arrayOfPoints[0].hasOwnProperty("to")
    if (isOk === true) {
        console.log("PASS test_getFromToCollection_recurse_step1 ( recursive magic! )")
    } else {
        console.log("FAIL test_getFromToCollection_recurse_step1 ( recursive magic! )")
    }
    return arrayOfPoints
    // console.log(JSON.stringify(arrayOfPoints, null, 2))

    // let HoL = {}
    // arrayOfPoints.forEach((item) => {
    //     if (!HoL.hasOwnProperty(item.from)) {
    //         HoL[item.from] = []
    //     }
    //     HoL[item.from].push(item.to)
    // })

    // let keys = Object.keys(HoL)
    // keys = keys.sort()
    // let j = 0
    // keys.forEach((k) => {
    //     let ary = HoL[k]
    //     console.log(k)
    //     ary.forEach((a) => {
    //         console.log("\t", j, a)
    //         j++
    //     })
    // })

}
function test_getHoL_fromAry(arrayOfPoints) {
    const HoL = getHoL_fromAry(arrayOfPoints)

    let keys = Object.keys(HoL)
    keys = keys.sort()
    let j = 0

    keys.forEach((k) => {
        let ary = HoL[k]
        //console.log(k)
        ary.forEach((a) => {
            //console.log("\t", j, a)
            j++
        })
    })

    const isOk = j > 10 && keys.length < j
    if (isOk) {
        console.log("PASS test_getHoL_fromAry j " + j + " and " + keys.length + "  isOk " + isOk)
    } else {
        console.log("FAIL test_getHoL_fromAry j " + j + " and " + keys.length + "  isOk " + isOk)
    }
}

const init = () => {
    test_letter()
    test_getNewXY_fromAngleAndDistance()
    test_getRawData()
    test_getData()
    test_getLookup()
    test_updateData()
    let theArrayOfPoints = test_getFromToCollection_recurse_step1()
    test_getHoL_fromAry(theArrayOfPoints)
}
init()