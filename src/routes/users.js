const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');

router.get('/', (req, res) => {
    const database = new Database('sample');
    database.find().toArray((err, results) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            console.log('Usuarios: ', results);
            res.send(results);
        }
    });
})

module.exports = router;