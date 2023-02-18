
const dotenv = require("dotenv");
dotenv.config();
if(process.env.NODE_ENV !== 'production'){
    dotenv.config; //import config.env file
    const envVariable=Buffer.from('API_KEY=apikey');
     require('dotenv').parse(envVariable);
     
}
// those are main routes we defines 
let express = require('express');
const app = express();
const expressLayouts=require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const authorRouter=require('./routes/authors');
const bodyParser=require('body-parser');
//static files we are going to use
const indexRouter = require('./routes/index');
const { url } = require('inspector');
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.set('layout','layouts/layout');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//connetion to database
mongoose.set('strictQuery', false);
const urI=process.env.MONGO_URL;
let connectDb = async() => {
    try {
        await mongoose.connect(`${urI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        })
        console.log('connected');

    } catch (e) {
        console.log(e.message)
    }
}
connectDb();
// Methods
app.use('/',indexRouter);
//author accessing
 app.use('/authors',authorRouter);
//listening port_number
const port=process.env.PORT || 3000;
//this is call of port_number
app.listen(port,()=>{
    console.log(`our app is listening on ${port}`);
});