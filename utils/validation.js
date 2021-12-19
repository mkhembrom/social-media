const Joi = require('joi');

const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        
        // username: Joi.string()
        //     .alphanum()
        //     .min(3)
        //     .max(30)
        //     .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return schema.validate(data);
};

const registerValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        
        name: Joi.string()
            .alphanum()
            .min(4)
            .max(30)
            .required(),

        password: Joi.string()
            .min(4)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        
        // confirm_password: Joi.ref('password'),
    });

    return schema.validate(data);
};

module.exports = {
    loginValidate,
    registerValidate
}

