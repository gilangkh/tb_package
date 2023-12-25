/** @format */
import { apiUrl } from './config.js';

export function getAllUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(`${apiUrl}/user`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export function createUser() {
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
    formdata.append("status", "U");
    var fileInput = document.getElementById("picture");
    formdata.append("picture", fileInput.files[0]);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${apiUrl}/user/create`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert(response.statusText)
          throw new Error("HTTP Error: " + response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        alert("daftar berhasil");
        window.location = "/login";
        console.log(result);
      })
      .catch((error) => {
        alert(error)
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

    if (!nama || !email || !password || !telp || !alamat || !fileInput.files[0]) {
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

export function profileUser() {
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

  fetch(`${apiUrl}/profileUser`, requestOptions)
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

export function updateUserProfile() {
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

    fetch(`${apiUrl}/updateProfile`, requestOptions)
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

export function updatePassword() {
  document.getElementById("updatePassword").addEventListener("submit", (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      "Bearer " + sessionStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    let passwordLama = document.getElementById("passwordLama").value;
    let password = document.getElementById("passwordBaru").value;
    let passwordBaru = document.getElementById("confirmPassword").value;

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

    fetch(`${apiUrl}/updatePassword`, requestOptions)
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
