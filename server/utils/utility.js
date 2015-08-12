var jwt = require('jwt-simple');


// decodes the token to identify the user and appends the information to the request
module.exports = {
  decode: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user;
    if (!token) {
      return res.send(403); //send forbidden if token is not provided
    }
    try {
      user = jwt.decode(token, 'secret');
      req.user = user;
      console.log('User ----------------->', req.user);
      next();
    } catch (error) {
      return next(error);
    }
  }
}