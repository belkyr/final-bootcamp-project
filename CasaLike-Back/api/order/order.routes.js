const express = require('express');
// const {requireAuth,requireHost} = require('../../middlewares');
// const { log } = require('../../middlewares/logger.middleware');
const { addOrder, getOrders,updateOrder } = require('./order.controller.js');
const router = express.Router();

router.get('/', getOrders);
router.post('/', addOrder);
router.put('/:id', updateOrder);

module.exports = router;
