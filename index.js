const express = require('express');

const app = express();
const pool = require('./connect')
const path = require('path');
const ejs = require('ejs');

require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const useRoute = require('./routes/router')
app.use('', useRoute);

app.listen(process.env.PORT_NUMBER_2, ()=>{
    console.log(`app listening on port ${process.env.PORT_NUMBER_2}`)
    console.log(`${process.env.PORT_NUMBER_2}`)
})