const url = "http://localhost:3000"

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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let nama = document.getElementById("nama").value

    var formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("status", stat);  
    formData.append("telp", no_hp);
    formData.append("alamat", alamat);
    formData.append("picture", pic);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    };

    fetch(url+"/user/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function updateUser(){
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

function deleteUser(){
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

function getAllSizes() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(url + "/ukuran", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  function createSize() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    let ukuran = document.getElementById("ukuran").value;
  
    var formData = new FormData();
    formData.append("ukuran", ukuran);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };
  
    fetch(url + "/ukuran/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  function updateSize() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var formdata = new FormData();
    formdata.append("ukuran", ukuran);
  
    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(url + "/ukuran/2/update", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  function deleteSize() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(url + "/ukuran/2/delete", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
 