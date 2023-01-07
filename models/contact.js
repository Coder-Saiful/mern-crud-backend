const {model, Schema} = require('mongoose');
const joi = require('joi');

module.exports.Contact = model('Contact', Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    }
}, {timestamps: true}));

const validateData = data => {
    const schema = joi.object({
        name: joi.string().required().min(5).max(255),
        email: joi.string().required().min(5).max(255).email(),
        phone: joi.number().required(),
    });
    return schema.validate(data, {abortEarly: false});
};

module.exports.validateData = validateData