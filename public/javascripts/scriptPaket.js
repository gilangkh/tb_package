/** @format */

document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("closeModal").addEventListener("click", closeModal);

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("http://localhost:3000/paket", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    fetchPaket(result);
  })
  .catch((error) => console.log("error", error));

  function fetchPaket(paket) {
    const tbody = document.getElementById("paketTableBody");
    tbody.innerHTML = "";

    paket.sort((a, b) => a.nama_paket.localeCompare(b.nama_paket));

    paket.forEach((data, index) => {
        let {id_paket, nama_paket} = data;
        const row = document.createElement("tr");
        const numberCell = document.createElement("td");
        numberCell.textContent = index + 1;
        const nameCell = document.createElement("td");
        nameCell.textContent = nama_paket;
        const detailCell = document.createElement("td");
        const buttonDetail = document.createElement("button");
        buttonDetail.textContent = "Detail ";
        buttonDetail.classList = "btn btn-warning";

        detailCell.appendChild(buttonDetail);
        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(detailCell);
        tbody.appendChild(row);

        row.addEventListener("click", () => {
            handleRowClick(id_paket, nama_paket);
        });
    });
}


function handleRowClick(id,nama) {
    openModal()
    console.log("Baris diklik:", id);

    const updateNama=  document .getElementById("update_nama_paket")
    updateNama.value = nama


    document.getElementById('updatepaket').addEventListener('submit',(event)=>{
        event.preventDefault();

        var raw = JSON.stringify({
            "nama_paket": updateNama.value
          });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch(`http://localhost:3000/paket/${id}/update`, requestOptions)
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

}

document.getElementById('addpaket').addEventListener('submit',(event)=>{
    event.preventDefault()
    const nama_paket = document.getElementById('nama_paket')
    var raw = JSON.stringify({
        "nama_paket": nama_paket.value
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/paket/create", requestOptions)
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
