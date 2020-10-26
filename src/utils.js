require('dotenv').config()

const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.JWT_APP_SECRET;

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const userObj = jwt.verify(token, APP_SECRET);

    return userObj.userId;
  }
  throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId
};