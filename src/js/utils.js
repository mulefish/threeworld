function len(map) {
    if (map === undefined) {
        return 0
    }
    const k = Object.keys(map)
    return k.length
}
let data = undefined
let lookup = {}
let complexIds = {}
function numberToExcelLikeLetters(num) {
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


let uniques = {}
let uniqueCount = 0
function uniqueId(ary) {
    if (uniques.hasOwnProperty(ary)) {
        // do nothing
    } else {
        const letter = numberToExcelLikeLetters(uniqueCount)
        uniqueCount++
        uniques[ary] = letter
    }
}
function getUpdatedData() {
    return data;
}
function getData() {
    data = []
    const paths = getRawData()
    for (let i = 0; i < paths.length; i++) {
        const ary = paths[i].split("/")
        const n = ary.length;
        for (let j = 1; j <= n; j++) {
            const sub = ary.slice(0, j)
            uniqueId(sub)
        }
    }
    for (let aryAsString in uniques) {
        const name = uniques[aryAsString]
        let fullname = ""
        const ancestors = aryAsString.split(",")
        for (let i = 1; i <= ancestors.length; i++) {
            const subary = ancestors.slice(0, i)
            const ancestor = uniques[subary]
            //            console.log(subary)
            fullname += ancestor
            if (i < ancestors.length) {
                fullname += "_"
            }
        }
        const angle = Math.random() * 360
        // console.log(`${angle} : ${name} --->  ${fullname}   ---> ${aryAsString}`)

        const xy = getNewXY_fromAngleAndDistance({ x: 0, y: 0, angle: angle, distance: 200 })
        const obj = {
            // x: (Math.random() * 1000) - 500,
            // y: (Math.random() * 1000) - 500,
            x: xy.x,
            y: xy.y,
            z: parseInt(Math.random() * 500),
            l: name,
            id: name,
            depth: ancestors.length - 1,
            ancestors: ancestors,
            formalName: aryAsString.replace(/,/g, ' '),
            fullname: fullname,
            // pid: undefined
        }
        lookup[obj.l] = data.length;
        data.push(obj)
    }
    return data
}

function getLookup() {
    return lookup
}
// function updateData(letter, newPosAry) {
//     const index = lookup[letter]
//     data[index].x = newPosAry[0]
//     data[index].y = newPosAry[1]
//     data[index].z = newPosAry[2]
// }

// function sortData_byDepth() {
//     data = data.sort((a, b) => (a.ary.length > b.ary.length) ? 1 : -1)
// }

const greenlog = (msg) => {
    console.log(`%c${msg}`, "color:black; background:#90ee90;")
}

const redlog = (msg) => {
    console.log(`%c${msg}`, "color:black; background:red;")
}

const bluelog = (msg) => {
    console.log(`%c${msg}`, "color:white; background:blue;")
}


const getFromToCollection_recurse_step1 = () => {
    let max = 0
    data.forEach((item) => {
        if (item.ancestors.length > max) {
            max = item.ancestors.length
        }
    })
    // con sole(  data.length + " getFromToCollection_recurse_step1 ")
    const accumulated = getFromToCollection_recurse_step2("A", 0, data, [])
    return accumulated
}
let alreadySeen = {}
function getFromToCollection_recurse_step2(letter, loop, data, ary) {
    const index = lookup[letter]
    const obj = data[index]
    data.forEach((item) => {
        if (item.depth === (obj.depth + 1)) {
            const parent_to_child = letter + "_" + item.id

            if (alreadySeen.hasOwnProperty(parent_to_child)) {
                // skip!
            } else {
                if (item.fullname.includes(obj.fullname)) {
                    alreadySeen[parent_to_child] = 1
                    loop++
                    const fromTo = {
                        "from": obj.id,
                        "to": item.id
                    }
                    ary.push(fromTo)
                    getFromToCollection_recurse_step2(item.id, loop, data, ary)
                    // console.log("From " + fromTo.from + " to: " + fromTo.to)
                }
            }
        }
    })
    return ary
}
function getPosition(id) {
    const index = lookup[id]
    const obj = data[index]
    const xyz = [obj.x, obj.y, obj.z]
    return xyz
}

function getHoL_fromAry(fromTo) {
    let HoL = {}
    fromTo.forEach((item) => {
        if (!HoL.hasOwnProperty(item.from)) {
            HoL[item.from] = []
        }
        HoL[item.from].push(item.to)
    })
    return HoL
}



module.exports = {
    numberToExcelLikeLetters,
    getNewXY_fromAngleAndDistance,
    getRawData,
    getData,
    // updateData,
    getLookup,
    // sortData_byDepth,
    getComplexIds,
    getUpdatedData,
    getFromToCollection_recurse_step1,
    getHoL_fromAry,
    getPosition,
    greenlog,
    bluelog,
    redlog,
    len

}
