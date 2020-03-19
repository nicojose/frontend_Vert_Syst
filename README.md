# frontend_Vert_Syst Requests

## Loginscreen

### Login on button click
Method: GET\
Details:    
    {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'username': `${usrName}`,
			'password': `${pwd}`
		}
	}\
Wants Statuscode: 200 ok\
Needs Response: Type:Json, Body:\
    {
     "user_token": "12345882820872378897238934287hjkadfpnoiuhuibphpifephnoi"
    }
    
## Main-Page

### Get resources of user -> sending userID Token to Backend
Method: GET\
Details:\
{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'user_token': `${localStorage.getItem('user_token')}`
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
Method: DELETE\
Details:\
{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_token: localStorage.getItem('user_token'),
        eintrag_id: id
      })
    }\
Wants Statuscode: 200 ok\
Needs Response: no\
[
]

## Editor-Page

not defined yet
  
