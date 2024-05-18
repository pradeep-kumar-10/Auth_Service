const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

// const bcrypt = require('bcrypt');
// const {User} =require('./models/index');

const setupAndStartServer = async() => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server started at ${PORT}`);
    });

    // checking the password with encrypted password
    // const mypassword = '123456';
    // const user = await User.findByPk(7);
    // const response = bcrypt.compareSync(mypassword, user.password);
    // console.log(response);

}

setupAndStartServer();