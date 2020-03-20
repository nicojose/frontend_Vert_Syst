const inputs = document.querySelectorAll(".input");
const loginForm = document.getElementById("login-form");
const register = document.getElementById("send_pwd");

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
  const email = document.getElementById('input-email').value;

	console.log(email);
	console.log((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)));

    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) == false) {
      alert('Email-Adressen müssen dem Format email@domain.etwas entsprechen')
    } else {
      //im Backend
      //get alle usernames
      //schau ob der username schon vorhanden ist
      // wenn nein alert('Nutzername ist schon vergeben');
      fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
					username: username,
					email: email
        })
      })
      .then(res => {
        console.log(res);
        if(!res.ok){
          throw Error();
        } else {
          location.href = 'login.html';
        }
      })
      .catch(err => {
        alert('Passwort zurücksetzen fehlgeschlagen');
      });
    }
});
