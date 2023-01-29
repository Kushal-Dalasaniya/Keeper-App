require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {connectDB} = require('./models/keeperModel');
const session = require("express-session");
const passport=require("passport");
const {keeperRouter} = require("./routes/keeperRoute");
const {userRoute} = require('./routes/userRoute');

const app=express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({ secret:process.env.SECRET , 
  resave: false, 
  saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport. session());

app.use(keeperRouter);
app.use(userRoute);

connectDB().then(() => {
  app.listen(process.env.PORT||4000, function() {
    console.log("Server started on port "+process.env.PORT);
  });
})

module.exports={app}



