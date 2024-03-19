const { default: mongoose } = require("mongoose");

// connect to db
mongoose.connect(process.env.DB_URL)
.then(()=>console.log('conected to mong db '))
.catch(error=>console.log(error))