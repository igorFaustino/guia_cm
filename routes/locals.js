const express = require('express');
const router = express.Router();
const Local = require('../models/local');
const passport = require('passport');

// Retorna todos os locais
router.get('/locals', function (req, res) {
	let categoria = req.query.categoria;
	Local.getAllLocals(categoria, function (err, locals) {
		if (err){
			res.send(err);
		}
		res.send(locals);
	});
});

// Retorna um unico local.
router.get('/local/:id', function (req, res) {
	Local.getLocalById(req.params.id, function (err, local) {
		if (err) {
			res.send(err);
		}
		res.send(local);
	})
});

// Cadastrar um novo local.
router.post('/local', passport.authenticate('jwt', { session: false}), function (req, res) {;
	let newLocal = new Local(req.body);
	Local.addLocal(newLocal, function (err, local) {
		if (err){
			res.json({success: false, msg: 'Falha ao adicionar Local'})
		} else {
			res.json({success: true, msg: 'Local adicionado!', local: local});
		}
	})
})

// Alterar dados do local
router.put('/local', passport.authenticate('jwt', { session: false}), function (req, res) {
	var updatedLocal = req.body;
	
	Local.updateLocal(updatedLocal, function (err, task) {
		if (err) {
			res.json({success: false, msg: 'Falha ao atualizar lccal'});
		} else {
			res.json({success: true, msg: 'Local atualizado'});
		}
	})
})

// Deletar Local
router.delete('/local/:id', passport.authenticate('jwt', { session: false}), function (req, res) {
	var id = req.params.id;
	Local.deleteLocal(id, function (err, task) {
		if (err) {
			res.json({success: false, msg: 'Falha ao deletar local'});
		} else {
			res.json({success: true, msg: 'Local deletado!'});
		}
	});
});

module.exports = router;