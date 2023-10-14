

function getAllUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(url + "/user", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function createUser() {

  const register = document.getElementById("register")

  register.addEventListener('submit', async(event)=>{
    event.preventDefault();
  
  // Dapatkan data dari formulir HTML
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const telp = document.getElementById("telp").value;
  const alamat = document.getElementById("alamat").value;

  var formdata = new FormData();
  formdata.append("nama", nama);
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("telp", telp);
  formdata.append("alamat", alamat);

  // Gantilah ini sesuai dengan elemen HTML yang digunakan untuk mengunggah gambar
  var fileInput = document.getElementById("picture");
  formdata.append("picture", fileInput.files[0]);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/user/create", requestOptions)
    .then(response => {
      if (!response.ok) {
        // Handle kesalahan jika status respons tidak 200
        throw new Error('HTTP Error: ' + response.error);
      }
      return response.json(); // Ganti ini sesuai dengan format respons yang diterima
    })
    .then(result => {
      // Tindakan selanjutnya setelah respons berhasil
      console.log(result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  })
}



function updateUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var formdata = new FormData();
  formData.append("nama", nama);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("status", stat);
  formData.append("telp", no_hp);
  formData.append("alamat", alamat);
  formData.append("picture", pic);


  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/user/2/update", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function deleteUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  fetch("http://localhost:3000/user/2/delete", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}



