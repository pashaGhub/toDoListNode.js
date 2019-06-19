window.addEventListener('load', () => {
  Parse.initialize("myAppId");
  Parse.serverURL = 'http://localhost:1337/parse'
  if (!Parse.User.current()) {
    location.replace("http://localhost:8080/login.html")
  } else {
    getAllItems()
  }
});

function createItem() {
  let title = document.getElementById('newItem').value
  if (!title) {
    alert("Cant create empty item")
    return
  }
  let user
  const ToDoList = Parse.Object.extend("ToDoList");
  const toDoList = new ToDoList();
  toDoList.set('title', title);
  toDoList.set('checked', false);
  toDoList.setACL(new Parse.ACL(Parse.User.current()));
  toDoList.save()
    .then((item) => {
      console.log(item)
    }, (error) => {
      alert(e)
    });
}

function toggleCheck(id, li) {
  const ToDoList = Parse.Object.extend("ToDoList");
  const query = new Parse.Query(ToDoList);
  query.get(id)
    .then((result) => {
      if(!result.checked) {
        result.set('checked', !result.attributes.checked)
        result.save()
        getAllItems();
      } else {
        result.set('checked', !result.attributes.checked)
        result.save();
        getAllItems();
      }
    }, (e) =>{
      console.log(e);
    })
}

function deleteItem(id, li) {
  const ToDoList = Parse.Object.extend("ToDoList");
  const query = new Parse.Query(ToDoList);

  query.get(id)
    .then((result) => {
      result.destroy().then((myObject) => {
        li.parentNode.removeChild(li)
      }, (e) => {
        console.log(e);
      });
    }, (e) =>{
      console.log(e);
    })
}

async function getAllItems() {
  const ToDoList = Parse.Object.extend("ToDoList");
  const query = new Parse.Query(ToDoList);
  const results = await query.find();
  console.log(results)
  createElements(results);
}

function createElements(data) {
  let ul = document.getElementById("list")
  ul.innerHTML = ''
  for (let i = 0; i < data.length; i++) {
    let li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
    if (data[i].attributes.checked) li.classList.add('list-group-item-success')
    let p = document.createElement('p')
    p.textContent = data[i].attributes.title
    p.addEventListener('click', () => {
      toggleCheck(data[i].id, li)
    })
    li.appendChild(p)
    let span = document.createElement('span')
    span.classList.add('badge', 'badge-danger', 'badge-pill')
    span.innerHTML = '<ion-icon name="close"></ion-icon>'
    span.addEventListener('click', () => {
      deleteItem(data[i].id, li)
    })
    li.appendChild(span)
    ul.appendChild(li)
  }
}
