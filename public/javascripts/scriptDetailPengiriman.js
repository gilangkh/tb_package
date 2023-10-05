
function getAllDetailPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(url + "/detail_pengiriman", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function createDetailPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let pengiriman_id = document.getElementById("pengiriman_id").value;
  let jenis_pengiriman_id = document.getElementById("jenis_pengiriman_id").value;
  let biaya_pengiriman = document.getElementById("biaya_pengiriman").value;

  var formData = new FormData();
  formData.append("pengiriman_id", pengiriman_id);
  formData.append("jenis_pengiriman_id", jenis_pengiriman_id);
  formData.append("biaya_pengiriman", biaya_pengiriman);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch(url + "/detail_pengiriman/create", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function updateDetailPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let detail_pengiriman_id = document.getElementById("detail_pengiriman_id").value;
  let pengiriman_id = document.getElementById("pengiriman_id").value;
  let jenis_pengiriman_id = document.getElementById("jenis_pengiriman_id").value;
  let biaya_pengiriman = document.getElementById("biaya_pengiriman").value;

  var formData = new FormData();
  formData.append("pengiriman_id", pengiriman_id);
  formData.append("jenis_pengiriman_id", jenis_pengiriman_id);
  formData.append("biaya_pengiriman", biaya_pengiriman);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch(url + `/detail_pengiriman/${detail_pengiriman_id}/update`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function deleteDetailPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let detail_pengiriman_id = document.getElementById("detail_pengiriman_id").value;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url + `/detail_pengiriman/${detail_pengiriman_id}/delete`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}