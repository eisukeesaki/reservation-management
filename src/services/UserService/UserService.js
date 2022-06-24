const { logger: l } = require(__r + "/src/utils/logging/logger");

let userDb = new Map();

class UserService {
  getUserById(id) {
    const storedUser = userDb.get(id);

    if (storedUser)
      return storedUser;
    else
      return null;
  }

  createUser(id, username) {
    const user = userDb.set(id, username);
    l.info("INSERTed user %o", user);

    return userDb;
  }
}

module.exports = UserService;

