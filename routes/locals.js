var express = require('express');
var router = express.Router();
var Local = require('../models/local');

// Retorna todos os locais
router.get('/locals', function (req, res) {
	Local.getAllLocals(function (err, locals) {
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
router.post('/local', function (req, res) {
	console.log(req.body);
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
router.put('/local', function (req, res) {
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
router.delete('/local/:id', function (req, res) {
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