var express = require('express');
var router = express.Router();
const passport = require('passport');
module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: [ 'profile', 'email' ]
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'),(req,res)=>res.redirect("/"));
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect("/");
	});
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
		
	});
};

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

//module.exports = router;
