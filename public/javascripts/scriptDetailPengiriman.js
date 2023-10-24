let token = sessionStorage.getItem('token')
function getAllDetailPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders

  };

  fetch("http://localhost:3000/detailPengiriman", requestOptions)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      const detailTableBody = document.getElementById("detailTableBody");
      detailTableBody.innerHTML = ""; // Clear existing content
      console.log(data)
      data.forEach((detail, index) => {
        const row = document.createElement("tr");

        // Create cells for "no," "nama pengiriman," "jenis pengiriman," "biaya," and "Action"
        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;

        const cellNamaPengiriman = document.createElement("td");
        cellNamaPengiriman.textContent = detail.Pengiriman.nama;

        const cellJenisPengiriman = document.createElement("td");
        cellJenisPengiriman.textContent = detail.JenisPengiriman.jenis;

        const cellBiaya = document.createElement("td");
        cellBiaya.textContent = detail.biaya_pengiriman;

        const cellAction = document.createElement("td");
        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        detailButton.className = "btn btn-warning";

        const TypeButton = document.createElement("a");
        TypeButton.textContent = "Deliver"; // Ganti detailButton menjadi TypeButton
        TypeButton.className = "btn btn-info rounded-pill";
        TypeButton.href = '/delivery';
        const raw = document.createElement('div')
        raw.className = 'flex-detail'

        detailButton.addEventListener('click', async () => {
          document.getElementById("myModal").style.display = "block";

          console.log(detail.pengiriman_id)
          const pengiriman = document.getElementById("pengirimanLama")
          const jenis = document.getElementById("jenisPengirimanLama")
          pengiriman.value = detail.Pengiriman.nama
          jenis.value = detail.JenisPengiriman.jenis
          const biaya = document.getElementById("biayaLama")
          biaya.value = detail.biaya_pengiriman

          document.getElementById("updateDetail").addEventListener('submit', (event) => {
            event.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('authorization', 'Bearer ' + token)

            const biayaBaru = document.getElementById('newBiaya').value
            var raw = JSON.stringify({
              "biaya_pengiriman": biayaBaru
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(`http://localhost:3000/detailPengiriman/${detail.pengiriman_id}/${detail.jenis_pengiriman_id}/update`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (result.success) {
                  localStorage.setItem("flashMessage", result.success);

                  location.reload();
                } else if (result.error) {
                  result.error
                  alert("gagal")
                }
              })
              .catch(error => {
                console.log('error', error)
                alert(error)
              });

          })
          document.getElementById("deleteDetail").addEventListener('submit', (event) => {
            event.preventDefault();
            var requestOptions = {
              method: 'POST',
              redirect: 'follow',
              headers: myHeaders
            };

            fetch(`http://localhost:3000/detailPengiriman/${detail.pengiriman_id}/${detail.jenis_pengiriman_id}/delete`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (result.success) {
                  localStorage.setItem("flashMessage", result.success);

                  location.reload();
                } else if (result.error) {
                  result.error
                  alert("gagal")
                }
              })
              .catch(error => {
                console.log('error', error)
                alert(error)
              });
          })

          console.log(detail.biaya_pengiriman)
        })

        // Add event listener for the "Detail" button (you can add your logic here)


        raw.appendChild(detailButton)
        raw.appendChild(TypeButton)

        cellAction.appendChild(raw)
        // Add the cells to the row and the row to the table body
        row.appendChild(cellNo);
        row.appendChild(cellNamaPengiriman);
        row.appendChild(cellJenisPengiriman);
        row.appendChild(cellBiaya);
        row.appendChild(cellAction);

        detailTableBody.appendChild(row);
      });
    })
    .catch(error => console.log('error', error));
}


function createDetailPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  fetch("http://localhost:3000/jenis_pengiriman", requestOptions)
    .then(response => response.json())
    .then(data => {
      const selectElement = document.getElementById("jenis_pengiriman");

      selectElement.innerHTML = "";

      const emptyOption = document.createElement("option");
      emptyOption.value = "Pilih Jenis Pengiriman";
      emptyOption.textContent = "Pilih Jenis Pengiriman";
      emptyOption.disabled = true;
      emptyOption.selected = true;
      selectElement.appendChild(emptyOption);
      console.log(data)

      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.jenis_pengiriman_id;
        option.textContent = item.jenis;
        selectElement.appendChild(option);
      });
    })
    .catch(error => console.log('error', error));

  var selectElement = document.getElementById("pengiriman");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  fetch("http://localhost:3000/pengiriman", requestOptions)
    .then(response => response.json())
    .then(data => {

      selectElement.innerHTML = "";

      var emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "pilih Pengiriman";
      emptyOption.disabled = true;
      emptyOption.selected = true;
      selectElement.appendChild(emptyOption);


      data.forEach(item => {
        var option = document.createElement("option");
        option.value = item.pengiriman_id;
        option.textContent = item.nama;
        selectElement.appendChild(option);
      });
    })
    .catch(error => console.log('error', error));

  document.getElementById("addDetail").addEventListener('submit', (event) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('authorization', 'Bearer ' + token);

    const pengiriman_id = document.getElementById('pengiriman').value
    const jenis_pengiriman_id = document.getElementById('jenis_pengiriman').value
    const biaya = document.getElementById('biaya').value
    var raw = JSON.stringify({
      "pengiriman_id": pengiriman_id,
      "jenis_pengiriman_id": jenis_pengiriman_id,
      "biaya_pengiriman": biaya
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/detailPengiriman/create", requestOptions)
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
      });
  })
}

function updateDetailPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('authorization', 'Bearer ' + token)
  
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
