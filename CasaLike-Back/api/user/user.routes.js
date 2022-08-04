const express = require('express')
// const { requireAuth, requireHost } = require('../../middlewares/requireAuth.middleware.js')
const { getUser, getUsers } = require('./user.controller.js')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/:id', getUser)
// router.put('/:id', requireAuth, updateUser)
// router.put('/:id',  requireAuth, updateUser)
// router.delete('/:id', requireAuth, requireHost, deleteUser)

module.exports = router