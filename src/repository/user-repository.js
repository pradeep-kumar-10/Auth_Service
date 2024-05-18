const {User} = require('../models/index');

class UserRepository{
    async createUser(data){
        try{
            const user = await User.create(data);
            return user;

        } catch(error){
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
}

module.exports = UserRepository;