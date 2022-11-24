const jwt = require('jsonwebtoken')

const verifyAdmin = (req, res, next) => {
    const token = req.header('authadmin')
    if(!token) return res.status(400).json({
        status: res.statusCode,
        message: 'Access Denied !'
    })
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY2)        
        req.user = verified
        next() 

    }catch(err){
        res.status(400).json({
            status: res.statusCode,
            message: 'Invalid Token !'
        })
    }
}

module.exports = verifyAdmin