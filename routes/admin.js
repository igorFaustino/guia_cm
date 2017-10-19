var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const adminFireBase = require("firebase-admin");
const config = require("../config/database")

// Retorna todos os Admin
router.get('/admin', function (req, res) {
	Admin.getAllAdmin(function (err, admin) {
		if (err){
			res.send(err);
		}
		res.send(admin);
	});
});

// Retorna um admin
router.get('/admin/:uid', function (req, res){
	Admin.getAdminByEmail(req.params.uid, function (err, admin){
		if (err){
			res.send(err);
		}
		if(admin)
			res.send(admin);
		else{
			res.json({})
		}
	})
});

// Cadastrar um novo Admin
router.post('/admin', passport.authenticate('jwt', { session: false}), function (req, res) {;
	let newAdmin = new Admin({
		email: req.body.email,
	});

	Admin.addAdmin(newAdmin, function (err, admin) {
		if (err){
			res.json({success: false, msg: 'Falha ao adicionar admin'})
		} else {
			res.json({success: true, msg: 'Admin adicionado!', admin: admin});
		}
	})
})

// Deletar Admin
router.delete('/admin/:id', passport.authenticate('jwt', { session: false}), function (req, res) {
	var id = req.params.id;
	Admin.deleteAdmin(id, function (err, task) {
		if (err) {
			res.json({success: false, msg: 'Falha ao deletar Admin'});
		} else {
			res.json({success: true, msg: 'Admin deletado!'});
		}
	});
});

// login admin
router.post('/login', function (req, res) {
	const idToken = req.body.idToken;
	let uid;
	let email;
	adminFireBase.auth().verifyIdToken(idToken).then(decodedToken => {
		uid = decodedToken.user_id;
		email = decodedToken.email;
		Admin.getAdmin(uid, email, function (err, admin){
			if (err){
				res.send(err);
			}
			if(admin){
				const token = jwt.sign(admin, config.secret);
				res.json({
					success: true,
					token: 'JWT ' + token,
				});
			} else {
				res.json({
					success: false
				})
			}
		})
	});

});

module.exports = router;