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


module.exports = {
    numberToExcelLikeLetters,
    getNewXY_fromAngleAndDistance
}