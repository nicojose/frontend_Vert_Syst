//load DOM data
const search = document.getElementById('searchbar');
const matchlist = document.getElementById('match-list');
const abmelden = document.getElementById('log-out');

  // gets elements
  async function searchStates(searchText){
    console.log('before fetch get items of user');
    //request
    const url = `http://165.22.78.137:8080/documents`;
    fetch(url, {
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
    })
    .then(json => {
      console.log(json);
      const list = json;

      //filters the list of documents for input
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

    }).catch(error => {
      console.log(error);
      alert('Fehler beim Laden der Einträge. Bitte versuche es später erneut!');
    });
  }

  //create list of matches dynamically
  function outputMatches2HTML(matches){
    if(matches.length > 0){
      const html = matches.map(match => `
          <div class="row border rounded search-element">
            <div class="col-10 info" id="${match.id}" onClick="search_element_clicked(this.id)">
              <h4 class="title">${match.titel}</h4>
              <h7>${match.datum}</h7>
            </div>
            <button type="button" class="col border-left rounded-0 btn delete" id="${match.id}" onClick="delete_element_clicked(this.id)"><i class="far fa-trash-alt fa-lg delete-icon"></i></button>

          </div>
        `
      ).join('');

      matchlist.innerHTML = html;
    }
  }

  //print all list documents under searchbar
  function initialOutputOfList(){
    //request
    const url = `http://165.22.78.137:8080/documents`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user_token': `${localStorage.getItem('user_token')}`
      }
    })
    .then(res => {
      console.log('fetch got items of user');
      console.log(res);
      if(!res.ok){
        throw Error();
      }
      console.log('fetch was ok and got items of user');
      console.log('response');
      return res.json();
    })
    .then(json => {
      console.log(json);
      const list = json;
      outputMatches2HTML(list);
    }).catch(error => {
      console.log(error);
      alert('Fehler beim Laden der Einträge. Bitte versuche es später erneut!');
    });
  }

  //output the list after load
  initialOutputOfList();
  search.addEventListener('input', () => searchStates(search.value));

  //go to editor -> new element
  document.getElementById('add').addEventListener("click", function(){
    location.href = 'editor.html';
  });

  //log out of document
  document.getElementById('log-out').addEventListener("click", function(){
    console.log('abmelden');
    localStorage.clear();
    location.href = "index.html";
  });

  //go to editor -> existing document
  function search_element_clicked (id){
    console.log('element ' + id);
    localStorage.setItem('element_id', id);
    localStorage.setItem('newItem', 'false');

    location.href = 'editor.html';
  }

  //delete document
  function delete_element_clicked (id){
    console.log('delete ' + id);

    //request
    const params = new URLSearchParams({
      'eintrag_id': `${id}`
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
      searchStates(search.value); //update list
    })
    .catch(err => {
      console.log(err);
      alert('Löschen fehlgeschlagen');
    })
  }

  //activated first when window loads
  window.onload = function() {
    console.log('page loaded');
    localStorage.setItem('newItem', 'true');
  };
