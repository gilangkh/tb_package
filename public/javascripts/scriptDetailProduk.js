let token = sessionStorage.getItem('token')

function getAllDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers:myHeaders
  };

  fetch("http://localhost:3000/detailProduk", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const detailTableBody = document.getElementById("detailTableBody");

      // Clear any existing rows in the table body
      detailTableBody.innerHTML = '';

      data.forEach((detail, index) => {
        const row = document.createElement("tr");

        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;

        const cellNamaProduk = document.createElement("td");
        cellNamaProduk.textContent = detail.Produk.nama_produk;
        const cellUkuranProduk = document.createElement("td");
        cellUkuranProduk.textContent = detail.Ukuran.ukuran;
        const cellHarga = document.createElement("td");
        cellHarga.textContent = detail.harga;

        const cellAction = document.createElement("td");
        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        detailButton.className = "btn btn-warning";

        const produkLink = document.createElement("a");
        produkLink.textContent = "Produk";
        produkLink.className = "btn btn-info rounded-pill";
        produkLink.href = '/produk';
        const ukuranLink = document.createElement("a");
        ukuranLink.textContent = "Size";
        ukuranLink.className = "btn btn-info rounded-pill";
        ukuranLink.href = '/ukuran';
        const raw = document.createElement('div')
        raw.className = 'flex-detail'

        detailButton.addEventListener("click", () => {
          document.getElementById("myModal").style.display = "block";
          const produkLama = document.getElementById('produkLama')
          const ukuranLama = document.getElementById('ukuranLama')
          const hargaLama = document.getElementById('biayaLama')
          produkLama.value = detail.Produk.nama_produk;
          ukuranLama.value = detail.Ukuran.ukuran;
          hargaLama.value = detail.harga

          document.getElementById('updateDetail').addEventListener('submit', (event) => {
            event.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('authorization', 'Bearer ' + token)
            const mewPrice = document.getElementById('newBiaya').value
            var raw = JSON.stringify({
              "harga": mewPrice
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(`http://localhost:3000/detailProduk/${detail.produk_id}/${detail.ukuran_id}/update`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (result.success) {
                  localStorage.setItem("flashMessage", result.success);

                  location.reload();
                } else if (result.error) {
                  result.error
                }
              })
              .catch(error => {
                console.log('error', error)
                alert(error)
                alert("gagal")
              });
          })

          document.getElementById('deleteDetail').addEventListener('submit', (event) => {
            event.preventDefault();

            var requestOptions = {
              method: 'POST',
              redirect: 'follow',
              headers:myHeaders
            };

            fetch(`http://localhost:3000/detailProduk/${detail.produk_id}/${detail.ukuran_id}/delete`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (result.success) {
                  localStorage.setItem("flashMessage", result.success);

                  location.reload();
                } else if (result.error) {
                  result.error
                }
              })
              .catch(error => {
                console.log('error', error)
                alert(error)
                alert("gagal")
              });
          })
        });

        raw.appendChild(detailButton)
        raw.appendChild(produkLink)
        raw.appendChild(ukuranLink)
        cellAction.appendChild(raw);
        row.appendChild(cellAction);
        row.appendChild(cellNo);
        row.appendChild(cellNamaProduk);
        row.appendChild(cellUkuranProduk);
        row.appendChild(cellHarga);
        row.appendChild(cellAction);

        detailTableBody.appendChild(row);
      });
    })
    .catch(error => console.log('error', error));
}


function createDetailProduk() {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers:myHeaders

  };

  fetch("http://localhost:3000/product", requestOptions)
    .then(response => response.json()) // Assuming the response is JSON
    .then(data => {
      console.log(data)
      const produkSelect = document.getElementById("theProduk");
      produkSelect.innerHTML = '';

      const emptyOption = document.createElement("option");
      emptyOption.disabled = true;
      emptyOption.selected = true;
      emptyOption.value = "pilih barang";
      emptyOption.textContent = "pilih barang";

      produkSelect.appendChild(emptyOption);

      data.forEach(product => {
        const option = document.createElement("option");
        option.value = product.produk_id;
        option.textContent = product.nama_produk;
        produkSelect.appendChild(option);
      });
    })
    .catch(error => console.log('error', error));


  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers:myHeaders
  };

  fetch("http://localhost:3000/size", requestOptions)
    .then(response => response.json())
    .then(data => {
      const ukuranSelect = document.getElementById("ukuran");

      ukuranSelect.innerHTML = '';

      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.disabled = true;
      emptyOption.selected = true;
      emptyOption.textContent = "pilih ukuran";
      ukuranSelect.appendChild(emptyOption);

      data.forEach(size => {
        const option = document.createElement("option");
        option.value = size.ukuran_id;
        option.textContent = size.ukuran;
        ukuranSelect.appendChild(option);
      });
    })
    .catch(error => console.log('error', error));

  document.getElementById('addDetail').addEventListener('submit', (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('authorization', 'Bearer ' + token);

    const ukuran = document.getElementById('ukuran').value
    const produk = document.getElementById('theProduk').value
    var raw = JSON.stringify({
      "ukuran_id": ukuran,
      "produk_id": produk,
      "harga": 20000
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/detailProduk/create", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.success) {
          localStorage.setItem("flashMessage", result.success);

          location.reload();
        } else if (result.error) {
          result.error
        }
      })
      .catch(error => {
        console.log('error', error)
        alert(error)
        alert("gagal")
      });
  })

}

function displayDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers:myHeaders
  };

  fetch("http://localhost:3000/detailProduk", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(data => {

      console.log(data)
      const homeItem = document.getElementById("home-item");

      // Clear any existing content inside the container
      homeItem.innerHTML = '';

      data.forEach(detail => {
        const produkContainer = document.createElement("div");
        produkContainer.className = "barang align-items-center text-center";

        const produkImage = document.createElement("div");
        produkImage.className = "produk-image";
        const img = document.createElement("img");
        img.src = `/images/${detail.Produk.gambar_produk}`; // You can set the image source based on your data

        const row = document.createElement("div");
        row.className = "row";

        const nameCol = document.createElement("div");
        nameCol.className = "col";
        const productName = document.createElement("p");
        productName.className = "produk-name";
        productName.textContent = detail.Produk.nama_produk; // Replace with the actual property name from your data

        const priceCol = document.createElement("div");
        priceCol.className = "col";
        const productPrice = document.createElement("p");
        productPrice.className = "produk-prize";
        productPrice.textContent = `Rp ${detail.harga}/pcs`; // Replace with the actual property name from your data

        homeItem.appendChild(produkContainer);
        produkContainer.appendChild(produkImage);
        produkImage.appendChild(img);
        produkContainer.appendChild(row);
        row.appendChild(nameCol);
        nameCol.appendChild(productName);
        row.appendChild(priceCol);
        priceCol.appendChild(productPrice);
      });
    })
    .catch(error => console.log('error', error));
}

function displayDetailItem() {
  var myHeaders = new Headers();
  myHeaders.append('authorization', 'Bearer ' + token)
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers:myHeaders
  };

  fetch("http://localhost:3000/detailProduk", requestOptions)
    .then(response => response.json()) // Pastikan responsenya adalah JSON
    .then(data => {

      console.log(data)
      // Ambil elemen dengan ID "itemBarang" dari DOM
      const itemBarang = document.getElementById("itemBarang");
      itemBarang.innerHTML=``
      // Loop melalui data yang diterima
      data.forEach(detail => {
        // Buat elemen-elemen HTML
        const barangItem = document.createElement("a");
        barangItem.href = `/barang/detail?produk_id=${detail.produk_id}&ukuran_id=${detail.ukuran_id}`
        barangItem.className = "barang-item";

        const row = document.createElement("div");
        row.className = "row my-2 mx-1";

        const barangDetail1 = document.createElement("div");
        barangDetail1.className = "col barang-detail1";

        const img = document.createElement("img");
        img.src = `/images/${detail.Produk.gambar_produk}`;
        img.alt = "";

        const barangDetail2 = document.createElement("div");
        barangDetail2.className = "col barang-detail2";

        const innerRow = document.createElement("div");
        innerRow.className = "row text-center";

        const col1 = document.createElement("div");
        col1.className = "col-sm-4";

        const produkName = document.createElement("span");
        produkName.className = "produk-name";
        produkName.textContent = detail.Produk.nama_produk; // Isi dengan data yang sesuai

        const col2 = document.createElement("div");
        col2.className = "col-sm-8 px-3";

        const produkPrize = document.createElement("span");
        produkPrize.className = "produk-prize";
        produkPrize.textContent = `Rp ${detail.harga} /pcs`; // Isi dengan data yang sesuai

        const produkDesc = document.createElement("span");
        produkDesc.className = "produk-desc";
        produkDesc.textContent = detail.Produk.deskripsi; // Isi dengan data yang sesuai

        // Strukturkan elemen-elemen HTML
        col1.appendChild(produkName);
        col2.appendChild(produkPrize);
        innerRow.appendChild(col1);
        innerRow.appendChild(col2);
        barangDetail2.appendChild(innerRow);
        barangDetail2.appendChild(produkDesc);
        row.appendChild(barangDetail1);
        row.appendChild(barangDetail2);
        barangDetail1.appendChild(img);
        barangItem.appendChild(row);

        // Tambahkan barangItem ke dalam itemBarang
        itemBarang.appendChild(barangItem);
      });
    })
    .catch(error => console.log('error', error));

}



