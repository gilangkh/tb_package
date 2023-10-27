

let token = sessionStorage.getItem('token')

function getAllProducts() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('authorization', 'Bearer ' + token)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(url + "/product", requestOptions)
    .then(response => response.json())
    .then(data => {

      const tableBody = document.getElementById("produkTableBody");
      console.log(data);
      data.forEach((produk, index) => {
        const row = document.createElement("tr");
        const noCell = document.createElement("td");
        noCell.textContent = index + 1;
        const nameCell = document.createElement("td");
        nameCell.textContent = produk.nama_produk;
        const imgCell = document.createElement("td");
        const img = document.createElement("img");
        img.className = "table-img";
        img.src = `/images/${produk.gambar_produk}`;
        img.alt = produk.nama_produk;
        const rawImg = document.createElement("div")
        rawImg.className = "img-flex "
        const changeImg = document.createElement("button")
        changeImg.textContent = "change"
        changeImg.className = "btn btn-warning m-2"
        rawImg.appendChild(img)
        rawImg.appendChild(changeImg)

        imgCell.appendChild(rawImg);

        changeImg.addEventListener('click', async () => {
          console.log(produk.produk_id)
          document.getElementById("yModal").style.display = "block";
          document.getElementById("produk_img").src = `/images/${produk.gambar_produk}`
          document.getElementById("imgForm").addEventListener("submit", (event) => {
            const fileInput = document.getElementById("inputImg")
            event.preventDefault();

            var formdata = new FormData();
            formdata.append("gambar_produk", fileInput.files[0],);
            let myHeaders = new Headers()
            myHeaders.append('authorization', 'Bearer ' + token)
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
              headers: myHeaders
            };

            fetch(`http://localhost:3000/product/${produk.produk_id}/updateImg`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)

                document.getElementById("yModal").style.display = "none"
                localStorage.setItem("flashMessage", result.success);
                location.reload()
              })
              .catch(error => console.log('error', error));

          })


        })
        // Kolom "Action" dengan tombol "Detail"
        const action = document.createElement("td");
        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        detailButton.className = "btn btn-warning rounded-pill"

        // Update Produk
        detailButton.addEventListener("click", async () => {
          const modalUpdate = document.getElementById("myModal")
          modalUpdate.style.display = "block";
          const produk_id = produk.produk_id
          const nama_produk = document.getElementById("produk_name")
          const deskrip = document.getElementById("description")
          const imgUrl = document.getElementById("produk_img")
          nama_produk.value = produk.nama_produk;
          deskrip.value = produk.deskripsi
          imgUrl.src = `/images/${produk.gambar_produk}`
          document.getElementById("updateData").addEventListener("submit", (event) => {
            event.preventDefault();

            var updateHeaders = new Headers();
            updateHeaders.append("Content-Type", "application/json");

            updateHeaders.append('authorization', 'Bearer ' + token)
            var raw = JSON.stringify({
              "nama_produk": nama_produk.value,
              "deskripsi": deskrip.value
            });

            var requestOptions = {
              method: 'POST',
              headers: updateHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(`http://localhost:3000/product/${produk_id}/update`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)
                console.log(result.success)

                document.getElementById("myModal").style.display = "none"

                localStorage.setItem("flashMessage", result.success);

                // Melakukan reload halaman
                location.reload()

              })
              .catch(error => console.log('error', error));
        

          })

          document.querySelector("#deleteProduk button").addEventListener('click', (event) => {
            event.preventDefault();
            let myHeaders = new Headers()
            myHeaders.append('authorization', 'Bearer ' + token)
            var requestOptions = {
              method: 'POST',
              redirect: 'follow',
              headers: myHeaders
            };

            fetch(`http://localhost:3000/product/${produk_id}/delete`, requestOptions)
              .then(response => response.text())
              .then(result => {
                console.log(result);
                document.getElementById("myModal").style.display = "none";

                localStorage.setItem("flashMessage", result.success);

                // Melakukan reload halaman
                location.reload();
              })
              .catch(error => console.log('error', error));
          });


        });



        action.appendChild(detailButton);

        // Kolom deskripsi
        const deskripsiCell = document.createElement("td");
        deskripsiCell.textContent = produk.deskripsi;

        // Tambahkan semua kolom ke baris
        row.appendChild(noCell);
        row.appendChild(nameCell);
        row.appendChild(imgCell);
        row.appendChild(deskripsiCell);
        row.appendChild(action);

        // Tambahkan baris ke tbody
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.log('error', error));
}



function createProduct() {
  const createProduk = document.getElementById("createProduk");
  createProduk.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah tindakan default formulir

    let token = sessionStorage.getItem('token'); // Ganti dengan token yang sesuai

    // Mengambil data dari elemen formulir
    let produk_id = document.getElementById("produk_id").value;
    let nama_produk = document.getElementById("nama_produk").value;
    let deskripsi = document.getElementById("deskripsi").value;
    let fileInput = document.getElementById("gambar_produk");

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);

    var formdata = new FormData();
    formdata.append("produk_id", produk_id);
    formdata.append("nama_produk",  nama_produk);
    formdata.append("deskripsi", deskripsi);
    formdata.append("gambar_produk", fileInput.files[0]);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:3000/product/create", requestOptions);
      const result = await response.json();
      console.log(result);

      if (result.success) {
        localStorage.setItem("flashMessage", result.success);

        // Melakukan reload halaman
        location.reload();
      } else if (result.error) {
        alert("Gagal: " + result.error);
      }
    } catch (error) {
      console.log('error', error);
      alert("Terjadi kesalahan: " + error);
    }
  });
}





// modalProduk
function openModal() {
  document.getElementById("myModal").style.display = "block";
  console.log("id : ", produk.produk_id)
}

// Function to close the modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
function closeModalImg() {
  document.getElementById("yModal").style.display = "none";
} 