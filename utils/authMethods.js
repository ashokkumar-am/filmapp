const jwt = require("jsonwebtoken");

class generateToken {
  generateToken(payload) {
    try {
      return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )
    } catch (e) {
      console.log(e);
    }
  }

  forgotPasswordGenerateToken(payload) {
    try {
      return jwt.sign(
        payload,
        process.env.FORGOT_PASSWORD_JWT_SECRET,
        { expiresIn: '24h' }
      )
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new generateToken();