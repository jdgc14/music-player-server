const { body, validationResult } = require('express-validator')

// Utils
const { AppError } = require('../utils/appError.util')

const checkValidations = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
        const errorMessages = errors.array().map((err) => err.msg)

        const message = errorMessages.join('. ')

        return next(new AppError(message, 400))
    }

    next()
}

const createUserValidators = [
    body('name')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('password must be a string')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
    checkValidations,
]

const updateUserValidators = [
    body('name')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    checkValidations,
]

const createArtistValidators = [
    body('name')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('genre')
        .isString()
        .withMessage('genre must be a string')
        .isLength({ min: 3 })
        .withMessage('genre must be at least 3 characters'),
    checkValidations,
]

const updateArtistValidators = [
    body('name')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    checkValidations,
]

const createAlbumValidators = [
    body('title')
        .isString()
        .withMessage('title must be a string')
        .isLength({ min: 3 })
        .withMessage('title must be at least 3 characters'),
    body('genre')
        .isString()
        .withMessage('genre must be a string')
        .isLength({ min: 3 })
        .withMessage('genre must be at least 3 characters'),
    checkValidations,
]

const songValidators = [
    body('title')
        .isString()
        .withMessage('title must be a string')
        .isLength({ min: 3 })
        .withMessage('title must be at least 3 characters'),
    checkValidations,
]

module.exports = {
    createUserValidators,
    updateUserValidators,
    createArtistValidators,
    updateArtistValidators,
    createAlbumValidators,
    songValidators,
}
