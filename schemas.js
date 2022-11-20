const Joi = require('joi');

module.exports.citySchema = Joi.object({
    city: Joi.object({
        cityname: Joi.string().required(),
        state: Joi.string().required(),
        population: Joi.number().required().min(0),
        image: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        easeOfLiving: Joi.number().required().min(1).max(5),
        municipalPerformance: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})