# frontend_Vert_Syst Requests
Wichtig! Die Response Jsons müssen genau gleich sein, die Reihenfolge ist nicht so wichtig, aber die Variablen müssen genauso heißen!!! 

## Loginscreen

### Login on button click
Method: GET\
Request:\
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
});\
Wants Statuscode: 200 ok, sonst fliegt fehler\
Needs Response: Type:Json, Body:\
    {
     "user_token": "12345882820872378897238934287hjkadfpnoiuhuibphpifephnoi"
    }
  
 ## Forgot Password
 Method: 'POST'\
 Request:\
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
      });\
 Needs Response: hauptsache 200 ok
 
## Registrieren
Method: POST\
Request:\
fetch('http://localhost:3000/comments', {
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
          location.href = 'login.html';
        }
      })
      .catch(err => {
        alert('Registrierung fehlgeschlagen');
      });\
     
 Needs Response: hauptsache 200 ok
    
## Main-Page

### Get resources of user -> sending userID Token to Backend
Method: GET\
Request:\
    fetch('http://localhost:3000/posts', {
  		method: 'GET',
  		headers: {
  			'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
  		}
  	})
    .then(res => {
      console.log('fetch got items of user');
      console.log(res);
      console.log(res.json);
      if(!res.ok){
        throw Error();
      }
      console.log('fetch was ok and got items of user');
      console.log('response');
      return res.json();
    })\
    
Info: Die GET Methode hat keinen Body. Infos werden über den Header mitgegeben. In dem Fall der user token. Wird 2 mal ausgeführt, aber mit anderen Hintergrundoperationen im Frontend. Der Request bleibt jedoch unverändert.\ 
Wants Statuscode: 200 ok\
Needs Response: Beispiel:\
[
  {
    "id" : "1",
    "titel" : "Einkaufsliste",
    "datum" : "01.01.2020",
    "inhalt" : "jkskhjfaijosjasljkfjkds8390ölhj4rjkl4309oihjdfgu90okjlfdnlöew09fdjkl98dfgousrjq34jl4309re80üfgd98340qiouj"
  },
  {
    "id" : "2",
    "titel" : "Shopping",
    "datum" : "05.03.2020",
    "inhalt" : "jkskhjfaijosjasljkfjkds8390ölhj4rjkl4309oihjdfgu90okjlfdnlöew09fdjkl98dfgousrjq34jl4309re80üfgd98340qiouj"
  }, ...
]\
Wichtig: die Attribute müssen gleich heißen, sonst klappt das Mapping im Frontend nicht

### delete resource
Method: DELETE\
Request:\
fetch('http://localhost:3000/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`,
        'eintrag_id': `${id}`
      }
    })
    .then(res => {
      console.log(res);
      if(!res.ok){
        throw Error();
      }
      searchStates(search.value); //list aktualisieren
    })
    .catch(err => {
      alert('Löschen fehlgeschlagen');
    })
  }\
Wants Statuscode: 200 ok\
Needs Response: no\
[
]

## Editor-Page

### Neuen Eintrag speichern
Method: 'POST'
Request:\
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify({
        'titel': `${title}`,
        'datum': `${date}`,
        'inhalt': `${delta_string_b64}`
      })
    })
    .then(res => {
      console.log(res);
      if(!res.ok){
        throw Error();
      }
    })\
Wants Statuscode: 200 ok\
Needs Response: no\
[
]

### Vorhandenen Eintrag speichern
Method: PUT\
Request:\
fetch('http://localhost:3000/comments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify({
        'titel': `${title}`,
        'datum': `${date}`,
        'inhalt': `${delta_string_b64}`
      })
    })\
Wants Statuscode: 200 ok\
Needs Response: no\
[
]

### Eintragsdaten fetchen von vorhandnem Element
Method: GET\
Request:\
  await fetch("http://localhost:8080/test123", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'user_token': `${localStorage.getItem('user_token')}`,
      'element_id': `${localStorage.getItem('element_id')}`
    }
  })
Wants Statuscode: 200 ok\
Needs Response: yes\
[
{
    "datum": "10.12.2019",
    "titel": "Mein Tagebuch",
    "inhalt": "eyJvcHMiOlt7ImF0dHJpYnV0ZXMiOnsiYm9sZCI6dHJ1ZX0sImluc2VydCI6ImFzZGZhc2RmIn0seyJhdHRyaWJ1dGVzIjp7InVuZGVybGluZSI6dHJ1ZSwiaXRhbGljIjp0cnVlLCJib2xkIjp0cnVlfSwiaW5zZXJ0IjoiZGRkZGQifSx7Imluc2VydCI6IlxuIn1dfQ=="
}
]
 
  
