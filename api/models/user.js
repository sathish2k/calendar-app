let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UsersSchema = new Schema({
      name:{
        type:'string'
      },
      oauthID:{
        type:'string'
      },
      email:{
          type:'string'
      },
      token:{
        type:'string'
      },
      created:{
          type:'date'
      }
})
let users = mongoose.model('Users', UsersSchema);

/** export schema */
module.exports = users