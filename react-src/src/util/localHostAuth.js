function thereIsUser(){
	const user = localStorage.getItem('user')
	if(user){
		return user;
	} else {
		return false;
	}
}

function thereIsAdim(){
	const user = localStorage.getItem('user')
	const admin = localStorage.getItem('admin');
	if(user && admin == 'true'){
		return true;
	} else {
		return false;
	}
}

module.exports = {
	thereIsUser,
	thereIsAdim,
}