const { array } = require('joi')
const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    bacaan: {
        type: String,
        required: true
    },
    soal: {
        type: String,
        required: true
    },
    jawaban: {
        type: String,
        required: true
    },
    kelas: {
        type: mongoose.ObjectId,
        ref: "Kelas"
    },
    // option untuk jawaban yang benar dari setiap pertanyaan
    // option: {
    //     type: Array,
    //     default:[]
    // }
})

module.exports = mongoose.model('Quiz', quizSchema)