const express = require('express')
const app = express()
app.use(express.json())
const callApis = require('./routes/index')

app.use('/', callApis)

app.listen(7000, (err) => {
    if(err) throw err;
    console.log('Server is running...')
});



//mongodb+srv://bhartidb:<password>@cluster0.acso5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority