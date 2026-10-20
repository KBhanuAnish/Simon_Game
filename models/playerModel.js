const mongoose = require('mongoose');
const PlayerSchema = new mongoose.Schema({
  user_namename: {type:String,
    unique:true

  },
  Score:Number
});
const Player = mongoose.models.Player || mongoose.model('Player', PlayerSchema);

module.exports = Player;
