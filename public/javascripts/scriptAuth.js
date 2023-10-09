
function login( ){


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const email  = document.getElementById("email")
const password = document.getElementById("password")


var raw = JSON.stringify({
  "email": email.value,
  "password": password.value
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/login", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result.response))
  .catch(error => console.log('error', error));

}