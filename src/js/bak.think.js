const { numberToExcelLikeLetters } = require('./utils.js');


const paths = [
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

function setUniques() {
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
        const a = aryAsString.split(",")
        for (let i = 1; i <= a.length; i++) {
            const subary = a.slice(0, i)
            const ancestor = uniques[subary]
            //            console.log(subary)
            fullname += ancestor
            if (i < a.length) {
                fullname += "_"
            }
        }
        console.log(`${name} --->  ${fullname}   ---> ${aryAsString}`)
    }
}

setUniques()


