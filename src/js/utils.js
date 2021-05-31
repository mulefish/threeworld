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
// class Rectangle {
//     constructor(height, width) {
//         this.height = height;
//         this.width = width;
//     }
// }

// class Item {
//     constructor(file, i, _width, _height, _depth) {
//         this.f = file
//         this.l = numberToExcelLikeLetters(i)
//         this.width = _width;
//         this.height = _height;
//         this.depth = _depth;
//     }
// }

function getData() {
    const ary = getRawData()
    let data = []
    ary.forEach((item, i) => {
        const obj = {
            x: (Math.random() * 1000) - 500,
            y: (Math.random() * 1000) - 500,
            z: (Math.random() * 1000) - 500,
            l: numberToExcelLikeLetters(i),
            f: item,
            ary: item.split("/")
        }
        data.push(obj)
    })
    return data
}

module.exports = {
    numberToExcelLikeLetters,
    getNewXY_fromAngleAndDistance,
    getRawData,
    getData
}