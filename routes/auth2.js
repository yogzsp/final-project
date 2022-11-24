const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import validation
const { registerValidation } = require('../configs/validation')

// import models
const Admin = require('../models/Admin')

// Register
router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // if email exist
    const emailExist = await Admin.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Sudah digunakan !'
    })
    
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const admin = new Admin({
        nama: req.body.nama,
        email: req.body.email,
        password: hashPassword
    })

    //create admin
    try {
        const saveAdmin = await admin.save()
        res.json(saveAdmin)
    }catch(err){
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal Membuat admin baru'
        })
    
    }
})


// Login 
router.post('/login', async (req, res) => {

    // if email exist
    const admin = await Admin.findOne({email: req.body.email})
    if(!admin) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Anda Salah!'
    })

    // check password
    const validPwd = await bcrypt.compare(req.body.password, admin.password)
    if(!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: 'Password Anda Salah!'
    })

    // membuat token menggunkan JWT
    const token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY2)
    res.header('authadmin', token).json({
        token: token
    })
})

module.exports = router