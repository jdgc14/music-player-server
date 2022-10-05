const express = require('express')

// Controllers
const {
    createArtist,
    getArtistById,
    getArtists,
} = require('../controllers/artists.controller')

// Middlewares
const { artistExists } = require('../middlewares/artists.middlewares')
const { protectSession } = require('../middlewares/auth.middlewares')

// Validators
const {
    createArtistValidators,
} = require('../middlewares/validators.middlewares')

// Utils
const { upload } = require('../utils/multer.util')

const artistsRouter = express.Router()

artistsRouter.use(protectSession)

artistsRouter.post(
    '/',
    upload.single('artistImg'),
    createArtistValidators,
    createArtist
)

artistsRouter.get('/', getArtists)

artistsRouter.get('/:id', artistExists, getArtistById)

module.exports = { artistsRouter }
