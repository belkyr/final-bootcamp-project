const express = require('express');
// const {requireAuth,requireHost} = require('../../middlewares');
const { log } = require('../../middlewares/logger.middleware');
const { getStays, getStayById } = require('./stay.controller.js')
const router = express.Router();

router.get('/', log, getStays);
router.get('/:id', log, getStayById);

module.exports = router;

