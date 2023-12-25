import { apiUrl } from './config.js';
let token = sessionStorage.getItem('token')

export function getAllJenisPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('authorization', 'Bearer ' + token)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(`${apiUrl}/jenis_pengiriman`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const deliverTypeTableBody = document.getElementById("deliverTypeTableBody");

      data.forEach((jenisPengiriman, index) => {
        const row = document.createElement("tr");

        // Create cells for "no," "Pengiriman," and "Action"
        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;

        const cellPengiriman = document.createElement("td");
        cellPengiriman.textContent = jenisPengiriman.jenis;

        const cellAction = document.createElement("td");
        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        detailButton.className = "btn btn-warning rounded-pill";

        // Add event listener for the "Detail" button (you can add your logic here)
        detailButton.addEventListener("click", () => {
          document.getElementById("myModalType").style.display = "block"
          console.log(jenisPengiriman.jenis_pengiriman_id);
          const jenis_pengiriman_lama = document.getElementById("jenis_pengiriman")
          jenis_pengiriman_lama.value = jenisPengiriman.jenis
          const jenis_pengiriman_id = jenisPengiriman.jenis_pengiriman_id

          document.getElementById("updateDeliverType").addEventListener('submit', (event) => {
            event.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('authorization', 'Bearer ' + token)

            const jenis_pengiriman_baru = document.getElementById("jenis_pengirimanBaru").value
            var raw = JSON.stringify({
              "jenis": jenis_pengiriman_baru
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(`${apiUrl}/jenis_pengiriman/${jenis_pengiriman_id}/update`, requestOptions)
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

          document.getElementById("deleteDeliverType").addEventListener('submit', (event) => {
            event.preventDefault();
            var requestOptions = {
              method: 'POST',
              redirect: 'follow',
              headers:myHeaders
            };

            fetch(`${apiUrl}/jenis_pengiriman/${jenis_pengiriman_id}/delete`, requestOptions)
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

        });

        cellAction.appendChild(detailButton);

        // Add the cells to the row and the row to the table body
        row.appendChild(cellNo);
        row.appendChild(cellPengiriman);
        row.appendChild(cellAction);

        deliverTypeTableBody.appendChild(row);
      });
    })
    .catch(error => console.log('error', error));
}

export function createJenisPengiriman() {
  document.getElementById("deliverType").addEventListener('submit', (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('authorization', 'Bearer ' + token)

    const jenis = document.getElementById('jenis').value
    var raw = JSON.stringify({
      "jenis": jenis
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${apiUrl}/jenis_pengiriman/create`, requestOptions)
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
