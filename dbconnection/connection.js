const mongoose = require('mongoose');
const db_url = "mongodb+srv://bharti_mongodb:mongodb@cluster0.megcq.mongodb.net/crud_backend?retryWrites=true&w=majority"
require('dotenv').config();

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connected')
}).catch((err) => {
    console.log(err)
});
