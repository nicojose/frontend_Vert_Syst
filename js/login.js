const inputs = document.querySelectorAll(".input");
const loginForm = document.getElementById("login-form");

inputs.forEach(input => {
	input.addEventListener("focus", addColor);
	input.addEventListener("blur", removeColor);
});


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

function removeColor(){

	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

//login Method: Post
loginForm.addEventListener('submit', function(e){
	e.preventDefault();

	const usrName = document.getElementById('input-username').value;
	const pwd = document.getElementById('input-password').value;
	console.log("usr:" + usrName + " pwd: " + pwd);

	fetch('http://localhost:3000/profile', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'username': `${usrName}`,
			'password': `${pwd}`
		}
	})
	.then(res => {
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
		alert('Anmeldung Fehlgeschlagen. Bitte veruch es erneut!');
	});
});

window.addEventListener("load", function(event) {
	 console.log("Alle Ressourcen haben das Laden beendet!");
	 localStorage.clear();
	 //TODO delete after testing
	 //localStorage.setItem('user_token', 'jsdafklfdsaiöhjk8u89p7fsdakhjöeru8ühjkfds');
 });
