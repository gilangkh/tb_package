/** @format */

var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${sessionStorage.getItem("token")}`);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("http://localhost:3000/user", requestOptions)
  .then((response) => response.json())
  .then((users) => {
    var originalUsers = users;
    console.log(users);

    var tableBody = document.getElementById("userTableBody");

    function populateTable(filteredUsers) {
      tableBody.innerHTML = "";

      filteredUsers.forEach((user, index) => {
        if (user.status === "u") {
          user.status = "user";
        }
      
        var row = tableBody.insertRow(index);
      
        const cell1 = row.insertCell(0)
        const cell2 = row.insertCell(1)
        const cell3 = row.insertCell(2)
        const cell4 = row.insertCell(3)
        const cell5 = row.insertCell(4)
        const cell6 = row.insertCell(5)
        const cell7 = row.insertCell(6)
        const cell8 = row.insertCell(7)
        cell1.innerHTML = index + 1
        cell2.innerHTML = user.nama;
        cell3.innerHTML = user.email;
       
        cell5.innerHTML = user.telp;
        cell6.innerHTML = user.alamat;
        cell7.innerHTML = user.status;
        cell8.innerHTML =
          '<button class="btn btn-danger text-white" onclick="editUser(' +
          user.user_id +
          ')"><i class="bi bi-trash3"></i></button>';
      
        const editPasswordBtn = document.createElement("button")
        editPasswordBtn.classList = `btn btn-link text-orange`
        editPasswordBtn.style = `color :#FFB137`
        editPasswordBtn.textContent = 'edit password'
        editPasswordBtn.addEventListener("click", () => {
          editPassword(user.user_id)
        });
      
        cell4.appendChild(editPasswordBtn)
      });
      
    }

    populateTable(users);

    const search = document.getElementById("searchUser");
    search.addEventListener("input", function () {
      var searchTerm = this.value.toLowerCase();

      var filteredUsers = originalUsers.filter(
        (user) =>
          user.nama.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.alamat.toLowerCase().includes(searchTerm) ||
          user.telp.toLowerCase().includes(searchTerm)
      );

      filteredUsers.sort((a, b) => {
        const nameComparison = a.status.localeCompare(b.status);
        if (nameComparison !== 0) {
          return nameComparison;
        }

        return a.nama.localeCompare(b.nama);
      });

      populateTable(filteredUsers);
    });
  })
  .catch((error) => console.log("error", error));

function editUser(userId) {
  console.log("Editing user with ID:", userId);
  if (window.confirm("apakah anda ingin menghapus data user")) {
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`http://localhost:3000/user/${userId}/delete`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP Error: " + response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem("flashMessage", result.success);

      window.location.reload();
      console.log(result);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error)
    });
  } else {
    alert("tidak jadi");
  }
}

function editPassword(userId) {
  console.log("Editing user with ID:", userId);
  document.getElementById("myModal").style.display="block"
  document.getElementById("formPasssword").addEventListener('submit',(event)=>{
    event.preventDefault()

    const newPassword = document.getElementById('updatePasswordUser')
    var raw = JSON.stringify({
      "password": newPassword.value
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(`http://localhost:3000/adminPassword/${userId}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP Error: " + response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem("flashMessage", result.success);

      window.location.reload();
      console.log(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  })
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";

}

document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("modalCloseBtn").addEventListener("click", closeModal);


document.getElementById("createUser").addEventListener("submit", (event) => {
  event.preventDefault();


  if (!validateForm()) {
    return;
  }

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const telp = document.getElementById("telp").value;
  const alamat = document.getElementById("alamat").value;
  const status = document.getElementById("status").value;

  var formdata = new FormData();
  formdata.append("nama", nama);
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("telp", telp);
  formdata.append("alamat", alamat);
  formdata.append("status", status);
  var fileInput = document.getElementById("picture");
  formdata.append("picture", fileInput.files[0]);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };


  fetch("http://localhost:3000/user/create", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP Error: " + response.error);
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem("flashMessage", result.success);

      window.location.reload();
      console.log(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});


function validateForm() {
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const telp = document.getElementById("telp").value;
  const alamat = document.getElementById("alamat").value;
  const status = document.getElementById("status").value;
  const fileInput = document.getElementById("picture");

  if (!nama || !email || !password || !telp || !alamat || !status || !fileInput.files[0]) {
    alert("Semua kolom harus diisi.");
    return false;
  }
  const fileExtension = fileInput.files[0].name.split('.').pop().toLowerCase();

  if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
    alert("Pilih file gambar dengan format jpg, jpeg, atau png.");
    return false;
  }

  return true;
}

