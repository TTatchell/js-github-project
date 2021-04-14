function fetchResults() {
  clearPage()
  let name = document.getElementById('search').value;
  fetch(`https://api.github.com/search/users?q=${name}`)
  .then (resp => {return resp.json()})
  .then(json => {renderResults(json)})
}

function renderResults(results) {
  const names = results.items
  for (let index = 0; index < names.length; index++) {

    // Add the login name
    let listItem = document.createElement('li');
    let itemText = names[index].login;
    listItem.class = 'nameListItem'
    listItem.id = `nameListItem${index}`
    listItem.appendChild(document.createTextNode(itemText));
    document.querySelector('#user-list').appendChild(listItem)


    // Add the avatar as a child
    const profilePic = document.createElement('img');
    profilePic.src = names[index].avatar_url;
    profilePic.id = 'avatar'
    listItem.appendChild(profilePic)


    //Link to their profile
    const profLink = document.createElement('a');
    profLink.appendChild(document.createTextNode("Link to Profile"));
    profLink.href = names[index].html_url;
    profLink.target = "_blank";
    listItem.appendChild(profLink)

    //Event listeners for username to show their repos down the bottom
    listItem.addEventListener('mouseover', () => {
      listItem.style["font-weight"] = "bold";
    })

    listItem.addEventListener('mouseout', () => {
      listItem.style["font-weight"] = "normal";
    })

    profilePic.addEventListener('click', () => {
      clearRepoList()
      fetch(`https://api.github.com/users/${itemText}/repos`)
      .then (resp => {return resp.json()})
      .then(json => {renderRepo(json)})
    })
  }
}


function renderRepo(results) {
  const repos = results
  console.log(repos)
  for (let index = 0; index < repos.length; index++) {
    let listItem = document.createElement('li');
    let itemText = repos[index].full_name;
    listItem.class = 'nameListItem';
    listItem.appendChild(document.createTextNode(itemText));
    document.querySelector('#repos-list').appendChild(listItem)

    listItem.addEventListener('mouseover', () => {
      listItem.style["font-weight"] = "bold";
    })

    listItem.addEventListener('mouseout', () => {
      listItem.style["font-weight"] = "normal";
    })

    listItem.addEventListener('click', () => {
      window.open(repos[index].html_url);
    })
  }

  
}

function events() {
  const form = document.getElementById('submitX')
  form.addEventListener('click', fetchResults);
}

function clearPage() {
  clearRepoList()
  clearNameList()
}

function clearRepoList() {
  const ul = document.getElementById('repos-list');
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function clearNameList() {
  const ul = document.getElementById('user-list');
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

document.addEventListener('DOMContentLoaded', events())