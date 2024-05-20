const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

// const UserRepository = require('./repository/user-repository');

const setupAndStartServer = async() => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server started at ${PORT}`);
    });

    // const userRepo = new UserRepository();
    // const response = await userRepo.getUserById(3);
    // console.log(response);

}

setupAndStartServer();