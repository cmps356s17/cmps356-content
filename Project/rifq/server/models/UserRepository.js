let fs = require('fs-extra')

class UserRepository {

  async login(username, password) {
    const users = await fs.readJson('data/users.json')
    const user = users.find(s => s.username === username && s.password === password)

    if (user) {
      delete user.password
      user.name = `${user.firstname} ${user.lastname}`
      return user
    } else {
      throw "Username and/or password invalid"
    }
  }

  async getUser(id) {
    const users = await fs.readJson('data/users.json')
    return users.find(s => s.id == id)
  }

}

module.exports = new UserRepository()
