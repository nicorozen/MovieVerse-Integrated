const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const swagger = require('swagger-ui-express');

const { sequelize } = require('./db/db');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'jwt']
  }));


app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

app.on('error', (err) => {
    console.log('Server error: ', err);
});

app.use('/api/users', require('./routes/users'));
app.use('/api/lists', require('./routes/lists'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established!');
    })
    .catch(err => {
        console.log('Error: ', err);
    });