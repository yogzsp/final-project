const Joi = require('@hapi/joi')

const createValidation = (data) => {
    const schema = Joi.object({
        nama: Joi.string()
            .required()
            .min(3),
        guru: Joi.string()
            .required()
            .min(3)
    })

    return schema.validate(data)
}


module.exports = {
    createValidation:createValidation
}