/** @format */

function getAllUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(url + "/user", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function createUser() {
  const register = document.getElementById("register");

  register.addEventListener("submit", async (event) => {
    event.preventDefault();

   
  if (!validateForm()) {
    return;
  }

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const telp = document.getElementById("telp").value;
    const alamat = document.getElementById("alamat").value;

    var formdata = new FormData();
    formdata.append("nama", nama);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("telp", telp);
    formdata.append("alamat", alamat);
    formdata.append("status","U")
    // Gantilah ini sesuai dengan elemen HTML yang digunakan untuk mengunggah gambar
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
          // Handle kesalahan jika status respons tidak 200
          throw new Error("HTTP Error: " + response.error);
        }
        return response.json();
      })
      .then((result) => {
        alert("daftar berhasil");
        window.location = "/login";
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
    const fileInput = document.getElementById("picture");
  
    if (!nama || !email || !password || !telp || !alamat ||  !fileInput.files[0]) {
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
}

function profileUser() {
  var myHeaders = new Headers();
  myHeaders.append(
    "authorization",
    "Bearer " + sessionStorage.getItem("token")
  );
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:3000/profileUser", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      let nama = document.getElementById("nama");
      let email = document.getElementById("email");
      let alamat = document.getElementById("alamat");
      let no_hp = document.getElementById("no_hp");
      let updateNama = document.getElementById("updateNama");
      let updateEmail = document.getElementById("updateEmail");
      let updateAlamat = document.getElementById("updateAlamat");
      let updateNoHp = document.getElementById("updateNoHp");
      let foto = document.getElementById("gambar");

      nama.innerText = result.nama;
      email.innerText = result.email;
      alamat.innerText = result.alamat;
      no_hp.innerText = result.telp;

      updateNama.value = result.nama;
      updateEmail.value = result.email;
      updateAlamat.value = result.alamat;
      updateNoHp.value = result.telp;

      foto.src = `/images/${result.picture}`;
    })
    .catch((error) => console.log("error", error));
}

function updateUserProfile() {
  document.getElementById("updateUser").addEventListener("submit", (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      "Bearer " + sessionStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    let updateNama = document.getElementById("updateNama").value;
    let updateAlamat = document.getElementById("updateAlamat").value;
    let updateNoHp = document.getElementById("updateNoHp").value;
    var raw = JSON.stringify({
      username: updateNama,
      alamat: updateAlamat,
      telp: updateNoHp,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/updateProfile", requestOptions)
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
}

function updatePassword() {
  document
    .getElementById("updatePassword")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      var myHeaders = new Headers();
      myHeaders.append(
        "authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");

      let passwordLama=document.getElementById("passwordLama").value
      let password=document.getElementById("passwordBaru").value
      let passwordBaru=document.getElementById("confirmPassword").value

      var raw = JSON.stringify({
        passwordLama: passwordLama,
        password: password,
        passwordBaru: passwordBaru,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/updatePassword", requestOptions)
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
}
