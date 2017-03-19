'use strict'

class UserRepository {
    constructor() {
        this.utils = require('./Utils');
    }

    login(userCredentials) {
        return this.utils.readJsonFile('./data/users.json').then(users => {
            users = users.filter(s => s.username === userCredentials.username && s.password === userCredentials.password);
            if (users.length > 0) {
                let user = {
                    id: users[0].userId,
                    username: users[0].username,
                    name: `${users[0].firstname} ${users[0].lastname}`,
                    redirectTo: '/home'
                };
                return user;
            }
            else {
                throw "Username and/or password invalid";
            }
        });
    }
}

module.exports = new UserRepository();