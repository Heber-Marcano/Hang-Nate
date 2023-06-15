const router = require('express').Router();
const { Game, User, Word } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
 
    // Pass serialized data and session flag into template
    res.render('login', {  
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/game', async (req, res) => {
  try {
    const wordData = await Word.findAll()
    
    const words = wordData.map(word => word.get({plain:true}))

    res.render('game', {
      words,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// /profile?id=1
router.get('/profile', async (req, res) => {
  try { 
    // Find the logged in user based on the session ID
    // TODO change req.query.id to use the session id instead
    const userData = await User.findByPk(req.session.user_id)
// TODO if userData is null then redirect to 404 page or home ?
    const user = userData.get({ plain: true });

    const games_won = await Game.findAll({
      where: {
        won:true,
        user_id: req.session.user_id
      } 
    });

    const games_lost = await Game.findAll({
       where: {
         user_id: req.session.user_id,
         won:false,
       } 
     });

    user.wins = games_won.length;
    user.losses = games_lost.length;

    // TODO : get the date of the last game played
//    const date_played = await Game.findOne({
      // get the latest game
  //  });
  // user.date_played = date_played

    console.log(user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
