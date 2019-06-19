window.addEventListener('load', () => {
  Parse.initialize("myAppId");
  Parse.serverURL = 'http://localhost:1337/parse';
})

function login() {
  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;

  Parse.User.logIn(email, password).then((user) => {
    location.replace("http://localhost:8080/index.html")
  }, (e) => {
    alert(e)
  })
}
