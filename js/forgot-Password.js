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
			const params = new URLSearchParams({
				username: `${username}`,
				email: `${email}`
		  });
		  const url = `http://localhost:8080/users/password?${params.toString()}`;
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
				const pwd = json.password;
				const pwd_text = `Dein Passwort lautet "${pwd}"`;
				console.log(pwd_text);

				document.getElementById('show-password-field').innerText = pwd_text;
			})
      .catch(err => {
				console.log(err);
        alert('Passwort zurücksetzen fehlgeschlagen');
      });
    }
});
