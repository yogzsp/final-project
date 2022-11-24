const express = require('express')
const router = express.Router()
const Nilai = require('../models/Nilai')

const verifyAdmin = require('./verifyAdmin')
const verifyToken = require('./verifyToken')


// CREATE
router.post('/',verifyToken, async (req, res) => {
    const nilaiPost = new Nilai({
        skor: req.body.skor,
        user : req.body.user,
        quiz : req.body.quiz
    })

    try {
        const nilai = await nilaiPost.save()
        res.json(quiz)
    }catch(err){
        res.json({message: err})
    }
}),

// READ
router.get('/', async (req, res) => {
    try {
        const nilai  = await Nilai.find()
        res.json(nilai)
    }catch(err){
        res.json({message: err})
    }
}),


//get nilai by Id
router.get('/:id', async (req, res) => {
    const nilai = await Nilai.findById(req.params.id)
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "nilai has been found"});
    })

}),

//get nilai by kelasId
router.get('/:QuizId', async (req, res) => {
    const nilai = await Nilai.findById(req.params.QuizId)
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "nilai has been found"});
    })

}),

// UPDATE
router.put('/:id',verifyAdmin, async (req, res) => {
    try{
        const nilaiUpdate = await nilai.updateOne({_id: req.params.id}, {
            skor: req.body.skor,
        })
        res.json(nilaiUpdate)
    }catch(err){
        res.json({message: err})
    }
}),

// DELETE
router.delete('/:id',verifyAdmin, async (req, res) => {
    try{
        const nilai = await Nilai.deleteOne({_id: req.params.ppdbId})
        res.json({message: "nilai has been deleted"})
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router