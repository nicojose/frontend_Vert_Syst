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
	console.log(pwd1 + " " + pwd2);
	console.log(email);
	console.log((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)));

    if(pwd1 == ""){
      alert('Passwort darf nicht lehr sein!');
    } else if (pwd1 != pwd2) {
      alert('Passwöter stimmen nicht überein!');
    } else if (pwd1.length < 8){
      alert('Passwort muss mindestens 8 Zeichen lang sein!');
    } else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) == false) {
      alert('Email-Adressen müssen dem Format email@domain.etwas entsprechen')
    } else {
      //im Backend
      //get alle usernames
      //schau ob der username schon vorhanden ist
      // wenn nein alert('Nutzername ist schon vergeben');
			const url = `http://165.22.78.137:8080/users`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
					username: username,
					password: pwd1,
					email: email
        })
      })
      .then(res => {
        console.log(res);
        if(!res.ok){
          throw Error();
        } else {
          location.href = 'index.html';
        }
      })
      .catch(err => {
				console.log(err);
        alert('Registrierung fehlgeschlagen');
      });
    }
});
