import { apiUrl } from './config.js';

let token = sessionStorage.getItem('token');

export function getAllSizes() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('authorization', 'Bearer ' + token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`${apiUrl}/size`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const sizeTableBody = document.getElementById("sizeTableBody");

      data.forEach((data, index) => {
        const row = document.createElement("tr");

        const cellNo = document.createElement("td")
        cellNo.innerHTML = index + 1;

        const cellUkuran = document.createElement("td");
        cellUkuran.innerHTML = data.ukuran;

        const cellAction = document.createElement("td")
        const detailButton = document.createElement("button")
        detailButton.textContent = "Detail";
        detailButton.className = "btn btn-warning rounded-pill"

        detailButton.addEventListener("click", async () => {
          document.getElementById("myModal").style.display = "block";
          const size_id = data.ukuran_id
          const ukuranLama = document.getElementById("ukuran")
          ukuranLama.value = data.ukuran
          document.getElementById("updateSize").addEventListener('submit', (event) => {
            event.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('authorization', 'Bearer ' + token)
            const panjangBaru = document.getElementById("panjangBaru").value
            const lebarBaru = document.getElementById("lebarBaru").value
            const tinggiBaru = document.getElementById("tinggiBaru").value
            const ukuranBaru = `${panjangBaru} cm x ${lebarBaru} cm x ${tinggiBaru} cm`

            var raw = JSON.stringify({
              "ukuran": ukuranBaru
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(`${apiUrl}/size/${size_id}/update`, requestOptions)
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
          document.getElementById("deleteSize").addEventListener('submit', (event) => {
            event.preventDefault();
            let myHeaders = new Headers()
            myHeaders.append('authorization', 'Bearer ' + token)
            var requestOptions = {
              method: 'POST',
              redirect: 'follow',
              headers: myHeaders
            };

            fetch(`${apiUrl}/size/${size_id}/delete`, requestOptions)
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

          console.log(data.ukuran_id)
        })

        cellAction.appendChild(detailButton)

        row.appendChild(cellNo)
        row.appendChild(cellUkuran)
        row.appendChild(cellAction)

        sizeTableBody.appendChild(row)
      });
    })
    .catch(error => console.log('error', error));
}

export function createSize() {
  document.getElementById("addSize").addEventListener('submit', (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('authorization', 'Bearer ' + token)

    const panjang = document.getElementById("panjang").value
    const lebar = document.getElementById("lebar").value
    const tinggi = document.getElementById("tinggi").value

    const ukuran = `${panjang} cm x ${lebar} cm x ${tinggi}cm`
    const raw = JSON.stringify({
      "ukuran": ukuran
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${apiUrl}/size/create`, requestOptions)
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
