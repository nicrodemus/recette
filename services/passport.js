const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/data');

const User = mongoose.model('user');
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.idClient,
			clientSecret: keys.clientSecret,
			callbackURL: '/auth/google/callback',
			proxy:true
		},
		(accessToken, refreshToken, profile, done) => {
			//	console.log(profile);                  to see all the google credentials information
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({
						googleId: profile.id,
						email: profile.emails[0].value,
						name: profile.name.givenName
					})
						.save()
						.then((user) => done(null, user));
				}
			});
		}
	)
);
