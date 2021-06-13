const { getData } = require('./utils.js');
class DataController {
    constructor() {
        this.data = getData()
        this.lookup = {}
        this.data.forEach((i, obj) => {
            this.lookup[obj.l] = i
        })
    }
    updatePosition(letter, pos) {
        const index = this.lookup[letter]
        this.data[index].x = pos.x
        this.data[index].y = pos.y
        this.data[index].z = pos.z
    }
}

// const dataController = new DataController()

module.exports = {
    DataController
}