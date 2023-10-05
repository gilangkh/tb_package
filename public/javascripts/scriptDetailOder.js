
function getAllDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(url + "/detail_order", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function createDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let order_id = document.getElementById("order_id").value;
  let produk_id = document.getElementById("produk_id").value;
  let ukuran_id = document.getElementById("ukuran_id").value;
  let jumlah_pesanan = document.getElementById("jumlah_pesanan").value;

  var formData = new FormData();
  formData.append("order_id", order_id);
  formData.append("produk_id", produk_id);
  formData.append("ukuran_id", ukuran_id);
  formData.append("jumlah_pesanan", jumlah_pesanan);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch(url + "/detail_order/create", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function updateDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let order_id = document.getElementById("order_id").value;
  let produk_id = document.getElementById("produk_id").value;
  let ukuran_id = document.getElementById("ukuran_id").value;
  let jumlah_pesanan = document.getElementById("jumlah_pesanan").value;

  var formData = new FormData();
  formData.append("jumlah_pesanan", jumlah_pesanan);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch(url + `/detail_order/${order_id}/${produk_id}/${ukuran_id}/update`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function deleteDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let order_id = document.getElementById("order_id").value;
  let produk_id = document.getElementById("produk_id").value;
  let ukuran_id = document.getElementById("ukuran_id").value;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url + `/detail_order/${order_id}/${produk_id}/${ukuran_id}/delete`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
