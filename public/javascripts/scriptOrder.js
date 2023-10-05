
function getAllOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(url + "/order", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function createOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let pembayaran_id = document.getElementById("pembayaran_id").value;
  let user_id = document.getElementById("user_id").value;
  let pengiriman_id = document.getElementById("pengiriman_id").value;
  let jenis_pengiriman_id = document.getElementById("jenis_pengiriman_id").value;
  let desain_produk = document.getElementById("desain_produk").value;
  let tanggal_order = document.getElementById("tanggal_order").value;
  let status_order = document.getElementById("status_order").value;
  let tanggal_bayar = document.getElementById("tanggal_bayar").value;

  var formData = new FormData();
  formData.append("pembayaran_id", pembayaran_id);
  formData.append("user_id", user_id);
  formData.append("pengiriman_id", pengiriman_id);
  formData.append("jenis_pengiriman_id", jenis_pengiriman_id);
  formData.append("desain_produk", desain_produk);
  formData.append("tanggal_order", tanggal_order);
  formData.append("status_order", status_order);
  formData.append("tanggal_bayar", tanggal_bayar);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch(url + "/order/create", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function updateOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let order_id = document.getElementById("order_id").value;
  let pembayaran_id = document.getElementById("pembayaran_id").value;
  let user_id = document.getElementById("user_id").value;
  let pengiriman_id = document.getElementById("pengiriman_id").value;
  let jenis_pengiriman_id = document.getElementById("jenis_pengiriman_id").value;
  let desain_produk = document.getElementById("desain_produk").value;
  let tanggal_order = document.getElementById("tanggal_order").value;
  let status_order = document.getElementById("status_order").value;
  let tanggal_bayar = document.getElementById("tanggal_bayar").value;

  var formData = new FormData();
  formData.append("pembayaran_id", pembayaran_id);
  formData.append("user_id", user_id);
  formData.append("pengiriman_id", pengiriman_id);
  formData.append("jenis_pengiriman_id", jenis_pengiriman_id);
  formData.append("desain_produk", desain_produk);
  formData.append("tanggal_order", tanggal_order);
  formData.append("status_order", status_order);
  formData.append("tanggal_bayar", tanggal_bayar);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch(url + `/order/${order_id}/update`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function deleteOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let order_id = document.getElementById("order_id").value;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url + `/order/${order_id}/delete`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}