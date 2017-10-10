var mongoose = require('mongoose');

// esquema de dados dos eventos
var LocalSchema = mongoose.Schema({
	titulo: {
		type: String
	},
	data: {
		type: String
	},
	local: {
		type: String
	},
	link: {
		type: String
	}
});

module.exports = mongoose.model('Event', LocalSchema);
var Event = mongoose.model('Event', LocalSchema);

// Pega um unico evento
module.exports.getEventById = function (id, callback) {
	Event.findById(id, callback);
}

// Pega todos os eventos
module.exports.getAllEvents = function (callback) {
	Event.find({}, callback);
}

// Adicionar novo Evento
module.exports.addEvent = function (newEvent, callback){
	newEvent.save(callback);
}

// Deletar Evento
module.exports.deleteEvent = function (id, callback){
	Event.findById(id).remove(callback);
}
