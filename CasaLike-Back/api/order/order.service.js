const dbService = require('../../services/db.service.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    // getOrderById,
    add,
    update
}

async function query() {
    console.log('hiyaaaa');
    try {
        const collection = await dbService.getCollection('order')
        var orders = await collection.find().toArray();
        return orders;
    } catch (err) {
        console.log('Cannot find orders', err);
        logger.error('Cannot find orders', err)
        throw err
    }
}

async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        order.createdAt = Date.now()
        const addedOrder = await collection.insertOne(order)
        console.log(addedOrder);
        return addedOrder
    } catch (err) {
        logger.error('Cannot insert order', err);
        console.log('Cannot insert order', err);
        throw err;
    }
}

async function update(order) {
    try {
        let id = ObjectId(order._id)
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: id }, { $set: { ...order } })
        return order
    } catch (err) {
        console.log(`cannot update order ${order._id}`, err)
        logger.error(`cannot update order ${order._id}`, err)
        throw err
    }
}

