
const dotenv = require("dotenv");
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
//static files we are going to use
const indexRouter = require('./routes/index');
const { url } = require('inspector');
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.set('layout','layouts/layout');

app.use(express.static('public'));
//connection
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.DATABASE_URL,{
//    useNewUrlParser:true ,
//    useUnifiedTopology: true,
// });
// const db=mongoose.connection
// db.on('error', err=>{console.error(err)})
// db.once('open',()=>{console.log('connected to mongoose')})

mongoose.set('strictQuery', false);
let connectDb = async() => {
    try {
        let connect = await mongoose.connect('mongodb://localhost:27017/tutorial', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        })
        console.log(connect.connection.host);

    } catch (e) {
        console.log(e.message)
    }
}
connectDb();
// Methods
app.use('/',indexRouter);
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`our app is listening on ${port}`);
});