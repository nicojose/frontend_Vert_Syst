# frontend_Vert_Syst

## Loginscreen

### Login on button click
Method: POST\
Details:    
    {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: usrName,
			password: pwd
		}\
Wants Statuscode: 200 ok\
Needs Response: Type:Json, Body:\
    {
     "id_token": "12345882820872378897238934287hjkadfpnoiuhuibphpifephnoi"
    }
    
## Main-Page

### Get resources of user -> sending userID Token to Backend
Method: POST\
Details:\
{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: usrName,
			password: pwd
		}\
Wants Statuscode: 200 ok\
Needs Response:\
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

### delete resource
Method: DELETE
not implementet yet

## Editor-Page

not defined yet
  
