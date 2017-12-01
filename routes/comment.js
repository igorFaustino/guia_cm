const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');
const passport = require('passport');

// Retorna todos os comentarios de um local
router.get('/comment/:local', function (req, res) {
	let local = req.params.local;
	Comment.getCommentsByLocal(local, function (err, events) {
		if (err){
			res.send(err);
		}
		res.send(events);
	});
});

// Cadastrar um novo comentario
router.post('/comment/:local', function (req, res) {;
	let newComment = new Comment({
		local: req.params.local,
		user: req.body.user,
		userImage: req.body.userImage,
		comentario: req.body.comentario,
	});

	Comment.addComments(newComment, function (err, comment) {
		if (err){
			res.json({success: false, msg: 'Falha ao adicionar comentario'})
		} else {
			res.json({success: true, msg: 'comentario adicionado!', comment: comment});
		}
	})
})

// Deletar comentario
router.delete('/comment/:id', passport.authenticate('jwt', { session: false}), function (req, res) {
	var id = req.params.id;
	Comment.deleteEvent(id, function (err, task) {
		if (err) {
			res.json({success: false, msg: 'Falha ao deletar evento'});
		} else {
			res.json({success: true, msg: 'Evento deletado!'});
		}
	});
});

module.exports = router;