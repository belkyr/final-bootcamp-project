const stayService = require('./stay.service.js');
const logger = require('../../services/logger.service.js');


//GET list
async function getStays(req, res) {
    console.log('hi')
    try {
        console.log('backend lala');
        var queryParams = req.query;
        // console.log(queryParams);
        const stays = await stayService.query(queryParams)
        // console.log('backend', stays);
        res.json(stays)
    } catch (err) {
        console.log('Failed to get stays', err);
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
}

//GET by ID
async function getStayById(req, res) {
    try {
        const stayId = req.params.id;
        console.log('STAYID', stayId)
        const stay = await stayService.getById(stayId)
        console.log('STAY', stay)

        res.json(stay)
    } catch (err) {
        console.log('Failed to get stay', err);
        logger.error('Failed to get stay', err)
        res.status(500).send({ err: 'Failed to get stay' })
    }
}

// for host functions
// async function addStay(req,res){

// }

// async function updateStay(req,res){

// }

// async function removeStay(req,res){

// }

module.exports = {
    getStays,
    getStayById
}