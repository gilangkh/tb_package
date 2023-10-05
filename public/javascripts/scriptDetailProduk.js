
function getAllDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(url + "/detail_produk", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function createDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let ukuran_id = document.getElementById("ukuran_id").value;
  let produk_id = document.getElementById("produk_id").value;
  let harga = document.getElementById("harga").value;

  var formData = new FormData();
  formData.append("ukuran_id", ukuran_id);
  formData.append("produk_id", produk_id);
  formData.append("harga", harga);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch(url + "/detail_produk/create", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function updateDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let detail_produk_id = document.getElementById("detail_produk_id").value;
  let ukuran_id = document.getElementById("ukuran_id").value;
  let produk_id = document.getElementById("produk_id").value;
  let harga = document.getElementById("harga").value;

  var formData = new FormData();
  formData.append("ukuran_id", ukuran_id);
  formData.append("produk_id", produk_id);
  formData.append("harga", harga);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch(url + `/detail_produk/${detail_produk_id}/update`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function deleteDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let detail_produk_id = document.getElementById("detail_produk_id").value;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url + `/detail_produk/${detail_produk_id}/delete`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
