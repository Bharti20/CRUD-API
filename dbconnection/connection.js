const mongoose = require('mongoose');
const db_url = "mongodb+srv://bhartidb:mongodb@cluster0.acso5.mongodb.net/userData?retryWrites=true&w=majority"
require('dotenv').config();
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database Connected')
}).catch((err) => {
    console.log(err)
});

module.exports = mongoose