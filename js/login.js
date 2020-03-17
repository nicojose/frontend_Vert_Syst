const inputs = document.querySelectorAll(".input");
const loginForm = document.getElementById("login-form");
const log_in = document.getElementById('log-in');

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

	fetch('http://demo0789151.mockable.io/nicojose', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: usrName,
			password: pwd
		})
	})
	.then(res => {
		if(!res.ok){
			throw Error();
		}
		return res.json();
	})
	.then(json => {
		console.log(json);
		console.log(json.id_token);
		localStorage.setItem('ID-Token', json.id_token);
		location.href = 'main-page.html';
	})
	.catch(error => {
		alert('Anmeldung Fehlgeschlagen. Bitte veruch es erneut!');
	});
});

window.addEventListener("load", function(event) {
	 console.log("Alle Ressourcen haben das Laden beendet!");
	 localStorage.clear();
 });
