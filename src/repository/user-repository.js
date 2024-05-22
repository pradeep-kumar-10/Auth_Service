const { StatusCodes } = require('http-status-codes');
const {User, Role} = require('../models/index');
const ClientError = require('../utils/client-error');
const ValidationError = require('../utils/validation-error');

class UserRepository{
    async createUser(data){
        try{
            const user = await User.create(data);
            return user;
        } catch(error){
            if(error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            console.log('Something went wrong in user repository');
            throw error;
        }
    }

    async destroyUser(userId){
        try{
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch(error){
            console.log('Something went wrong in user repository');
            throw error;
        }
    }

    async getUserById(userId){
        try{
            const user = await User.findByPk(userId,{
                attributes: ['id','email']
            });
            return user;
        } catch(error){
            console.log('Something went wrong in user repository');
            throw error;
        }
    }

    async getUserByEmail(userEmail){
        try{
            const user = await User.findOne({
                where: {email: userEmail}
            });
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent',
                    'Please check your email',
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch(error){
            console.log('Something went wrong in user repository');
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch(error){
            console.log('Something went wrong in user repository');
            throw error;
        }
    }

}

module.exports = UserRepository;