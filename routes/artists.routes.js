const express = require('express')

// Controllers
const {
    createArtist,
    getArtistById,
    getArtists,
    updateArtistById,
    deleteArtistById,
    createArtistAlbum,
} = require('../controllers/artists.controller')

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares')
const { artistExists } = require('../middlewares/artists.middlewares')

// Validators
const {
    createArtistValidators,
    updateArtistValidators,
    createAlbumValidators,
} = require('../middlewares/validators.middlewares')

// Utils
const { upload } = require('../utils/multer.util')

const artistsRouter = express.Router()

artistsRouter.get('/', getArtists)

artistsRouter.get('/:id', artistExists, getArtistById)

artistsRouter.use(protectSession)

artistsRouter.post(
    '/',
    upload.single('artistImg'),
    createArtistValidators,
    createArtist
)

artistsRouter.patch(
    '/:id',
    artistExists,
    updateArtistValidators,
    updateArtistById
)

artistsRouter.delete('/:id', artistExists, deleteArtistById)

artistsRouter.post(
    '/albums/:artistId',
    upload.single('albumImg'),
    artistExists,
    createAlbumValidators,
    createArtistAlbum
)

module.exports = { artistsRouter }
