const express=require('express')

const userRoute=require('./router/user.route')
const bookROute=require('./router/book.route')
const app=express();

app.use(express.json()) // אם שולחים אוביקט מהקליינט
app.use(express.urlencoded({ extended: false })) // אם שולחים קבצים מהקליינט

app.use('/user',userRoute)
app.use('/book',bookROute)
const port=5000;
app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})