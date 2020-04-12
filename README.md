# frontend_Vert_Syst Requests
Wichtig! Die Response Jsons müssen genau gleich sein, die Reihenfolge ist nicht so wichtig, aber die Variablen müssen genauso heißen!!!


## Dockerisierung des Frontends
### Dockerfile
FROM nginx\
COPY frontend_Vert_Syst /usr/share/nginx/html
### Image bauen
docker build -t website-vert-syst .
### Container laufen lassen
docker run --name website -d -p 3000:80 website-vert-syst:latest

## Loginscreen

### Login on button click
Method: GET\
Request:\
```
const params = new URLSearchParams({
	'username': `${usrName}`,
	'password': `${pwd}`
});
const url = `http://localhost:8080/users/login?${params.toString()}`;

fetch(url, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
});
```
Wants Statuscode: 200 ok, sonst fliegt fehler\
Needs Response: Type:Json, Body:\
```
    {
     "user_token": "12345882820872378897238934287hjkadfpnoiuhuibphpifephnoi"
    }
```
## Forgot Password
 Method: 'GET'\
 Request:\
```
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
```
 Response:\
 ```
 {
 "password": "start123"
 }
 ```
 Needs Response: hauptsache 200 ok

## Registrieren
Method: POST\
Request:\
```
const url = `http://localhost:8080/users`;
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
      })\
```
 Needs Response: hauptsache 200 ok

## Main-Page

### Get resources of user -> sending userID Token to Backend
Method: GET\
Request:\
```
const url = `http://localhost:8080/documents`;
    fetch(url, {
  		method: 'GET',
  		headers: {
  			'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
  		}
  	})
```

Info: Die GET Methode hat keinen Body. Infos werden über den Header mitgegeben. In dem Fall der user token. Wird 2 mal ausgeführt, aber mit anderen Hintergrundoperationen im Frontend. Der Request bleibt jedoch unverändert.\
Wants Statuscode: 200 ok\
Needs Response: Beispiel:\
```
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
]
```
Wichtig: die Attribute müssen gleich heißen, sonst klappt das Mapping im Frontend nicht

### delete resource
Method: DELETE\
Request:
```
const params = new URLSearchParams({
    'eintrag_id': `${id}`
    });
const url = `http://localhost:8080/documents?${params.toString()}`;

fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      }
})
```
Wants Statuscode: 200 ok\
Needs Response: no\
[
]

## Editor-Page

### Neuen Eintrag speichern
Method: 'POST'
Request:
```
    const url = `http://localhost:8080/documents`;
    fetch(url, {
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
```
Wants Statuscode: 200 ok\
Needs Response: yes\
[
	{
	element_id: 32
	}
]

### Vorhandenen Eintrag speichern
Method: PUT\
Request:
```
const params = new URLSearchParams({
  		element_id: localStorage.getItem('element_id', id)
  	});
    const url = `http://localhost:3000/documents?${params.toString()}`;

    fetch(url, {
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
    })
```
Wants Statuscode: 200 ok\
Needs Response: no\
[
]

### Eintragsdaten fetchen von vorhandnem Element
Method: GET\
Request:
```
  const params = new URLSearchParams({
    element_id: `${localStorage.getItem('element_id')}`
  });
  const url = `http://localhost:8080/documents?${params.toString()}`;
  await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'user_token': `${localStorage.getItem('user_token')}`
    }
  })
```  
Wants Statuscode: 200 ok\
Needs Response: yes\
```
[
{
    "datum": "10.12.2019",
    "titel": "Mein Tagebuch",
    "inhalt": 	"eyJvcHMiOlt7ImF0dHJpYnV0ZXMiOnsiYm9sZCI6dHJ1ZX0sImluc2VydCI6ImFzZGZhc2RmIn0seyJhdHRyaWJ1dGVzIjp7InVuZGVybGluZSI6dHJ1ZSwiaXRhbGljIjp0cnVlLCJib2xkIjp0cnVlfSwiaW5zZXJ0IjoiZGRkZGQifSx7Imluc2VydCI6IlxuIn1dfQ=="
}
]
```
