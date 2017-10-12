function thereIsUser(){
	const user = localStorage.getItem('user')
	if(user){
		return user;
	} else {
		return false;
	}
}

module.exports = {
	thereIsUser,
}