const UserService = require('../services/user-service');

const userService = new UserService();

const createUser = async (req, res) => {
    try{
        const response = await userService.createUser({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            data: response,
            message: 'Successfully created a new user',
            err: {}
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: error
        });
    }
}

module.exports = {
    createUser
}