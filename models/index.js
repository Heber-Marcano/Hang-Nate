const User = require('./user');
const Game = require('./game');
const Word = require('./word');

User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Game.belongsTo(User, {
  foreignKey: 'user_id'
});

//Game.hasOne(Word,{
//  foreignKey: 'word_id'
// });

// Word.belongsTo(Game,{
//  foreignKey: 'word_id'
// });

module.exports = { User, Game, Word };
