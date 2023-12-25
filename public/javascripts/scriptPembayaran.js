import { apiUrl } from './config.js';

let token = sessionStorage.getItem('token')

export function getAllPayments() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('authorization', 'Bearer ' + token)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  fetch(`${apiUrl}/payment`, requestOptions)
    .then(response => response.json())  // Assuming the response is JSON
    .then(data => {
      const paymentTableBody = document.getElementById("paymentTableBody");

      paymentTableBody.innerHTML = '';
      console.log(data)
      data.forEach((payment, index) => {
        const row = document.createElement("tr");

        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;

        const cellPembayaran = document.createElement("td");
        cellPembayaran.textContent = payment.metode;

        const cellAction = document.createElement("td");

        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        detailButton.className = "btn btn-warning";

        // Detail Onclick
        detailButton.addEventListener("click", () => {
          console.log(payment.pembayaran_id)
          document.getElementById("myModal").style.display = "block";
          const metode = document.getElementById('metodeLama')
          metode.value = payment.metode

          document.getElementById('updatePayment').addEventListener('submit', (event) => {
            event.preventDefault();

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('authorization', 'Bearer ' + token)
            const newPayment = document.getElementById('metodeBaru').value

            var raw = JSON.stringify({
              "metode": newPayment
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(`${apiUrl}/payment/${payment.pembayaran_id}/update`, requestOptions)
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

          document.getElementById('deletePayment').addEventListener('submit', (event) => {
            event.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('authorization', 'Bearer ' + token)
            var requestOptions = {
              method: 'POST',
              redirect: 'follow',
              headers: myHeaders
            };

            fetch(`${apiUrl}/payment/${payment.pembayaran_id}/delete`, requestOptions)
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
        row.appendChild(cellAction);
        row.appendChild(cellNo);
        row.appendChild(cellPembayaran);
        row.appendChild(cellAction);

        paymentTableBody.appendChild(row);
      });
    })
    .catch(error => console.log('error', error));
}


export function createPayment() {
  document.getElementById('addPayment').addEventListener('submit', (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('authorization', 'Bearer ' + token)

    const metode = document.getElementById('metode').value
    var raw = JSON.stringify({
      "metode": metode
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${apiUrl}/payment/create`, requestOptions)
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
