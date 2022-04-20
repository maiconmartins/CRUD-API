const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

//Im telling I wanna to tell the program to run on the port specified in the file config.env
dotenv.config({path:'config.env'})

const PORT= process.env.PORT||3000

//log request
app.use(morgan('tiny'));

// mongodb connection
connectDB();

//parsing a request to body parser
app.use(bodyparser.urlencoded({ extended : true}))

//setting the view
app.set("view engine", "ejs")


//loading my assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/images', express.static(path.resolve(__dirname, "assets/images")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.get('/',(req,res )=> {res.render('index');  })


app.listen(PORT,() => {console.log('Server is running on http://localhost:${PORT}')})