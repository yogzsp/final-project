const express = require('express')
const router = express.Router()
const Quiz = require('../models/Quiz')

const verifyAdmin = require('./verifyAdmin')
const verifyToken = require('./verifyToken')


// CREATE
router.post('/',verifyAdmin, async (req, res) => {
    const quizPost = new Quiz({
        nama: req.body.nama,
        bacaan: req.body.bacaan,
        soal: req.body.soal,
        jawaban: req.body.jawaban,
        kelas : req.body.kelas
    })

    try {
        const quiz = await quizPost.save()
        res.json(quiz)
    }catch(err){
        res.json({message: err})
    }
}),

// READ
router.get('/', async (req, res) => {
    try {
        const quiz  = await Quiz.find()
        res.json(quiz)
    }catch(err){
        res.json({message: err})
    }
}),


//get quiz by Id
router.get('/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id)
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "quiz has been found"});
    })

}),

//get quiz by kelasId
router.get('/:kelasId', async (req, res) => {
    const quiz = await Quiz.findById(req.params.kelasId)
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "kelas has been found"});
    })

}),

// UPDATE
router.put('/:id',verifyAdmin, async (req, res) => {
    try{
        const quizUpdate = await Quiz.updateOne({_id: req.params.id}, {
            nama: req.body.nama,
            bacaan: req.body.bacaan,
            soal: req.body.soal,
            jawaban: req.body.jawaban,
            kelas: req.body.alamat
        })
        res.json(quizUpdate)
    }catch(err){
        res.json({message: err})
    }
}),

// DELETE
router.delete('/:id',verifyAdmin, async (req, res) => {
    try{
        const quiz = await Quiz.deleteOne({_id: req.params.ppdbId})
        res.json({message: "quiz has been deleted"})
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router