const mongoose = require('mongoose');
const PlayerSchema = new mongoose.Schema({
  user_namename: String,
  Score:Number
});
const Player = mongoose.models.Player || mongoose.model('Player', PlayerSchema);

module.exports = Player;
