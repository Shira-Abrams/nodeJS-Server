const express=require('express')
const morgan=require('morgan')
const cors=require('cors');

const userRoute=require('./router/user.route')
const bookROute=require('./router/book.route')

const {pageNotFound,ErrorCghout}=require('./middlewares/handleErrors')
// process.env ומכניס את ערכיו לתוך .env קורא את כל התוכן מהקובץ
require('dotenv').config();
// חיבור למסד נתונים
require('./config/db')

const app=express();

app.use(express.json()) // אם שולחים אוביקט מהקליינט
app.use(express.urlencoded({ extended: false })) // אם שולחים קבצים מהקליינט
app.use(morgan('dev'));//printing the information of the request 
app.use(cors())//enable access to all api's addresses
app.use('/user',userRoute)
app.use('/book',bookROute)
//none existing url
app.use(pageNotFound)
//when error acur
app.use(ErrorCghout)
app.get("/", (req, res) => {
    res.send("wellcome");
  });
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})