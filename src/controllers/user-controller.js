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
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            err: error.explanation
        });
    }
}

const signIn = async (req, res) => {
    try{
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Successfully sign in',
            err: {}
        });
    } catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            err: error.explanation
        });
    }
}

const isAuthenticated = async(req,res) => {
    try{
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'User is authenticated and token is valid',
            err: {}
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: 'Something went wrong in auth process',
            err: error
        });
    }
}

const isAdmin = async (req, res) => {
    try{
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Successfully fetch whether user is admin or not',
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
    createUser,
    signIn,
    isAuthenticated,
    isAdmin
}