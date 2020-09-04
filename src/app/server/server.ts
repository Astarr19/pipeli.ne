"use strict";
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
let cart = require('./cart');
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use('/cart-items', cart);
app.get('*',(req,res)=>{
    res.json({message:'This ain\'t it boss'});
})

app.listen(port, ()=>{console.log(`Server listening on port ${port}`)});