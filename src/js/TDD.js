// import { numberToExcelLikeLetters } from "./utils.js";


const { numberToExcelLikeLetters, getNewXY_fromAngleAndDistance, getRawData, getData } = require('./utils.js');

const test_getNewXY_fromAngleAndDistance = () => {
    const givens = [
        { x: 0, y: 0, angle: 0, distance: 0, newX: 0, newY: 0 },
        { x: 0, y: 0, angle: 0, distance: 100, newX: 100, newY: 0 },
        { x: 0, y: 0, angle: 90, distance: 100, newX: 0, newY: 100 },
        { x: 0, y: 0, angle: 180, distance: 100, newX: -100, newY: 0 },
        { x: 0, y: 0, angle: 270, distance: 100, newX: -0, newY: -100 },
        { x: 0, y: 0, angle: 360, distance: 100, newX: 100, newY: -0 },
    ]
    let allGood = true
    givens.forEach((obj, i) => {
        const r = getNewXY_fromAngleAndDistance(obj)
        if (r.x != obj.newX) {
            allGood = false
        }
        if (r.y != obj.newY) {
            allGood = false
        }
    })
    if (allGood === true) {
        console.log("PASS test_getNewXY_fromAngleAndDistance")
    } else {
        console.log("FAIL test_getNewXY_fromAngleAndDistance")
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
    const ary = getRawData()
    const data = getData()
    let isOk = true
    if (ary.length !== data.length && data.length > 0) {
        console.log("FAIL test_getData lengths wrong ")
        isOk = false
    }
    const obj = data[0]
    if (obj.x && obj.y && obj.z && obj.l && obj.f && obj.ary && obj.ary.length > 0) {
        // 
    } else {
        console.log("FAIL test_getData ill formed obj ")
    }

    if (isOk === true) {
        console.log("PASS test_getData")
    }

}

const init = () => {
    test_letter()
    test_getNewXY_fromAngleAndDistance()
    test_getRawData()
    test_getData()
}
init()