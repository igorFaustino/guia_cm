var express = require('express');
var router = express.Router();
var Service = require('../models/service');
const passport = require('passport');

// Retorna todos os Serviços
router.get('/services', function (req, res) {
	Service.getAllServices(function (err, services) {
		if (err){
			res.send(err);
		}
		res.send(services);
	});
});

// Cadastrar um novo serviço
router.post('/service', passport.authenticate('jwt', { session: false}), function (req, res) {;
	let newService = new Service({
		nome: req.body.nome,
		info: req.body.info,
		telefone: req.body.telefone,
		categoria: req.body.categoria,
	});

	Service.addService(newService, function (err, service) {
		if (err){
			res.json({success: false, msg: 'Falha ao adicionar serviço'})
		} else {
			res.json({success: true, msg: 'serviço adicionado!', service: service});
		}
	})
})

// Deletar serviço
router.delete('/service/:id', passport.authenticate('jwt', { session: false}), function (req, res) {
	var id = req.params.id;
	Service.deleteService(id, function (err, task) {
		if (err) {
			res.json({success: false, msg: 'Falha ao deletar serviço'});
		} else {
			res.json({success: true, msg: 'Serviço deletado!'});
		}
	});
});

module.exports = router;