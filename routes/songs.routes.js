const express = require('express')

// Controllers
const {
    createSong,
    getAlbumSongs,
    updateSongById,
    deleteSongById,
} = require('../controllers/songs.controller')

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares')
const { albumExists } = require('../middlewares/albums.middlewares')
const { songExists } = require('../middlewares/songs.middlewares')

// Validators
const { songValidators } = require('../middlewares/validators.middlewares')

const songsRouter = express.Router()

songsRouter.use(protectSession)

songsRouter.post('/:albumId', albumExists, songValidators, createSong)

songsRouter.get('/:albumId', albumExists, getAlbumSongs)

songsRouter.patch('/:id', songExists, songValidators, updateSongById)

songsRouter.delete('/:id', songExists, deleteSongById)

module.exports = { songsRouter }
