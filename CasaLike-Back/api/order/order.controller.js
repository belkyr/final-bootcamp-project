const logger = require('../../services/logger.service.js')
const orderService = require('./order.service.js')

async function addOrder(req, res) {
    try {
        const order = req.body
        const addedOrder = await orderService.add(order)
        console.log('back controller', addedOrder);
        res.json(addedOrder)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
        console.log('Failed to add order', err)
    }
}

async function updateOrder(req,res){
    try{
        const order = req.body
        const updatedOrder = await orderService.update(order)
        res.json(updatedOrder)
    }catch(err){
        console.log('Failed to update order',err)
        logger.error('Failed to update order',err)
        res.status(500).send({err:'Failed to update order'})
    }
}

async function getOrders(req, res) {
    console.log('hiiiiiiiiiii')
    try {
        console.log('backend lalalalala');
        // var queryParams = req.query;
        // console.log(queryParams);
        const orders = await orderService.query()
        // console.log('backend', stays);
        res.json(orders)
    } catch (err) {
        console.log('Failed to get orders', err);
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

module.exports = {
    addOrder,
    getOrders,
    updateOrder
}