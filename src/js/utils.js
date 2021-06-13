let data = undefined
let lookup = {}

function numberToExcelLikeLetters(num) {
    // 0 = A
    // 1 = B
    // 25 = Z
    // 26 = AA
    // 27 = AB
    // 100 = CW
    // 1000 = ALM 
    // 10000 = NTQ 
    // etc etc 
    let letters = '';
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters;
        num = Math.floor(num / 26) - 1;
    }
    return letters
}

function getNewXY_fromAngleAndDistance({ x, y, angle, distance }) {
    const result = {
        x: Math.round(Math.cos((angle * Math.PI) / 180) * distance + x),
        y: Math.round(Math.sin((angle * Math.PI) / 180) * distance + y),
    }
    return result

}


const getRawData = () => {
    const x = [
        "src",
        "src/index.js",
        "src/app.js",
        //
        "src/redux/",
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
    return x;
}
function getData() {
    // 
    if (data === undefined) {
        data = []
        const ary = getRawData()

        ary.forEach((item, i) => {
            const angle = Math.random() * 360

            const xy = getNewXY_fromAngleAndDistance({ x: 0, y: 0, angle: angle, distance: 200 })
            const obj = {
                x: xy.x,
                y: xy.y,
                z: 0,
                l: numberToExcelLikeLetters(i),
                f: item,
                ary: item.split("/")
            }
            lookup[obj.l] = i;
            data.push(obj)
        })
    }
    return data
}
function getLookup() {
    return lookup
}
function updateData(letter, newPosAry) {
    const index = lookup[letter]
    // // console.log(JSON.stringify(lookup, null, 2))
    data[index].x = newPosAry[0]
    data[index].y = newPosAry[1]
    data[index].z = newPosAry[2]
    // console.log(" SKSKSKSKSKS " + letter + " and " + newPosAry)
}


module.exports = {
    numberToExcelLikeLetters,
    getNewXY_fromAngleAndDistance,
    getRawData,
    getData,
    updateData,
    getLookup

}