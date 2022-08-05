const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const todos = require('./routes/todos.js');
const cors = require('cors');
const Todo = require('./models/todo.js')
const app = express();

//to parse the data into json format
app.use(express.json());

//assign the environment port into  PORT variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

//connect to the database
mongoose.connect(process.env.DB_URL)
.then(() => 
    console.log("successfully connected to the database")
).catch(err => console.log(err))

//using cors, --- this server is public and anyone can make a request on it ---
app.use(cors());

Todo({
    item: "matulog"
}).save();

//todos routes
app.use('/',todos);


