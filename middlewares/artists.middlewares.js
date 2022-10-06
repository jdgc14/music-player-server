// Models
const { Song } = require('../models/song.model')
const { Album } = require('../models/album.model')
const { Artist } = require('../models/artist.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const artistExists = catchAsync(async (req, res, next) => {
    const id = req.params.id || req.params.artistId

    const artist = await Artist.findOne({
        where: { id, status: 'active' },
        attributes: ['id', 'name', 'genre', 'imgUrl'],
        include: {
            model: Album,
            attributes: ['id', 'title', 'genre'],
            include: { model: Song, attributes: ['id', 'title'] },
        },
    })

    if (!artist) {
        return next(new AppError('Artist not found', 404))
    }

    req.artist = artist
    next()
})

module.exports = {
    artistExists,
}
