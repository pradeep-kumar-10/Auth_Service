const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

// const UserService = require('./services/user-service');

const setupAndStartServer = async() => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server started at ${PORT}`);
    });

    // const userService = new UserService();
    // const newToken = await userService.createToken({email: 'pradeep@admin.com', id: 3})
    // console.log('new token is', newToken);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWRlZXBAYWRtaW4uY29tIiwiaWQiOjMsImlhdCI6MTcxNjE5NTg3NywiZXhwIjoxNzE2MjgyMjc3fQ.CeDoJO7IfO3y3W3j_VCA75b4enjfYfhrfBi2h-gQ-D0';
    // const response = userService.verifyToken(token);
    // console.log(response);
    
}

setupAndStartServer();