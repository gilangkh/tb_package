function login() {
  const formLogin = document.getElementById("login");
  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

      const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

     var raw = JSON.stringify({
      "email": email,
      "password": password
    });

     var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // Mengirim permintaan POST ke server
    fetch("http://localhost:3000/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        let token = result.token
        if (token) {
          alert(result.message)
          window.location = "/home";
          sessionStorage.setItem('token', token);
        } else {
          // Jika login gagal, tampilkan pesan kesalahan
          const error = result.response.error;
          alert(result.error)
          console.log("gagal",error);
          alert(error);
        }
      })
      .catch(error => console.log('error', error));
      alert("internal server error",error)
  });
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

