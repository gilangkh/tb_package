function getAllPengiriman() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(url + "/pengiriman", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const deliverTableBody = document.getElementById("deliverTableBody");

      data.forEach((deliver, index) => {
        const row = document.createElement("tr");

        // Create cells for "no," "Pengiriman," and "Action"
        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;

        const cellPengiriman = document.createElement("td");
        cellPengiriman.textContent = deliver.nama;

        const cellAction = document.createElement("td");
        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        detailButton.className = "btn btn-warning rounded-pill";

        // Add event listener for the "Detail" button (you can add your logic here)
        detailButton.addEventListener("click", () => {
          document.getElementById("myModal").style.display = "block"
          console.log("Detail button clicked for Pengiriman: " + deliver.nama, '+', deliver.pengiriman_id);
          const pengirimanLama = document.getElementById("pengiriman")
          pengirimanLama.value = deliver.nama
          const pengiriman_id = deliver.pengiriman_id

          document.getElementById("updateDeliver").addEventListener('submit', (event) => {
            event.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const pengirimanBaru = document.getElementById("pengirimanBaru")
            var raw = JSON.stringify({
              "nama": pengirimanBaru.value
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch(`http://localhost:3000/pengiriman/${deliver.pengiriman_id}/update`, requestOptions)
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
          document.getElementById("deleteDeliver").addEventListener('submit', (event) => {
            event.preventDefault();
            var requestOptions = {
              method: 'POST',
              redirect: 'follow'
            };

            fetch(`http://localhost:3000/pengiriman/${pengiriman_id}/delete`, requestOptions)
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

        deliverTableBody.appendChild(row);
      });
    })
    .catch(error => console.log('error', error));
}


function createPengiriman() {

  document.getElementById("deliver").addEventListener('submit', (event) => {
    event.preventDefault();
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let nama = document.getElementById("nama_pengiriman").value;
    var raw = JSON.stringify({
      "nama": nama
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/pengiriman/create", requestOptions)
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


