var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');

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
router.get('/admin/:email', function (req, res){
	Admin.getAdminByEmail(req.params.email, function (err, admin){
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
router.post('/admin', function (req, res) {;
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
router.delete('/admin/:id', function (req, res) {
	var id = req.params.id;
	Admin.deleteAdmin(id, function (err, task) {
		if (err) {
			res.json({success: false, msg: 'Falha ao deletar Admin'});
		} else {
			res.json({success: true, msg: 'Admin deletado!'});
		}
	});
});

module.exports = router;