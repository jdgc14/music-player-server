// Models
const { Album } = require('../models/album.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const albumExists = catchAsync(async (req, res, next) => {
    const id = req.params.albumId

    const album = await Album.findOne({
        where: { id, status: 'active' },
    })

    if (!album) {
        return next(new AppError('Album not found', 404))
    }

    req.album = album
    next()
})

module.exports = {
    albumExists,
}
