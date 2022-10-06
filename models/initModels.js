// Models
const { User } = require('./user.model')
const { Song } = require('./song.model')
const { Album } = require('./album.model')
const { Artist } = require('./artist.model')

const initModels = () => {
    // 1 Artist <---> M Album
    Artist.hasMany(Album, { foreignKey: 'artistId' })
    Album.belongsTo(Artist)

    // 1 Album <---> M Song
    Album.hasMany(Song, { foreignKey: 'albumId' })
    Song.belongsTo(Album)

    // M User <---> M Song
    User.belongsToMany(Song, { through: 'favoriteSong', foreignKey: 'userId' })
    Song.belongsToMany(User, { through: 'favoriteSong', foreignKey: 'songId' })
}

module.exports = { initModels }
