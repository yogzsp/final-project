const express = require('express')
const router = express.Router()
const Kelas = require('../models/Kelas')
const jwt = require("jsonwebtoken");

const verifyAdmin = require('./verifyAdmin')
const verifyToken = require('./verifyToken')

const {createValidation} = require("../configs/validationKelas.js")


// CREATE
router.post('/',verifyAdmin, async (req, res) => {
    const { error } = createValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })
    
    const token = jwt.sign({token:req.body.nama+req.body.guru}, process.env.SECRET_KEY)

    const kelasPost = new Kelas({
        nama: req.body.nama,
        guru: req.body.guru,
        tokenKelas: token
    })

    try {
        const checkKelas = await Kelas.findOne({
            nama: kelasPost.nama,
            guru: kelasPost.guru 
         });
         if(checkKelas){
             res.status(400).json({
                 status:res.statusCode,
                 message:"Kelas sudah dibuat sebelumnya!"
             }).end()
         }else{
            const kelas = await kelasPost.save()
            res.status(200).json({
                status:res.statusCode,
                message:"Berhasil membuat kelas!"
            })
        }
    }catch(err){
        if(res.statusCode == 200) return res.status(400).json({
            status:res.statusCode,
            message:"Gagal membuat kelas!"
        })
    }
}),

// get all kelas
router.get('/', async (req, res) => {
    try {
        const kelas  = await Kelas.find()
        res.status(200).json({
            status:res.statusCode,
            message:kelas
        })
    }catch(err){
        res.status(400).json({
            status:res.statusCode,
            message:"Terjadi error saat mengambil data!"
        })
    }
}),

//get kelas by kelas id
router.get('/:id', async (req, res) => {
    try{
        const kelas = await Kelas.findById(req.params.id,(err,docs)=>{
            if(!docs){ 
                res.status(404).json({
                    status:res.statusCode,
                    message:"Kelas tidak ditemukan!"
                })
            }else{
                res.status(200).json({
                    status:res.statusCode,
                    message:docs
                })
            }
        })
    }catch(err){
        if(res.statusCode == 200) return res.status(400).json({
                status:res.statusCode,
                message:"Gagal mencari kelas!"
            })
    }
  },

// UPDATE
router.put('/:id',verifyAdmin, async (req, res) => {
    updateKelas:try{
        const kelasUpdate = await Kelas.findOneAndUpdate({_id:req.params.id},{
                nama: req.body.nama,
                guru: req.body.guru
            },
            (err,docs)=>{
                if(!docs){ 
                    res.status(404).json({
                        status:res.statusCode,
                        message:"Kelas tidak ditemukan!"
                    })
                }else{
                    res.status(200).json({
                        status:res.statusCode,
                        message:"Berhasil mengupdate kelas!"
                    })
                }
            }
        )
        
        break updateKelas
    }catch(err){
        if(res.statusCode == 200) return res.status(400).json({
                status:res.statusCode,
                message:"Gagal mengupdate kelas!"
            })
    }
}),

// DELETE
router.delete('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasUpdate = await Kelas.deleteOne({_id: req.params.id},(err,docs)=>{
            if(!docs){ 
                res.status(404).json({
                    status:res.statusCode,
                    message:"Kelas tidak ditemukan!"
                })
            }else{
                res.status(200).json({
                    status:res.statusCode,
                    message:"Berhasil menghapus kelas!"
                })
            }
        })
    }catch(err){
        if(res.statusCode == 200) return res.status(400).json({
            status:res.statusCode,
            message:"Gagal menghapus kelas"
        })
    }
})
)
module.exports = router