const { initializeApp } = require('firebase/app')
const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require('firebase/storage')

const dotenv = require('dotenv')

dotenv.config()

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    appId: process.env.FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

// Storage service
const storage = getStorage(firebaseApp)

const uploadArtistPhoto = async (img, artistId) => {
    try {
        // name.jpg
        const [filename, extension] = img.originalname.split('.')

        const artistImg = `${
            process.env.NODE_ENV
        }/artist/${artistId}/${filename}-${Date.now()}.${extension}`

        // Create ref
        const imgRef = ref(storage, artistImg)

        // Upload img
        const result = await uploadBytes(imgRef, img.buffer)

        return result.metadata.fullPath
    } catch (err) {
        console.log(err)
    }
}

const getArtistImg = async (artist) => {
    const imgRef = ref(storage, artist.imgUrl)

    const imgUrl = await getDownloadURL(imgRef)

    return imgUrl
}

const getAllArtistImg = async (artists) => {}

module.exports = { uploadArtistPhoto, getArtistImg }