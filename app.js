const express = require('express');
const app = express();
// para hacer url's de archivos (tanto en windows, linux...) - sin preocuparnos por / o \
const path = require('path');
const router = express.Router();
const Database = require('./src/models/database');
// router de users
const apiRoutes = require('./src/routes');
const userRoutes = require('./src/routes/users');

const MongoClient = require('mongodb').MongoClient;
let database;

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const port = process.env.PORT || 3000;

// assets es la carpeta 'mock' de public
app.use('/assets', express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
    // parámetros que conforman la URL
    res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
});

// se usará router en toda la app.
app.use(router);

// usar router de users
app.use('/users', userRoutes);
app.use('/api', apiRoutes);

MongoClient.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true
}, function (err, client) {
    if (err) {
        console.log('Failed to connect to MongoDB');
    } else {
        console.log('DB connected (:');
        database = client.db();
        Database.setDatabase(database);

        app.listen(port, () => {
            console.log('App is listening in port: ' + port);
        })

        // collection.find().toArray((err, results) => {
        //     if (err) {
        //         console.log('Error: ', err);
        //     } else {
        //         console.log('Usuarios: ', results);
        //     }
        // });
        // ejemplo de where
        // collection.find({
        //     username: 'leerman'
        // })((err, results) => {
        //     if (err) {
        //         console.log('Error: ', err);
        //     } else {
        //         console.log('Usuarios: ', results);
        //     }
        // });
        // collection.findOne({ username: 'lerman' }).then(results => {
        //     if (results) {
        //         console.log('User: ', results);
        //     } else {
        //         console.log('No user found');
        //     }
        // }).catch(err => { });

    }
});
