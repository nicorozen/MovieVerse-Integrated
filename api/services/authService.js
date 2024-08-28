require("dotenv").config();
const bcrypt = require("bcryptjs");
const { User } = require("../db/db");

class AuthService {
  async hasValidCredentials(email, password) {
    try {
      const user = await User.findOne({ email });
      
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
          return true;
        }
      }
      return false;

    } catch (err) {
      console.error(err);
      throw new Error("Error in credentials validation");
    }
  }
}

module.exports = new AuthService();
