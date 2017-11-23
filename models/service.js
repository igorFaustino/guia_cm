var mongoose = require('mongoose');

// esquema de dados dos locais
var LocalSchema = mongoose.Schema({
	nome: {
		type: String
	},
	telefone: {
		type: String
	},
	info: {
		type: String
	},
	categoria: {
		type: String
	},
});

module.exports = mongoose.model('Service', LocalSchema);
var Service = mongoose.model('Service', LocalSchema);

// Pega um unico serviço
module.exports.getServiceById = function (id, callback) {
	Service.findById(id, callback);
}

// Pega todos os serviços
module.exports.getAllServices = function (categoria, callback) {
	Service.find({
		categoria: categoria
	}, callback);
}

// Adicionar novo serviço
module.exports.addService = function (newService, callback){
	newService.save(callback);
}

// Atualizar Serviço
module.exports.updateService = function (updatedService, callback){
	this.getServiceById(updatedService._id, function (err, local) {
		if (err) res.send(err);
		if (service) {
			service.nome = updatedService.nome;
			service.info = updatedService.info;
			service.telefone = updatedService.telefone;
			service.categoria = updatedService.categoria;
			service.save(callback);
		}
	})
}

// Deletar serviço
module.exports.deleteService = function (id, callback){
	Service.findById(id).remove(callback);
}