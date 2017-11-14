const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const passport = require('passport');

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
router.post('/event', passport.authenticate('jwt', { session: false}), function (req, res) {;
	let newEvent = new Event({
		titulo: req.body.titulo,
		data: req.body.data,
		local: req.body.local,
		link: req.body.link,
		image: req.body.image,
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
router.delete('/event/:id', passport.authenticate('jwt', { session: false}), function (req, res) {
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