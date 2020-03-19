const inputs = document.querySelectorAll(".input");
const loginForm = document.getElementById("login-form");
const register = document.getElementById("register");

inputs.forEach(input => {
	input.addEventListener("focus", addColor);
	input.addEventListener("blur", removeColor);
});


function addColor(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function removeColor(){

	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

register.addEventListener('click', e => {
	e.preventDefault();
  console.log("submit");

  const username = document.getElementById('input-username').value;
  const pwd1 = document.getElementById('input-password').value;
  const pwd2 = document.getElementById('input-password-wdh').value;
  const email = document.getElementById('input-email').value;

  if(pwd1 == pwd2 && pwd1 != "" && pwd1.length >= 8){
    //get alle usernames
    //schau ob der username schon vorhanden ist
    // wenn nein alert('Nutzername ist schon vergeben');
    //fetch() -> post -> neuen User
    location.href = 'login.html';
  } else {
    if(pwd1 == ""){
      alert('Passwort darf nicht lehr sein!');
    } else if (pwd1 != pwd2) {
      alert('Passwöter stimmen nicht überein!');
    } else {
      alert('Passwort muss mindestens 8 Zeichen lang sein!');
    }
  }
});