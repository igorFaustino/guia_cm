const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../models/admin.js');
const config = require('./database.js');

module.exports = function (passport) {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		Admin.getAdmin(jwt_payload._doc.uid, jwt_payload._doc.email, function (err, admin) {
			if (err){
				return done(err, false);
			}
			if(admin){
				return done(null, admin);
			} else {
				return done(null, false);
			}
		})
	}))
}
