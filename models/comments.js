var mongoose = require('mongoose');

// esquema de dados dos eventos
var LocalSchema = mongoose.Schema({
	local: {
		type: String
	},
	user: {
		type: String
	},
	userImage: {
		type: String,
	},
	comentario: {
		type: String,
	}
});

module.exports = mongoose.model('Comment', LocalSchema);
var Comment = mongoose.model('Comment', LocalSchema);

// // Pega um unico evento
// module.exports.getEventById = function (id, callback) {
// 	Event.findById(id, callback);
// }

// Pega todos os comentarios
module.exports.getCommentsByLocal = function (thisLocal, callback) {
	Comment.find({
		local: thisLocal
	}, callback);
}

// Adicionar novo comentario
module.exports.addComments = function (newComment, callback){
	newComment.save(callback);
}

// Deletar comentario
module.exports.deleteComments = function (id, callback){
	Comment.findById(id).remove(callback);
}
