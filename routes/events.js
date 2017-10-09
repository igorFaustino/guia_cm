var express = require('express');
var router = express.Router();
var Event = require('../models/events');

// Retorna todos os Eventos
router.get('/events', function (req, res) {
	Event.getAllEvents(function (err, events) {
		if (err){
			res.send(err);
		}
		res.send(events);
	});
});

// Cadastrar um novo Evento
router.post('/event', function (req, res) {;
	let newEvent = new Event({
		nome: req.body.nome,
		endereco: req.body.endereco,
		descricao: req.body.descricao,
		data: req.body.data,
		horario: req.body.horario,
	});

	Event.addEvent(newEvent, function (err, event) {
		if (err){
			res.json({success: false, msg: 'Falha ao adicionar evento'})
		} else {
			res.json({success: true, msg: 'evento adicionado!', event: event});
		}
	})
})

// Deletar Evento
router.delete('/event/:id', function (req, res) {
	var id = req.params.id;
	Event.deleteEvent(id, function (err, task) {
		if (err) {
			res.json({success: false, msg: 'Falha ao deletar evento'});
		} else {
			res.json({success: true, msg: 'Evento deletado!'});
		}
	});
});

module.exports = router;