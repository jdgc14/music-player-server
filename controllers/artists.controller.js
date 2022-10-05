// Models
const { Artist } = require('../models/artist.model')
const { Album } = require('../models/album.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const {
    uploadArtistPhoto,
    getArtistImg,
    getAllArtistImg,
    uploadAlbumPhoto,
} = require('../utils/firebase.util')

// >C< R U D
const createArtist = catchAsync(async (req, res, next) => {
    const { name, genre } = req.body

    const newArtist = await Artist.create({
        name,
        genre,
    })

    const imgUrl = await uploadArtistPhoto(req.file, newArtist.id)

    await newArtist.update({ imgUrl })

    res.status(201).json({
        status: 'success',
        data: { newArtist },
    })
})

// C >R< U D
const getArtistById = catchAsync(async (req, res, next) => {
    const { artist } = req

    const imgUrl = await getArtistImg(artist)

    artist.imgUrl = imgUrl

    res.status(200).json({
        status: 'success',
        data: { artist },
    })
})

const getArtists = catchAsync(async (req, res, next) => {
    const artists = await Artist.findAll({
        where: { status: 'active' },
    })

    await getAllArtistImg(artists)

    res.status(200).json({
        status: 'success',
        data: { artists },
    })
})

// C R >U< D
const updateArtistById = catchAsync(async (req, res, next) => {
    const { artist } = req

    const { name } = req.body

    await artist.update({
        name,
    })

    res.status(200).json({
        status: 'success',
        data: { artist },
    })
})

// C R U >D<
const deleteArtistById = catchAsync(async (req, res, next) => {
    const { artist } = req

    await artist.update({
        status: 'deleted',
    })

    res.status(204).json({
        status: 'success',
        data: { artist },
    })
})

const createArtistAlbum = catchAsync(async (req, res, next) => {
    const { artistId } = req.params
    const { title, genre } = req.body

    const newAlbum = await Album.create({ artistId, title, genre })

    const imgUrl = await uploadAlbumPhoto(req.file, newAlbum.id)

    await newAlbum.update({ imgUrl })

    res.status(201).json({
        status: 'success',
        data: { newAlbum },
    })
})

module.exports = {
    createArtist,
    getArtistById,
    getArtists,
    updateArtistById,
    deleteArtistById,
    createArtistAlbum,
}
