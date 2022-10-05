// Models
const { Artist } = require('../models/artist.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { uploadArtistPhoto, getArtistImg } = require('../utils/firebase.util')

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
const getArtists = catchAsync(async (req, res, next) => {
    const artists = Artist.findAll({
        where: { status: 'active' },
    })
})

const getArtistById = catchAsync(async (req, res, next) => {
    const { artist } = req

    const imgUrl = await getArtistImg(artist)

    artist.imgUrl = imgUrl

    res.status(200).json({
        status: 'success',
        data: { artist },
    })
})

module.exports = { createArtist, getArtistById }
