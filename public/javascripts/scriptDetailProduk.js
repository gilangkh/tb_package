/** @format */
import {apiUrl} from './config.js'

let token = sessionStorage.getItem("token");

export function getAllDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(`${apiUrl}/detailProduk`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const detailTableBody = document.getElementById("detailTableBody");

      // Clear any existing rows in the table body
      detailTableBody.innerHTML = "";

      data.forEach((detail, index) => {
        const row = document.createElement("tr");

        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;

        const cellNamaProduk = document.createElement("td");
        cellNamaProduk.textContent = detail.Produk.nama_produk;
        const cellUkuranProduk = document.createElement("td");
        cellUkuranProduk.textContent = detail.Ukuran.ukuran;
        const cellPaket = document.createElement("td");
        cellPaket.textContent = detail.Paket.nama_paket;
        const cellHarga = document.createElement("td");
        cellHarga.textContent = detail.harga.toLocaleString();
        const cellAction = document.createElement("td");
        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        detailButton.className = "btn btn-warning";

        const raw = document.createElement("div");
        raw.className = "flex-detail";

        detailButton.addEventListener("click", () => {
          document.getElementById("myModal").style.display = "block";
          const produkLama = document.getElementById("produkLama");
          const ukuranLama = document.getElementById("ukuranLama");
          const hargaLama = document.getElementById("biayaLama");
          const newPrice = document.getElementById("newPaket");
          newPrice.value= detail.harga
          produkLama.value = detail.Produk.nama_produk;
          ukuranLama.value = detail.Ukuran.ukuran;
          hargaLama.value = detail.Paket.nama_paket;

          document
            .getElementById("updateDetail")
            .addEventListener("submit", (event) => {
              event.preventDefault();
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("authorization", "Bearer " + token);
              var raw = JSON.stringify({
                harga: newPrice.value,
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(
                `${apiUrl}/detailProduk/${detail.produk_id}/${detail.ukuran_id}/${detail.id_paket}/update`,
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  console.log(result);
                  if (result.success) {
                    localStorage.setItem("flashMessage", result.success);

                    location.reload();
                  } else if (result.error) {
                    result.error;
                  }
                })
                .catch((error) => {
                  console.log("error", error);
                  alert(error);
                  alert("gagal");
                });
            });

          document
            .getElementById("deleteDetail")
            .addEventListener("submit", (event) => {
              event.preventDefault();

              var requestOptions = {
                method: "POST",
                redirect: "follow",
                headers: myHeaders,
              };

              fetch(
                `${apiUrl}/detailProduk/${detail.produk_id}/${detail.ukuran_id}/${detail.id_paket}/delete`,
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  console.log(result);
                  if (result.success) {
                    localStorage.setItem("flashMessage", result.success);

                    location.reload();
                  } else if (result.error) {
                    result.error;
                  }
                })
                .catch((error) => {
                  console.log("error", error);
                  alert(error);
                  alert("gagal");
                });
            });
        });

        raw.appendChild(detailButton);
        cellAction.appendChild(raw);
        row.appendChild(cellAction);
        row.appendChild(cellNo);
        row.appendChild(cellNamaProduk);
        row.appendChild(cellUkuranProduk);
        row.appendChild(cellPaket);
        row.appendChild(cellHarga);
        row.appendChild(cellAction);

        detailTableBody.appendChild(row);
      });
    })
    .catch((error) => console.log("error", error));
}

export function createDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(`${apiUrl}/product`, requestOptions)
    .then((response) => response.json()) // Assuming the response is JSON
    .then((data) => {
      console.log(data);
      const produkSelect = document.getElementById("theProduk");
      produkSelect.innerHTML = "";

      const emptyOption = document.createElement("option");
      emptyOption.disabled = true;
      emptyOption.selected = true;
      emptyOption.value = "pilih barang";
      emptyOption.textContent = "pilih barang";

      produkSelect.appendChild(emptyOption);

      data.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.produk_id;
        option.textContent = product.nama_produk;
        produkSelect.appendChild(option);
      });
    })
    .catch((error) => console.log("error", error));

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(`${apiUrl}/size`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const ukuranSelect = document.getElementById("ukuran");

      ukuranSelect.innerHTML = "";

      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.disabled = true;
      emptyOption.selected = true;
      emptyOption.textContent = "pilih ukuran";
      ukuranSelect.appendChild(emptyOption);

      data.forEach((size) => {
        const option = document.createElement("option");
        option.value = size.ukuran_id;
        option.textContent = size.ukuran;
        ukuranSelect.appendChild(option);
      });
    })
    .catch((error) => console.log("error", error));

  document.getElementById("addDetail").addEventListener("submit", (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", "Bearer " + token);

    const ukuran = document.getElementById("ukuran").value;
    const produk = document.getElementById("theProduk").value;
    const harga = document.getElementById("harga").value;
    const paket = document.getElementById("id_paket").value;
    var raw = JSON.stringify({
      ukuran_id: ukuran,
      produk_id: produk,
      harga: harga,
      paket: paket,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiUrl}/detailProduk/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          localStorage.setItem("flashMessage", result.success);

          location.reload();
        } else if (result.error) {
          result.error;
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert(error);
        alert("gagal");
      });
  });
}

export function displayDetailProduk() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(`${apiUrl}/detailProduk`, requestOptions)
    .then((response) => response.json()) // Assuming the response is in JSON format
    .then((data) => {
      console.log(data);
      const homeItem = document.getElementById("home-item");

      // Clear any existing content inside the container
      homeItem.innerHTML = "";

      data.forEach((detail) => {
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
    .catch((error) => console.log("error", error));
}

export function displayDetailItem() {
  var myHeaders = new Headers();
  myHeaders.append("authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(`${apiUrl}/detailProduk`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const itemBarang = document.getElementById("itemBarang");
      itemBarang.innerHTML = ``;
      data.forEach((detail) => {
        const barangItem = document.createElement("a");
        barangItem.href = `/barang/${detail.produk_id}`;
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
        produkName.textContent = detail.Produk.nama_produk;

        const col2 = document.createElement("div");
        col2.className = "col-sm-8 px-3";

        const produkPrize = document.createElement("span");
        produkPrize.className = "produk-prize";
        produkPrize.textContent = `Rp ${detail.harga} /pcs`;

        const produkDesc = document.createElement("span");
        produkDesc.className = "produk-desc";
        produkDesc.textContent = detail.Produk.deskripsi;

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

        itemBarang.appendChild(barangItem);
      });
    })
    .catch((error) => console.log("error", error));
}


var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${sessionStorage.getItem("token")}`);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(`${apiUrl}/paket`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    mapPaket(result);
  })
  .catch((error) => console.log("error", error));


function mapPaket(paket) {
  const selectElement = document.getElementById("id_paket");

  selectElement.innerHTML =
    '<option value="" disabled selected>pilih paket</option>';

  paket.forEach((data) => {
    const optionElement = document.createElement("option");
    optionElement.value = data.id_paket;
    optionElement.textContent = data.nama_paket;
    selectElement.appendChild(optionElement);
  });
}
