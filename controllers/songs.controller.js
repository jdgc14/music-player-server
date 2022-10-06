// Models
const { Album } = require('../models/album.model')
const { Song } = require('../models/song.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')

// >C< R U D
const createSong = catchAsync(async (req, res, next) => {
    const { title } = req.body
    const { albumId } = req.params

    const newSong = await Song.create({ title, albumId })

    res.status(201).json({
        status: 'success',
        data: { newSong },
    })
})

// C >R< U D
const getAlbumSongs = catchAsync(async (req, res, next) => {
    const id = req.params.albumId

    const album = await Album.findOne({
        where: { id },
        include: { model: Song },
    })

    res.status(200).json({
        status: 'success',
        data: { album },
    })
})

// C R >U< D
const updateSongById = catchAsync(async (req, res, next) => {
    const { song } = req
    const { title } = req.body

    await song.update({ title })

    res.status(201).json({
        status: 'success',
        data: { song },
    })
})

// C R U >D<
const deleteSongById = catchAsync(async (req, res, next) => {
    const { song } = req

    await song.update({ status: 'deleted' })

    res.status(204).json({
        status: 'success',
        data: { song },
    })
})
module.exports = { createSong, getAlbumSongs, updateSongById, deleteSongById }
