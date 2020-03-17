
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
}

document.getElementById('logo').addEventListener("click", function(){
  save();
  setTimeout(function(){
    location.href = "main-page.html";
  }, 2000);

});

document.getElementById('save').addEventListener("click", function(){
  save();
});

document.getElementById('delete').addEventListener("click", function(){
  console.log('delete');
});

document.getElementById('log-out').addEventListener("click", function(){
  console.log('abmelden');
  location.href = "login.html";
});

window.onload = function() {
  console.log('page loaded');
};
