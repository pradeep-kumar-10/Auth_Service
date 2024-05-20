const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUser(data){
        try{
            const user = await this.userRepository.createUser(data);
            return user;
        } catch(error){
            console.log('Something went wrong in user service');
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try{
            const user = await this.userRepository.getUserByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            const newJWT = this.createToken({email: user.email, id: user.id});

            return newJWT;
        } catch(error){
            console.log('Something went wrong in user service');
            throw error;
        }
    }
    
    async isAuthenticated(token){
        try{
            const response = this.verifyToken(token);
            if(!response){
                throw { error: 'Invalid token'}
            }
            const user = this.userRepository.getUserById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch(error){
            console.log('Something went wrong in user service');
            throw error;
        }
    }

    async createToken(user){
        try{
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d'});
            return result;
        } catch(error){
            console.log('Something went wrong in token creation');
            throw error;
        }
    }

    verifyToken(token){
        try{
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch(error){
            console.log('Something went wrong in token validation');
            throw error;
        }
    }

    checkPassword(userPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userPassword, encryptedPassword);
        } catch(error){
            console.log('Something went wrong in password checking');
            throw error;
        }
    }
}

module.exports = UserService;