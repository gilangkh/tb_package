let token = sessionStorage.getItem('token')

function getAllDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/order/detail", requestOptions)
    .then(response => response.json())
    .then(data => {

      const tabelOrder = document.getElementById("tabel-order");
      let subtotalHarga = 0
      let itemCount = 0;
      data.forEach(item => {
        itemCount++
        const row = tabelOrder.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = item.DetailProduk.Produk.nama_produk;
        cell2.innerHTML = item.jumlah_pesanan;
        cell3.innerHTML = item.DetailProduk.harga;

        let itemSubtotal = item.jumlah_pesanan * item.DetailProduk.harga;
        subtotalHarga += itemSubtotal;


        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
        deleteButton.classList = `btn btn-outline-warning`
        deleteButton.style = 'border :none'
        deleteButton.addEventListener('click', () => {
          if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {

            console.log('Pesanan dihapus');
          } else {

            console.log('Penghapusan dibatalkan');
          }
        });
        cell4.appendChild(deleteButton);
      });
      const subTotal = document.getElementById('subTotal')
      const subTotal2 = document.getElementById('subTotal2')
      const itemCountText = document.getElementById('itemCount')
      const total = document.getElementById('total')
      subTotal.textContent = `Rp ${subtotalHarga}`
      subTotal2.textContent = `Rp ${subtotalHarga}`
      total.textContent = `Rp ${subtotalHarga}`
      itemCountText.textContent = `Summey ${itemCount} item`
    })
    .catch(error => console.log('error', error));
}


function createDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)

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
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)

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
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)

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

function getAllDetailOrderPayment() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/order/detail", requestOptions)
    .then(response => response.json())
    .then(data => {

      let subtotalHarga = 0
      let itemCount = 0;
      data.forEach(item => {
        itemCount++
        let itemSubtotal = item.jumlah_pesanan * item.DetailProduk.harga;
        subtotalHarga += itemSubtotal;

      });

      const subTotal2 = document.getElementById('subTotal2')
      const itemCountText = document.getElementById('itemCount')
      const total = document.getElementById('total')
      subTotal2.textContent = `Rp ${subtotalHarga}`
      total.textContent = `Rp ${subtotalHarga}`
      itemCountText.textContent = `Summey ${itemCount} item`
    })
    .catch(error => console.log('error', error));
}

function detailPayment() {
  var myHeaders = new Headers();
  myHeaders.append('authorization', 'Bearer ' + token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/userLogin", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      document.getElementById('alamat').textContent = result.alamat
      const alamatArray = result.alamat.split(',');
      let kota = document.getElementById('kota')
      let prov = document.getElementById('prov')

      const kotaUser = alamatArray[0].trim();
      const provAlamat = alamatArray[1].trim();

      kota.value = kotaUser
      prov.value = provAlamat


    })
    .catch(error => console.log('error', error));

  document.getElementById('updateAlamat').addEventListener('submit', (event) => {

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "alamat": "agam,sumatera barat"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/updateUser", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  })
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const selectElement = document.getElementById("list-pengiriman");
  const pengirimanElement = document.getElementById("pengiriman");
  const pengiriman_id = document.getElementById("pengiriman_id");
  let pengirimanId = 0;

  // Fetch data and populate the select options
  fetch("http://localhost:3000/distrikPengiriman", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(data => {
      // Assuming data is an array of shipping methods
      data.forEach(method => {
        const option = document.createElement("option");
        option.value = method.Pengiriman.nama; // Set the value for the option
        option.textContent = method.Pengiriman.nama; // Set the text for the option
        option.setAttribute("data-pengiriman-id", method.pengiriman_id); // Set a custom attribute to store the ID
        selectElement.appendChild(option);
      });
    })
    .catch(error => console.log('error', error));


  selectElement.addEventListener("change", function () {
    const selectedOption = selectElement.value;
    const selectedOptionId = selectElement.options[selectElement.selectedIndex].getAttribute("data-pengiriman-id");
    pengirimanElement.textContent = selectedOption;
    pengiriman_id.value = selectedOptionId;
    pengirimanId = selectedOptionId;

  });
  const selectPembayaran = document.getElementById("list-pembayaran");
  const pembayaranElement = document.getElementById("pembayaran");
  let selectedPaymentId = 0; // Variabel untuk menyimpan ID opsi yang dipilih

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/payment", requestOptions)
    .then(response => response.json()) 
    .then(data => {

      data.forEach(payment => {
        console.log(payment)
        
        const option = document.createElement("option");
        option.value = payment.pembayaran_id; 
        option.textContent = payment.metode; 
        selectPembayaran.appendChild(option);
      });
    })
    .catch(error => console.log('error', error));

  // Tambahkan event listener ke elemen select
  selectPembayaran.addEventListener("change", function () {
    const selectedOption = selectPembayaran.options[selectPembayaran.selectedIndex];
    selectedPaymentId = selectedOption.value; // Simpan ID opsi yang dipilih dalam variabel
    const selectedPaymentName = selectedOption.textContent; // Dapatkan nama pembayaran yang dipilih
    pembayaranElement.textContent = selectedPaymentName; // Tampilkan nama pembayaran yang dipilih
    console.log("Selected Payment ID:", selectedPaymentId);
  });

  document.getElementById





}
