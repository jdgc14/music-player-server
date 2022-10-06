// Models
const { Song } = require('../models/song.model')
const { FavoriteSong } = require('../models/favoriteSong.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const songExists = catchAsync(async (req, res, next) => {
    const id = req.params.id || req.params.songId

    const song = await Song.findOne({
        where: { id, status: 'active' },
    })

    if (!song) {
        return next(new AppError('song not found', 404))
    }

    req.song = song
    next()
})

const checkSongIsFavorite = catchAsync(async (req, res, next) => {
    const { sessionUser } = req
    const { songId } = req.params

    const favoriteExists = await FavoriteSong.findOne({
        where: { songId, userId: sessionUser.id },
    })

    if (!favoriteExists) {
        // Add song to favorites to that user
        await FavoriteSong.create({ songId, userId: sessionUser.id })
    } else {
        // Song is already in favorites, add or remove it according to its current status
        const newStatus = !favoriteExists.favorite

        await favoriteExists.update({ favorite: newStatus })
    }

    req.favoriteExists = favoriteExists

    next()
})

module.exports = {
    songExists,
    checkSongIsFavorite,
}
