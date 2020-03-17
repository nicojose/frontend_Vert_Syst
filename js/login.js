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

loginForm.addEventListener('submit', function(e){
	e.preventDefault();

	console.log(e);
	console.log('form sent');
});

log_in.addEventListener('click', () => {
	location.href = "main-page.html";
});

window.addEventListener("load", function(event) {
	 console.log("Alle Ressourcen haben das Laden beendet!");
	 localStorage.clear();
 });
