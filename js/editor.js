
// check out documentation of quill: https://quilljs.com/docs/api/#setcontents
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{'header' : [1, 2, 3, 4, 5, 6, false] }],
  [{'list' : 'ordered'}, {'list': 'bullet'}],
  [{'script' : 'sub'}, {'script': 'super'}],
  [{'indent' : '-1'}, {'indent' : '+1'}],
  [{'direction' : 'rtl'}],
  [{'size' : ['small', false, 'large', 'huge'] }],
  ['link', 'image', 'video', 'formula'],
  [{'color' : [] }, {'background': [] }],
  [{ 'font' : [] }],
  [{'align' : [] }]
]

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

  var date_obj = new Date();
  const date = date_obj.getDate() + "." + (date_obj.getMonth() + 1) + "." + date_obj.getFullYear();
  console.log('datum: ' + date);

  const delta = quill.getContents();
  const delta_string = JSON.stringify(delta);
  console.log(delta_string);
  console.log('body: ' + delta_string);

  if(localStorage.getItem('newItem') == 'true'){
    console.log('post');

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
    })
    .catch(err => {
      console.log(err);
      console.log('error beim post');
    });
  } else {
    console.log('put');

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
    })
    .catch(err => {
      console.log(err);
    })
  }
}

document.getElementById('logo').addEventListener("click", function(){
  save();
  setTimeout(function(){
    location.href = "main-page.html";
  }, 2000);

});

document.getElementById('save').addEventListener("click", function(){
  save();
  localStorage.setItem('newItem', 'false');
});

document.getElementById('delete').addEventListener("click", function(){
  console.log('delete');
});

document.getElementById('log-out').addEventListener("click", function(){
  console.log('abmelden');
  localStorage.clear();
  location.href = "index.html";
});

async function fillEditor(){
  const params = new URLSearchParams({
    element_id: `${localStorage.getItem('element_id')}`
  });
  const url = `http://165.22.78.137:8080/documents?${params.toString()}`;
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
    var inhalt = json.inhalt;
    console.log(inhalt);

    console.log('inhalt: ' + inhalt);
    console.log(inhalt);
    //inhalt = inhalt + '\n'; //add linebreak
    //console.log(inhalt);

    //set Title and content
    document.getElementById('title').value = titel;
    quill.setContents(JSON.parse(inhalt));
  })
  .catch(err => {
    console.log(err);
    alert("Laden Fehlgeschlagen");
  });
}

window.onload = function() {
  console.log('page loaded');

  if(localStorage.getItem('newItem') == 'false'){
    console.log("fetch hier");
    fillEditor();
  }
};
