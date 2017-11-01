const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const passport=require('passport');
const config=require('./config/database');

//database connection
mongoose.connect(config.database);

//database on
mongoose.connection.on('connected',()=>{
    console.log('connected to the database =>'+config.database)
})


//database error
mongoose.connection.on('error',(err)=>{
    console.log('connection error =>'+err);
})

//start app on express server
const app = express();

//set port to 3000
const port = 3000;

//manage routes
const users=require('./routes/users');

//cors Middle ware
app.use(cors());

//bodyParser MiddleWare
app.use(bodyParser.json());

//passport MiddleWare

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//set routes
app.use('/users',users);


//set static folder
app.use(express.static(path.join(__dirname,'public')));


//index route
app.get('/',(req,res)=>{
    res.send('app works, Invalid App EndPoint');
})




//start server
app.listen(port,()=>{
    console.log('app listening on port:'+port);
})

