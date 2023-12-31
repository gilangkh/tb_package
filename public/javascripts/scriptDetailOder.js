/** @format */
import {apiUrl} from './config.js'

let token = sessionStorage.getItem("token");

export function getAllDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(apiUrl+"/order/detail", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tabelOrder = document.getElementById("tabel-order");
      let subtotalHarga = 0;
      let itemCount = 0;
      data.forEach((item) => {
        itemCount++;
        const row = tabelOrder.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        let harga = 1;

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          `${apiUrl}/detailProduk/${item.produk_id}/${item.ukuran_id}/${item.id_paket}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            cell1.innerHTML = result.Produk.nama_produk;
            harga =item.harga_pembayaran;
            cell3.innerHTML = item.harga_pembayaran.toLocaleString();
            let itemSubtotal =  harga;
            subtotalHarga += itemSubtotal;
            const subTotal = document.getElementById("subTotal");
            const subTotal2 = document.getElementById("subTotal2");
            const itemCountText = document.getElementById("itemCount");
            const total = document.getElementById("total");
            subTotal.textContent = `Rp ${subtotalHarga.toLocaleString()}`;
            subTotal2.textContent = `Rp ${subtotalHarga.toLocaleString()}`;
            total.textContent = `Rp ${subtotalHarga.toLocaleString()}`;
            itemCountText.textContent = `Summey ${itemCount} item`;
          })
          .catch((error) => console.log("error", error));

        cell2.innerHTML = item.jumlah_pesanan;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
        deleteButton.classList = `btn btn-outline-warning`;
        deleteButton.style = "border :none";
        deleteButton.addEventListener("click", () => {
          if (
            window.confirm("Apakah Anda yakin ingin menghapus pesanan ini?")
          ) {
            console.log("Pesanan dihapus");

            var myHeaders = new Headers();
            myHeaders.append("authorization", "Bearer " + token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              produk_id: item.produk_id,
              ukuran_id: item.ukuran_id,
              order_id: item.order_id,
              id_paket: item.id_paket
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(apiUrl+"/order/delete", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                if (result.success) {
                  localStorage.setItem("flashMessage", result.success);

                  location.reload();
                } else if (result.error) {
                  result.error;
                  alert("gagal");
                }
              })
              .catch((error) => {
                console.log("error", error);
                alert(error);
              });
          } else {
            console.log("Penghapusan dibatalkan");
          }
        });
        cell4.appendChild(deleteButton);
      });
    })
    .catch((error) => console.log("error", error));
}

export function createDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);

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
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  fetch(url + "/detail_order/create", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export function updateDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);

  let order_id = document.getElementById("order_id").value;
  let produk_id = document.getElementById("produk_id").value;
  let ukuran_id = document.getElementById("ukuran_id").value;
  let jumlah_pesanan = document.getElementById("jumlah_pesanan").value;

  var formData = new FormData();
  formData.append("jumlah_pesanan", jumlah_pesanan);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  fetch(
    url + `/detail_order/${order_id}/${produk_id}/${ukuran_id}/update`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export function deleteDetailOrder() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);

  let order_id = document.getElementById("order_id").value;
  let produk_id = document.getElementById("produk_id").value;
  let ukuran_id = document.getElementById("ukuran_id").value;

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    url + `/detail_order/${order_id}/${produk_id}/${ukuran_id}/delete`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export function getAllDetailOrderPayment() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${apiUrl}/order/detail`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let subtotalHarga = 0;
      let itemCount = 0;
      data.forEach((item) => {
        itemCount++;
        let itemSubtotal = item.harga_pembayaran;
        subtotalHarga += itemSubtotal;
      });

      const subTotal2 = document.getElementById("subTotal2");
      const itemCountText = document.getElementById("itemCount");
      const total = document.getElementById("total");
      subTotal2.textContent = `Rp ${subtotalHarga}`;
      total.textContent = `Rp ${subtotalHarga}`;
      itemCountText.textContent = `Summey ${itemCount} item`;
    })
    .catch((error) => console.log("error", error));
}

export function detailPayment() {
  var myHeaders = new Headers();
  myHeaders.append("authorization", "Bearer " + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${apiUrl}/userLogin`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("ini result");
      console.log(result)
      document.getElementById("alamat").textContent = result.alamat;
      const alamatArray = result.alamat
      let kota = document.getElementById("kota");
      let prov = document.getElementById("prov");

      const kotaUser = alamatArray[0].trim();
      const provAlamat = alamatArray[1].trim();

      kota.value = kotaUser;
      prov.value = provAlamat;
    })
    .catch((error) => console.log("error", error));

  document
    .getElementById("updateAlamat")
    .addEventListener("submit", (event) => {
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        alamat: "agam,sumatera barat",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${apiUrl}/updateUser`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success) {
            localStorage.setItem("flashMessage", result.success);

            location.reload();
          } else if (result.error) {
            result.error;
            alert("gagal");
          }
        })
        .catch((error) => {
          console.log("error", error);
          alert(error);
        });
    });
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const selectElement = document.getElementById("list-pengiriman");
  const pengirimanElement = document.getElementById("pengiriman");
  const pengiriman_id = document.getElementById("pengiriman_id");
  let pengirimanId = 0;

  // Fetch data and populate the select options
  fetch(`${apiUrl}/distrikPengiriman`, requestOptions)
    .then((response) => response.json()) 
    .then((data) => {
   
      data.forEach((method) => {
        const option = document.createElement("option");
        option.value = method.Pengiriman.nama;
        option.textContent = method.Pengiriman.nama; 
        option.setAttribute("data-pengiriman-id", method.pengiriman_id); 
        selectElement.appendChild(option);
      });
    })
    .catch((error) => console.log("error", error));

  selectElement.addEventListener("change", function () {
    const selectedOption = selectElement.value;
    const selectedOptionId =
      selectElement.options[selectElement.selectedIndex].getAttribute(
        "data-pengiriman-id"
      );
    pengirimanElement.textContent = selectedOption;
    pengiriman_id.value = selectedOptionId;
    pengirimanId = selectedOptionId;
  });
  const selectPembayaran = document.getElementById("list-pembayaran");
  const pembayaranElement = document.getElementById("pembayaran");
  let selectedPaymentId = 0; 

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${apiUrl}/payment`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((payment) => {
        const option = document.createElement("option");
        option.value = payment.pembayaran_id;
        option.textContent = payment.metode;
        selectPembayaran.appendChild(option);
      });
    })
    .catch((error) => console.log("error", error));

  // Tambahkan event listener ke elemen select
  selectPembayaran.addEventListener("change", function () {
    const selectedOption =
      selectPembayaran.options[selectPembayaran.selectedIndex];
    selectedPaymentId = selectedOption.value; // Simpan ID opsi yang dipilih dalam variabel
    const selectedPaymentName = selectedOption.textContent; // Dapatkan nama pembayaran yang dipilih
    pembayaranElement.textContent = selectedPaymentName; // Tampilkan nama pembayaran yang dipilih
    console.log("Selected Payment ID:", selectedPaymentId);
  });

  document.getElementById("updateOrder").addEventListener("submit", (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      pengiriman_id: pengirimanId,
      pembayaran_id: selectedPaymentId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiUrl}/order/update`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          localStorage.setItem("flashMessage", result.success);

          window.location.href = `/bukti?order_id=${result.data.order_id}`;
        } else if (result.error) {
          result.error;
          alert("gagal");
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert(error);
      });
  });
}

export function Invoice() {
  var myHeaders = new Headers();
  myHeaders.append("authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = new URL(window.location.href);
  let order_id = url.searchParams.get("order_id");
  const listItemElement = document.getElementById("list-item");

  let total = 0;
  fetch(`${apiUrl}/order/detail/${order_id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      data.forEach((item) => {
        const orderItem = document.createElement("div");
        orderItem.className = "detail-item-produk";

        const orderImg = document.createElement("div");
        orderImg.className = "order-img";

        const detailImgOrder = document.createElement("div");
        detailImgOrder.className = "detail-img-order";

        const svgElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svgElement.setAttribute("width", "189");
        svgElement.setAttribute("height", "193");

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
    
        fetch(
          `${apiUrl}/detailOrder/${order_id}/${item.produk_id}/${item.ukuran_id}/${item.id_paket}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("ini item barang")
            console.log(result);
            const imgElement = document.createElement("img");
            imgElement.id = "img_produk";
            imgElement.src = `images/${result.DetailProduk.Produk.gambar_produk}`;
            imgElement.alt = "";

            const imgText = document.createElement("div");
            imgText.className = "img-text";

            const h1Element = document.createElement("h1");
            h1Element.id = "nama_produk";
            h1Element.textContent = result.DetailProduk.Produk.nama_produk;

            const pUkuran = document.createElement("p");
            pUkuran.id = "ukuran";
            pUkuran.textContent = `Size: ${result.DetailProduk.Ukuran.ukuran}`;

            const quantityOrder = document.createElement("div");
            quantityOrder.className = "quantity-order";

            const pJumlah = document.createElement("p");
            pJumlah.id = "jumlah";
            pJumlah.textContent = `${item.jumlah_pesanan.toLocaleString()} pcs`;

            const priceOrder = document.createElement("div");
            priceOrder.className = "price-order";

            const pHarga = document.createElement("p");
            pHarga.id = "harga";
            pHarga.textContent = `Rp ${result.harga_pembayaran.toLocaleString()}`;

            let sumHarga = result.harga_pembayaran
            total += sumHarga;
            total= total
        
            detailImgOrder.appendChild(svgElement);
            detailImgOrder.appendChild(imgElement);
            imgText.appendChild(h1Element);
            imgText.appendChild(pUkuran);
    
            orderImg.appendChild(detailImgOrder);
            orderImg.appendChild(imgText);
    
            quantityOrder.appendChild(pJumlah);
            priceOrder.appendChild(pHarga);
    
            orderItem.appendChild(orderImg);
            orderItem.appendChild(quantityOrder);
            orderItem.appendChild(priceOrder);
    
            listItemElement.appendChild(orderItem);

            document.getElementById("biaya").textContent = total.toLocaleString();
            let subBiaya = document.getElementById("sub-biaya");
            subBiaya.value = total;
            console.log('ini sub biaya 1', subBiaya.value);
          })
          .catch((error) => console.log("error", error));
      });
    })
    .catch((error) => console.log("error", error))
    .finally(() => {
    let subBiaya2 = document.getElementById("sub-biaya").value;
   
      myHeaders.append("Content-Type", "application/json");
      document.getElementById("orderId").textContent = order_id;

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${apiUrl}/invoice/${order_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          let tanggal = document.getElementById("tanggal");
          let alamat = document.getElementById("alamat");
          let nama_pengiriman = document.getElementById("nama_pengiriman");
          let nama_pembayaran = document.getElementById("nama_pembayaran");
          let subtotal = document.getElementById("subtotal");
          let biaya_pengiriman = result.biaya_pengiriman;
          const orderDate = new Date(result.tanggal_order);
          const formattedDate = `${orderDate.getDate().toString().padStart(2, '0')}-${(orderDate.getMonth() + 1).toString().padStart(2, '0')}-${orderDate.getFullYear()} ${orderDate.getHours().toString().padStart(2, '0')}:${orderDate.getMinutes().toString().padStart(2, '0')}`;
          
          tanggal.textContent = formattedDate;
          
          alamat.textContent = result.User.alamat;
          nama_pengiriman.textContent = result.DetailPengiriman.Pengiriman.nama;
          nama_pembayaran.textContent = result.Pembayaran.metode;
          subtotal.textContent = biaya_pengiriman.toLocaleString();

          let jumlah = parseFloat(document.getElementById("sub-biaya").value);
          let hasil = document.getElementById('biaya').innerHTML;
          let totalAkhir = biaya_pengiriman + total;
          console.log("ini biaya pengiriman = ", biaya_pengiriman);
          console.log("ini jumlah = ", hasil);
          document.getElementById("total").textContent = totalAkhir.toLocaleString();
        })
        .catch((error) => console.log("error", error));
    });
}


export function history() {
  var myHeaders = new Headers();
  myHeaders.append("authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${apiUrl}/orderHistory`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      const listHistory = document.getElementById("list-history");
      listHistory.innerHTML = ""; // Clear the existing content

      result.forEach((order) => {
        let biayaPengiriman = order.DetailPengiriman.biaya_pengiriman;
        const itemHistory = document.createElement("div");
        itemHistory.classList.add("item-history");

        // Create and update elements within each item
        const detailInvoice = document.createElement("div");
        detailInvoice.classList.add("detail-invoice");

        const icon = document.createElement("div");
        icon.classList.add("icon");

        const detailItemHistory = document.createElement("div");
        detailItemHistory.classList.add("detail-item-history");

        const orderId = document.createElement("h3");
        orderId.textContent = "Order " + order.order_id; // Assuming the order ID is stored in the "id" property

        const tanggal = document.createElement("p");
        const orderDate = new Date(order.tanggal_order);
        const formattedDate = `${orderDate.getDate()}-${orderDate.getMonth() + 1}- ${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}`;
        
        tanggal.textContent = formattedDate;
        const total = document.createElement("h4");
        total.textContent = "Total: Loading..."; 

        detailItemHistory.appendChild(orderId);
        detailItemHistory.appendChild(tanggal);
        detailItemHistory.appendChild(total);

        detailInvoice.appendChild(icon);
        detailInvoice.appendChild(detailItemHistory);

        itemHistory.appendChild(detailInvoice);

        const linkHistory = document.createElement("div");
        const link = document.createElement("a");
        link.classList.add("link-history");
        link.href = "/bukti?order_id=" + order.order_id;
        link.textContent = "View receipt";

        linkHistory.appendChild(link);
        itemHistory.appendChild(linkHistory);
        listHistory.appendChild(itemHistory);

        let harga = 0;
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`${apiUrl}/order/detail/${order.order_id}`, requestOptions)
          .then(response => response.json())
          .then(result =>{ 
            console.log(result)
            result.forEach(item=>{
              console.log(item.harga_pembayaran)
               harga += item.harga_pembayaran
          
            })
          })
          .catch(error => console.log('error', error))
          .finally(()=>{
           total.textContent = `Rp ${harga.toLocaleString()}`
          })

      });
    })
    .catch((error) => console.log("error", error));
}
