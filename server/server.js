const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/Users.js');
const validateToken = require('./middlewares/validateToken.js')

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/synari_space', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    });

    app.get('/a', (req, res) => {
        res.json({message: "hello"});
    })

    

    // to validate login
    app.post('/login', async (req, res) => {
        const {username, password} = req.body;
    
        const user = await User.findOne({username});  
        //if user does not exist return this
        if(user === null){
            res.json({
            status: "error",
            data: "wrong username or password"
        });
        return;
    }

        const result = await bcrypt.compare(password, user.password);
        if(result){
            res.redirect('/admin')
        }
        else{
            res.json({
                status: "error",
                data: "wrong username or password"
            })
        }
    });
    //go to admin page
    app.use('/admin',validateToken);








app.listen(8080, () => {
    console.log("listening to port 8080");
});