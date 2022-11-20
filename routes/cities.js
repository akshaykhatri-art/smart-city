const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { citySchema, reviewSchema } = require('../schemas')
const ExpressError = require('../utils/ExpressError');
const City = require('../models/city');

const validateCity = (req, res, next) => {
    const { error } = citySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const cities = await City.find({}).sort({ population: -1 });
    res.render('cities/index', { cities });
}));

router.get('/new', (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be signed in');
        return res.redirect('/login');
    }
    res.render('cities/new');
});

router.post('/', validateCity, catchAsync(async (req, res, next) => {
    // if (!req.body.city) throw new ExpressError('Invalid City Data', 400)
    const city = new City(req.body.city);
    await city.save();
    req.flash('success', 'Successfully made a new city!');
    res.redirect(`/cities/${city._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const city = await City.findById(req.params.id).populate('reviews');
    if (!city) {
        req.flash('error', 'City not found!');
        return res.redirect('/cities');
    }
    res.render('cities/show', { city });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const city = await City.findById(req.params.id);
    if (!city) {
        req.flash('error', 'City not found!');
        return res.redirect('/cities');
    }
    res.render('cities/edit', { city });
}));

router.put('/:id', validateCity, catchAsync(async (req, res) => {
    const { id } = req.params;
    const city = await City.findByIdAndUpdate(id, { ...req.body.city });
    req.flash('success', 'Successfully updated city!');
    res.redirect(`/cities/${city._id}`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted city!')
    res.redirect('/cities');
}));

module.exports = router;