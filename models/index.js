const User = require('./users');
const Game = require('./game');
const Word = require('./words')

User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Game.belongsTo(User, {
  foreignKey: 'user_id'
});

Game.hasOne(Word,{
  foreignKey: 'word_id'

});

Word.belongsToMany(Game,{
  foreignKey: 'word_id'
});

module.exports = { User, Game };
