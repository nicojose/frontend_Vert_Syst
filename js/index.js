//load DOM data
const inputs = document.querySelectorAll(".input");
const loginForm = document.getElementById("login-form");

inputs.forEach(input => {
	input.addEventListener("focus", addColor);
	input.addEventListener("blur", removeColor);
});

//add color to elements
function addColor(){
	console.log("this");
	console.log(this);

	console.log("this.parentNode");
	console.log(this.parentNode);

	console.log("this.parentNode.parentNode");
	console.log(this.parentNode.parentNode);

	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

//remove color from elements
function removeColor(){

	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

loginForm.addEventListener('submit', function(e){
	e.preventDefault();

	//load data
	const usrName = document.getElementById('input-username').value;
	const pwd = document.getElementById('input-password').value;
	console.log("usr:" + usrName + " pwd: " + pwd);

	//request
	const params = new URLSearchParams({
		'username': `${usrName}`,
		'password': `${pwd}`
	});
	const url = `http://165.22.78.137:8080/users/login?${params.toString()}`;

	fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => {
		console.log(res);
		if(!res.ok){
			throw Error();
		}
		return res.json();
	})
	.then(json => {
		console.log(json);
		console.log(json.user_token);
		localStorage.setItem('user_token', json.user_token);
		location.href = 'main-page.html';
	})
	.catch(error => {
		console.log(error);
		alert('Anmeldung Fehlgeschlagen. Bitte veruch es erneut!');
	});
});

//activated first when window loads
window.addEventListener("load", function(event) {
	 console.log("Alle Ressourcen haben das Laden beendet!");
	 localStorage.clear();
 });
