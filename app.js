const express=require('express')
const morgan=require('morgan')
const cors=require('cors');
const userRoute=require('./router/user.route')
const bookROute=require('./router/book.route')
const {default:mongoose}=require('mongoose');
const config=require('./config')
const app=express();
mongoose.connect(config.DB_URL)
.then(()=>console.log('conected to mong db '))
.catch(error=>console.log(error))
app.use(express.json()) // אם שולחים אוביקט מהקליינט
app.use(express.urlencoded({ extended: false })) // אם שולחים קבצים מהקליינט
app.use(morgan('dev'));//printing the information of the request 
app.use(cors())//enable access to all api's addresses
app.use('/user',userRoute)
app.use('/book',bookROute)
app.get("/", (req, res) => {
    res.send("wellcome");
  });
const port=5000;
app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})