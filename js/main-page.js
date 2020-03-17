const search = document.getElementById('searchbar');
const matchlist = document.getElementById('match-list');
const abmelden = document.getElementById('log-out');


  async function searchStates(searchText){

    const response = await fetch('http://demo1229719.mockable.io/nicojose');
    const list = await response.json();
    console.log(list);

    //filter die liste der einträgen nach input
    let matches = list.filter(item => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return item.titel.match(regex) || item.datum.match(regex);
    });

    console.log(matches);
    if(searchText == ''){
      matches = list;
      matchlist.innerHTML = "";
    }

    if(matches.length > 0){
      const html = outputMatches2HTML(matches);
    } else {
      matchlist.innerHTML = "";
    }
  }

  function outputMatches2HTML(matches){
    if(matches.length > 0){
      const html = matches.map(match => `
          <div class="row border rounded search-element">
            <div class="col-10 info" id="${match.id}" onClick="search_element_clicked(this.id)">
              <h4 class="title">${match.titel}</h4>
              <h7>${match.datum}</h7>
            </div>
            <button type="button" class="col btn delete" id="${match.id}" onClick="delete_element_clicked(this.id)"><i class="far fa-trash-alt fa-lg delete-icon"></i></button>

          </div>
        `
      ).join('');

      matchlist.innerHTML = html;
    }
  }


/*<ul class="col-md-auto">
  <li><a href="#"><i class="far fa-trash-alt fa-lg delete" id="delete-${match.id} onClick="delete_element_clicked()"></i></a></li>
</ul>*/

  //printe alle elemente der liste unter searchbar
  async function initialOutputOfList(){
    const response = await fetch('http://demo1229719.mockable.io/nicojose');
    const list = await response.json();
    console.log(list);

    outputMatches2HTML(list);
  }

  //scripting
  initialOutputOfList();
  search.addEventListener('input', () => searchStates(search.value));



  document.getElementById('add').addEventListener("click", function(){
    console.log('add');

  });

  document.getElementById('log-out').addEventListener("click", function(){
    console.log('abmelden');
    localStorage.clear();
    location.href = "login.html";
  });

  function search_element_clicked (id){
    console.log('element ' + id);
  }

  function delete_element_clicked (id){
    console.log('delete ' + id);

    searchStates(search.value); //list aktualisieren
  }

  window.onload = function() {
    console.log('page loaded');
  };
