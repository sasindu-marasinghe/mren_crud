const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/posts.js');



//app middilewware
app.use(bodyParser.json());
app.use(cors());


//route middileware
app.use(postRoutes);

const PORT = 8000;
//data base connection
const DB_URL = 'mongodb+srv://mass:mass123@mernapp.l1z4drn.mongodb.net/mernCrud?retryWrites=true&w=majority&appName=mernApp'

mongoose.connect(DB_URL)
.then(()=> {
    console.log('DB connectd');

})
.catch((err) => console.log('DB connection error',err));
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
});
