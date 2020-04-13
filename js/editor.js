//set the toolbar
//check out documentation of quill: https://quilljs.com/docs/api/#setcontents
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{'header' : [1, 2, 3, 4, 5, 6, false] }],
  [{'list' : 'ordered'}, {'list': 'bullet'}],
  [{'script' : 'sub'}, {'script': 'super'}],
  [{'indent' : '-1'}, {'indent' : '+1'}],
  [{'direction' : 'rtl'}],
  [{'size' : ['small', false, 'large', 'huge'] }],
  ['link', 'formula'],
  [{'color' : [] }, {'background': [] }],
  [{ 'font' : [] }],
  [{'align' : [] }]
]

//set Qull editor
var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});


function save(){
  console.log('save');

  var title = document.getElementById('title').value;
  if(title == ""){
    title = "Ohne Titel"
  }
  console.log('titel: ' + title);

  //create Date
  var date_obj = new Date();
  const date = date_obj.getDate() + "." + (date_obj.getMonth() + 1) + "." + date_obj.getFullYear();
  console.log('datum: ' + date);

  const delta = quill.getContents();
  const delta_string = JSON.stringify(delta);
  console.log(delta_string);
  console.log('inhalt: ' + delta_string);

  if(localStorage.getItem('newItem') == 'true'){
    console.log('post');

    //request
    const url = `http://165.22.78.137:8080/documents`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify({
        'titel': `${title}`,
        'datum': `${date}`,
        'inhalt': `${delta_string}`
      })
    })
    .then(res => {
      console.log(res);
      if(!res.ok){
        throw Error();
      }
      return res.json();
    }).then(json => {
      console.log(json);
      console.log(json.element_id);
      localStorage.setItem('element_id', json.element_id);
      localStorage.setItem('newItem', 'false');
      console.log(localStorage.getItem('newItem'));

      alert("Dokument gespeichert");
    })
    .catch(err => {
      console.log(err);
      console.log('error beim post');
    });
  } else {
    console.log('put');

    //request
    const params = new URLSearchParams({
  		element_id: localStorage.getItem('element_id')
  	});
    const url = `http://165.22.78.137:8080/documents?${params.toString()}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify({
        'titel': `${title}`,
        'datum': `${date}`,
        'inhalt': `${delta_string}`
      })
    })
    .then(res => {
      console.log(res);
      alert("Dokument gespeichert");
    })
    .catch(err => {
      console.log(err);
    })
  }
}

//when clicked on logo icon in top left corner
document.getElementById('logo').addEventListener("click", function(){
  const isToSave = confirm('Sollen die Änderungen gespeichert werden?');
  if(isToSave){
    save();
  }
  location.href = "main-page.html";
});

//when clicked on save icon
document.getElementById('save').addEventListener("click", function(){
  save();
  localStorage.setItem('newItem', 'false');
});

//when clicked on delete icon
document.getElementById('delete').addEventListener("click", function(){
  if(localStorage.getItem("newItem") == "false"){
    console.log('delete');

    //request
    const params = new URLSearchParams({
      'eintrag_id': `${localStorage.getItem("element_id")}`
    });
    const url = `http://165.22.78.137:8080/documents?${params.toString()}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      }
    })
    .then(res => {
      console.log(res);
      if(!res.ok){
        throw Error();
      }
      location.href = "main-page.html";
    })
    .catch(err => {
      console.log(err);
      alert('Löschen fehlgeschlagen');
    });
  } else {
    //jump directly to main page if nothing was saved into database
    location.href = "main-page.html";
  }
});

//log out
document.getElementById('log-out').addEventListener("click", function(){
  console.log('abmelden');
  localStorage.clear();
  location.href = "index.html";
});

//fill the editor with data
async function fillEditor(){
  //request
  const params = new URLSearchParams({
    element_id: `${localStorage.getItem('element_id')}`
  });
  const url = `http://165.22.78.137:8080/document?${params.toString()}`;
  await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'user_token': `${localStorage.getItem('user_token')}`
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
    var titel = json.titel;
    console.log(titel);
    document.getElementById('title').value = titel;

    var inhalt = json.inhalt;
    console.log(inhalt);
    console.log('inhalt tostring: ' + inhalt.toString());
    //the linebreaks of the String (\n) are replaced with JavaScript usable linebreak (\\n)
    var string_inhalt = inhalt.replace(/(\r\n|\n|\r)/gm,"\\n");

    console.log(string_inhalt);

    //create json object
    var inhalt_json = JSON.parse(string_inhalt);
    console.log(inhalt_json);
    var ops = inhalt_json.ops;
    console.log(ops);
    //set content of texteditor
    quill.setContents(ops, 'api');
  })
  .catch(err => {
    console.log(err);
    alert("Laden Fehlgeschlagen");
  });
}

  //activated first when window loads
window.onload = function() {
  console.log('page loaded');

  if(localStorage.getItem('newItem') == 'false'){
    console.log("fetch hier");
    fillEditor();
  }
};
