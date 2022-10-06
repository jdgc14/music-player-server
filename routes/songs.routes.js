const express = require('express')

// Controllers
const {
    createSong,
    getAlbumSongs,
    updateSongById,
    deleteSongById,
    getFavoritesSongs,
    favoriteSong,
} = require('../controllers/songs.controller')

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares')
const { albumExists } = require('../middlewares/albums.middlewares')
const {
    songExists,
    checkSongIsFavorite,
} = require('../middlewares/songs.middlewares')

// Validators
const { songValidators } = require('../middlewares/validators.middlewares')

const songsRouter = express.Router()

songsRouter.get('/:albumId', albumExists, getAlbumSongs)

songsRouter.use(protectSession)

songsRouter.post('/:albumId', albumExists, songValidators, createSong)

songsRouter.patch('/:id', songExists, songValidators, updateSongById)

songsRouter.delete('/:id', songExists, deleteSongById)

songsRouter.get('/favorite/songs', getFavoritesSongs)

songsRouter.post(
    '/favorite/:songId',
    songExists,
    checkSongIsFavorite,
    favoriteSong
)

module.exports = { songsRouter }
