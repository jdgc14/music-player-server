const express = require('express')

// Controllers
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
} = require('../controllers/users.controller')

// Middlewares
const { userExists } = require('../middlewares/users.middlewares')
const {
    protectSession,
    protectUsersAccount,
} = require('../middlewares/auth.middlewares')

// Validators
const {
    createUserValidators,
    updateUserValidators,
} = require('../middlewares/validators.middlewares')

const usersRouter = express.Router()

usersRouter.post('/signup', createUserValidators, createUser)

usersRouter.post('/login', login)

// Protecting below endpoints
usersRouter.use(protectSession)

usersRouter.get('/', getAllUsers)

usersRouter.patch(
    '/:id',
    userExists,
    protectUsersAccount,
    updateUserValidators,
    updateUser
)

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser)

module.exports = { usersRouter }
