const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config.js');
require('dotenv').config();

const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio Publico
app.use(express.static('public'));

//Parseo y lectura del Body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routers/auth'));
app.use('/api/events', require('./routers/events'));

/* app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
}) */

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})