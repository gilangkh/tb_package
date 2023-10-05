

function getAllProducts() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
  
    fetch(url + "/produk", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  function createProduct() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    let nama_produk = document.getElementById("nama_produk").value;
    let harga = document.getElementById("harga").value;
    let deskripsi = document.getElementById("deskripsi").value;
    let gambar_produk = document.getElementById("gambar_produk").value;
  
    var formData = new FormData();
    formData.append("nama_produk", nama_produk);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("gambar_produk", gambar_produk);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };
  
    fetch(url + "/produk/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  function updateProduct() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    let produk_id = document.getElementById("produk_id").value;
    let nama_produk = document.getElementById("nama_produk").value;
    let harga = document.getElementById("harga").value;
    let deskripsi = document.getElementById("deskripsi").value;
    let gambar_produk = document.getElementById("gambar_produk").value;
  
    var formData = new FormData();
    formData.append("nama_produk", nama_produk);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("gambar_produk", gambar_produk);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };
  
    fetch(url + `/produk/${produk_id}/update`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  function deleteProduct() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    let produk_id = document.getElementById("produk_id").value;
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(url + `/produk/${produk_id}/delete`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }