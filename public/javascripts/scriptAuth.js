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
  .then(result => {
    console.log(result.response)
    alert(result.response)
   
    
    if(result){
      window.location = "/produk"
      sessionStorage.setItem('token',token)
    }else{
      const fail = result.response.errror
      console.log(fail)
      alert(fail)
    }
    })
  .catch(error => console.log('error', error));

}

function authHead(){
  const head = document.getElementById("authHead");

  // Membuat elemen-elemen HTML yang akan ditambahkan ke dalam "authHead"
  const header1 = document.createElement("h2");
  header1.className = "header-1";
  header1.textContent = "Q u a ";
  
  const header2 = document.createElement("h2");
  header2.className = "header-2";
  header2.textContent = "k e t";
  
  // Menambahkan elemen-elemen tersebut ke dalam "authHead"
  head.appendChild(header1);
  head.appendChild(header2);
}

