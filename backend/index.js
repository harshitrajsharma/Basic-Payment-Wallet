const express = require("express");
const cors = require('cors')
const routeRouter = require('./routes/index')
const { connectToDB } = require('./db');

connectToDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/v1', routeRouter);


app.listen( 3000, ()=>{
    console.log("App is listening on port http://localhost:3000");
})