const router = require('express').Router();
const { Game, Word } = require('../../models');
const withAuth = require('../../utils/auth');
//this route creates game
//rec.body needs to include the game word and if they won
// POST: /api/games/
router.post('/', withAuth, async (req, res) => {
  try {
    const newGame = await Game.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGame);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const GameData = await Game.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!GameData) {
      res.status(404).json({ message: 'No game found with this id!' });
      return;
    }

    res.status(200).json(GameData);
  } catch (err) {
    res.status(500).json(err);
  }
});






module.exports = router;
