// Models
const { Song } = require('../models/song.model')
const { User } = require('../models/user.model')
const { Album } = require('../models/album.model')
const { Artist } = require('../models/artist.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { getAlbumImg, getArtistImg } = require('../utils/firebase.util')

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
        attributes: ['id', 'title', 'genre', 'imgUrl'],
        include: [
            { model: Song, attributes: ['id', 'title'] },
            { model: Artist, attributes: ['id', 'name', 'genre', 'imgUrl'] },
        ],
    })

    const albumWithImg = await getAlbumImg(album)

    const imgUrl = await getArtistImg(album.artist)

    albumWithImg.artist.imgUrl = imgUrl

    res.status(200).json({
        status: 'success',
        data: { album: albumWithImg },
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

const favoriteSong = (req, res, next) => {
    res.status(200).json({
        status: 'success',
    })
}

const getFavoritesSongs = catchAsync(async (req, res, next) => {
    const { id } = req.sessionUser

    const userFavoritesSongs = await User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email'],
        include: {
            model: Song,
            attributes: ['id', 'title'],
            through: { where: { favorite: true }, attributes: [] },
            // include: { model: Album, attributes: ['id', 'title', 'genre'] },
        },
    })

    res.status(200).json({
        status: 'success',
        data: { userFavoritesSongs },
    })
})

module.exports = {
    createSong,
    getAlbumSongs,
    updateSongById,
    deleteSongById,
    favoriteSong,
    getFavoritesSongs,
}
