window.addEventListener('load', () => {
  Parse.initialize("myAppId");
  Parse.serverURL = 'http://localhost:1337/parse';
})


async function registerUser() {
  let email = document.getElementById('registerEmail').value
  let pass = document.getElementById('registerPassword').value
  let rpass = document.getElementById('registerRPassword').value



  if (pass != rpass) {
    alert('Passwords do not match');
    return;
  }

  let user = new Parse.User();
  user.set("username", email);
  user.set("password", pass);
  user.set("email", email);

  try {
    await user.signUp();
    console.log(user);
    location.replace("http://localhost:8080/login.html")
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }

}
