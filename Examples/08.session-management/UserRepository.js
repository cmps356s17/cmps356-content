class UserRepository {

    constructor() {
        this.fs = require('fs-promise')
    }

    async login(username, password) {
        const data = await this.fs.readFile('data/users.json')
        const users = JSON.parse(data)

        let user = users.find(u => u.username === username && u.password === password)
        if (user != "undefined") {
            //Do not return the user password, remove it
            delete user.password
            return user
        }
        else {
            throw "Username and/or password invalid"
        }
    }
}

module.exports = new UserRepository()