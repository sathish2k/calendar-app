let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EventsSchema = new Schema({
      username:{
        type:'string'
      },
      password:{
        type:'string'
      }
})
let events = mongoose.model('Events', EventsSchema);

/** export schema */
module.exports = events