///////////////////////////////////////////////////////////
// FUNÇÕES AINDA NÃO TESTADAS -> ELAS SERÃO TESTADAS QUANDO FOR CRIADA AS ROTA 'LOCALS'
// Ass. Igor
//////////////////////////////////////////////////////////

var mongoose = require('mongoose');

// esquema de dados dos locais
var LocalSchema = mongoose.Schema({
	nome: {
		type: String
	},
	cordenadas: [{
		lat: {
			type: Number,
			require: true
		},
		lng: {
			type: Number,
			require: true
		}
	}],
	endereco: {
		type: String
	},
	descricao: {
		type: String
	},
	icon: {
		type: String
	},
	horario: {
		type: String
	},
	categoria: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('Local', LocalSchema);
var Local = mongoose.model('Local', LocalSchema);

// Pega um unico local
module.exports.getLocalById = function (id, callback) {
	Local.findById(id, callback);
}

// Pega todos os locais
module.exports.getAllLocals = function (callback) {
	Local.find({}, callback);
}

// Adicionar novo local
module.exports.addLocal = function (newLocal, callback){
	newLocal.save(callback);
}

// Atualizar local
module.exports.updateLocal = function (updatedLocal, callback){
	this.getLocalById(updatedLocal._id, function (err, local) {
		if (err) res.send(err);
		if (local) {
			local.nome = updatedLocal.nome;
			local.cordenadas = updatedLocal.cordenadas;
			local.endereco = updatedLocal.endereco;
			local.descricao = updatedLocal.descricao;
			local.icon = updatedLocal.icon;
			local.horario = updatedLocal.horario;
			local.categoria = updatedLocal.categoria;
			local.save(callback);
		}
	})
}

// Deletar local
module.exports.deleteLocal = function (id, callback){
	Local.findById(id).remove(callback);
}