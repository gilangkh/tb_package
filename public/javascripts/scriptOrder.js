/** @format */
import {apiUrl} from './config.js'

const token = sessionStorage.getItem("token");

export function getAllOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(url + "/order", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export function createOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("authorization", "Bearer " + token);
  let pembayaran_id = document.getElementById("pembayaran_id").value;
  let user_id = document.getElementById("user_id").value;
  let pengiriman_id = document.getElementById("pengiriman_id").value;
  let jenis_pengiriman_id = document.getElementById(
    "jenis_pengiriman_id"
  ).value;
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
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  fetch("http://localhost:3000/order/create", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export function itemOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const produk_id = window.location.pathname.split("/")[2];



  fetch(`http://localhost:3000/detailProduk/${produk_id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const listSize = document.getElementById("listSize");
      const groupName = "sizeGroup";

      data.forEach((size) => {
        const radioButton = document.createElement("div");
        radioButton.classList.add("form-check", "my");

        const inputElement = document.createElement("input");
        inputElement.classList.add("form-check-input");
        inputElement.type = "radio";
        inputElement.name = groupName;
        inputElement.value = size['Ukuran.ukuran'];
        inputElement.id = size.ukuran_id;

        const labelElement = document.createElement("label");
        labelElement.classList.add("form-check-label");
        labelElement.htmlFor = size.ukuran_id;
        labelElement.textContent = size['Ukuran.ukuran'];

        radioButton.appendChild(inputElement);
        radioButton.appendChild(labelElement);

        inputElement.addEventListener("change", () => {
          var ukuran_id = size.ukuran_id;
          var ukuran_id = document.getElementById("size_id");
          ukuran_id.value = size.ukuran_id;

          var requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: myHeaders,
          };

          fetch(
            `http://localhost:3000/detailProduk/${produk_id}/${ukuran_id.value}`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
          
              mapPaketOrder(result, produk_id, ukuran_id.value);
          
            })
            .catch((error) => console.log("error", error));
        });

        listSize.appendChild(radioButton);
      });
    })
    .catch((error) => console.log("error", error));

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(`http://localhost:3000/product/${produk_id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const nama_produk = document.getElementById("nama_produk");
      const nama = document.getElementById("nama");
      const img = document.getElementById("gambar_barang");
      const deskripsi = document.getElementById("deskripsi");
      nama_produk.innerHTML = result.nama_produk;
      nama.innerHTML = result.nama_produk;
      img.src = `/images/${result.gambar_produk}`;
      deskripsi.innerHTML = result.deskripsi;
      document.title = `Barang | ${result.nama_produk}`;
    })
    .catch((error) => console.log("error", error));
}

function mapPaketOrder(result,produk_id,ukuran_id) {
  const inputPaket = document.getElementById('jumlah')
  inputPaket.innerHTML=` <option value="" disabled selected>pilih paket ( pilih ukuran terlbih dahulu )</option>`
  result.forEach((data) => {
    const pilihanPaket = document.createElement('option')
    const { id_paket,produk_id,ukuran_id } = data;
    console.log(id_paket)
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${sessionStorage.getItem("token")}`)
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`http://localhost:3000/paket/${id_paket}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
          pilihanPaket.value = result.id_paket
          pilihanPaket.textContent = result.nama_paket
         
    
      })
      .catch(error => console.log('error', error));
      inputPaket.appendChild(pilihanPaket)
  });

  inputPaket.addEventListener("change",()=>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${sessionStorage.getItem("token")}`)
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`http://localhost:3000/detailProduk/${produk_id}/${ukuran_id}/${inputPaket.value}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const subTotal = document.getElementById("total")
      subTotal.textContent = result.harga * result.Paket.nama_paket
    })
    .catch(error => console.log('error', error));
    
  })
}
