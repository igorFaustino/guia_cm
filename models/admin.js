var mongoose = require('mongoose');

// esquema de dados dos Admin
var LocalSchema = mongoose.Schema({
	email: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('Admin', LocalSchema);
var Admin = mongoose.model('Admin', LocalSchema);

module.exports.getAdminByID = function (id, callback){
	Admin.findById(id, callback);
}

// Pega um unico admin
module.exports.getAdmin = function (email, callback) {
	Admin.findOne({
		email: email
	}, callback);
}

// Pega todos os Admin
module.exports.getAllAdmin = function (callback) {
	Admin.find({}, callback);
}

// Adicionar novo Admin
module.exports.addAdmin = function (newAdmin, callback){
	newAdmin.save(callback);
}

// Deletar Admin
module.exports.deleteAdmin = function (id, callback){
	Admin.findById(id).remove(callback);
}
