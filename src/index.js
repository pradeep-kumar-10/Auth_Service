const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();
// const {User, Role} = require('./models/index');
const db = require('./models/index');

const setupAndStartServer = async() => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server started at ${PORT}`);
    });

    if(process.env.DB_SYNC){
        db.sequelize.sync({ alter: true })
    }

    // const u1 = await User.findByPk(5);
    // const r1 = await Role.findByPk(1);
    // u1.addRole(r1);

    // const response = await u1.getRoles();
    // const response = await r1.getUsers();
    // const response = await u1.hasRole(r1);
    // console.log(response);
}

setupAndStartServer();