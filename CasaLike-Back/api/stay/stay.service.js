const dbService = require('../../services/db.service.js');
const logger = require('../../services/logger.service.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById
}

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy);
        // const sort = _buildSort(filterBy);
        const collection = await dbService.getCollection('stay');
        console.log(criteria);
        var stays = await collection.find(criteria.location).toArray();
        console.log(stays.length);
        return stays;
    } catch (err) {
        console.log('Cannot find stays', err);
        logger.error('Cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    console.log('stayId', stayId)
    try {
        const collection = await dbService.getCollection('stay');
        const stay = collection.findOne({ '_id': ObjectId(stayId) });
        //console.log('stay', stay)
        return stay;
    } catch (err) {
        logger.error(`While finding stay ${stayId}`, err)
        throw err
    }
}

// for host functions
// async function remove(stayId){

// }

// async function add(stay){

// }

// async function update(stay){

// }

function _buildCriteria(filterBy) {
    const criteria = {}


    const locationCriteria = { "address.city": { $regex: filterBy.location, $options: 'i' } }
    criteria.location = locationCriteria;


    return criteria

}


