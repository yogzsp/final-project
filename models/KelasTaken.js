const mongoose = require('mongoose')

const kelasTakenSchema = mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    kelas: {
        type: mongoose.ObjectId,
        ref: "Kelas"
    }
})

module.exports = mongoose.model('KelasTaken', kelasTakenSchema)