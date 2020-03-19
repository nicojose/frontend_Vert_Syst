
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
  const date = date_obj.getDate() + "." + date_obj.getMonth() + "." + date_obj.getFullYear();
  console.log('datum: ' + date);

  const delta = quill.getContents();
  const delta_string = JSON.stringify(delta);
  const delta_string_b64 = btoa(delta_string); //convert uniconde to base64
  console.log('body: ' + delta_string_b64);

  if(localStorage.getItem('newItem') == 'true'){
    console.log('post');
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify({
        'id': 'automatisch vom server zu erzeugen',
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
    }).then(json => {
      console.log(json);
    })
    .catch(err => {
      console.log('error beim post');
    });
  } else {
    console.log('put');

    fetch('http://localhost:3000/comments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify({
        'id': 'automatisch vom server zu erzeugen',
        'titel': `${title}`,
        'datum': `${date}`,
        'inhalt': `${delta_string_b64}`
      })
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
  location.href = "login.html";
});

window.onload = function() {
  console.log('page loaded');
};
