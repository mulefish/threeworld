const { WrapAroundEnding, sRGBEncoding } = require("three");

let data = undefined
let lookup = {}
let complexIds = {}
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
    return x;
}

function getComplexIds() {
    return complexIds
}

function getData() {
    // 
    if (data === undefined) {
        data = []
        const ary = getRawData()

        ary.forEach((item, i) => {
            const angle = Math.random() * 360

            const xy = getNewXY_fromAngleAndDistance({ x: 0, y: 0, angle: angle, distance: 200 })
            let ary = item.split("/")
            if (ary === undefined) {
                ary = []
            }
            const parent = ary[ary.length - 2]
            const generation = ary.length - 1
            const obj = {
                x: xy.x,
                y: xy.y,
                z: 0,
                l: numberToExcelLikeLetters(i),
                id: numberToExcelLikeLetters(i),
                f: item,
                ary: ary,
                generation: generation,
                parent: parent,
                word: ary[generation],
                pid: undefined
            }
            lookup[obj.l] = i;
            data.push(obj)
        })
        data.forEach((item, i) => {
            item.ary.forEach((name, j) => {
                const complex = j + "_" + name
                if (complexIds.hasOwnProperty(complex)) {
                    // Keep track of the count mostly because curiousity...
                    // The keys are really what matter here...
                    complexIds[complex]++
                } else {
                    complexIds[complex] = 1
                }
            })
        })




        // data.forEach((child) => {
        //     data.forEach((parent) => {
        //         if (parent.word === child.parent && parent.generation === child.generation - 1) {
        //             child.pid = "__" + parent.id
        //         }
        //     })
        // })


    }
    return data
}
function getLookup() {
    return lookup
}
function updateData(letter, newPosAry) {
    const index = lookup[letter]
    data[index].x = newPosAry[0]
    data[index].y = newPosAry[1]
    data[index].z = newPosAry[2]
}

function sortData_byDepth() {

    data = data.sort((a, b) => (a.ary.length > b.ary.length) ? 1 : -1)
}

function getFileSystemOrganize() {
    sortData_byDepth()

    data.forEach((d, i) => {
        console.log(`${i}   id ${d.id}    pid ${d.pid}   |${d.word}| ary ${JSON.stringify(d.ary)}`)
    })
}

module.exports = {
    numberToExcelLikeLetters,
    getNewXY_fromAngleAndDistance,
    getRawData,
    getData,
    updateData,
    getLookup,
    sortData_byDepth,
    getFileSystemOrganize,
    getComplexIds
}
