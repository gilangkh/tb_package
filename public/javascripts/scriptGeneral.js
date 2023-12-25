/** @format */
import { apiUrl } from "./config.js";

export function verived() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }
}
export function toggleDropdown() {
  document.getElementById("dropDownBtn").addEventListener("click", () => {
    var dropdown = document.querySelector(".dropdown-content");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  });
}

export function logout() {
  document.getElementById("btnLogout").addEventListener("click", () => {
    if (window.confirm("apakah anda ingin logout")) {
      sessionStorage.removeItem("token");
      window.location.reload();
    } else {
      console.log("tidak jadi logout");
    }
  });
}
export function adminHead() {
  const head = document.getElementById("navLinks"); // Corrected the element ID

  head.innerHTML = ``;
  // Create a link for "Delivery"
  const deliver = document.createElement("a");
  deliver.innerText = "Shipping";
  deliver.href = "/deliver/detail";
  deliver.className = "item";
  head.appendChild(deliver);

  // Create a link for "Payment"
  const payment = document.createElement("a");
  payment.innerText = "Payment";
  payment.href = "/pembayaran"; // Link to the /pembayaran URL
  payment.className = "item";
  head.appendChild(payment);

  // Create a link for "DetailItem"
  const detailItem = document.createElement("a");
  detailItem.innerText = "DetailProduk";
  detailItem.href = "/produk/detail";
  detailItem.className = "item";
  head.appendChild(detailItem);

  const rekapan = document.createElement("a");
  rekapan.innerText = "Rekapan";
  rekapan.href = "/rekapan";
  rekapan.className = "item";
  head.appendChild(rekapan);
  const users = document.createElement("a");
  users.innerText = "Users";
  users.href = "/userWinda";
  users.className = "item";
  head.appendChild(users);
}
export function generalHead() {
  const head = document.getElementById("generalHead");

  head.innerHTML = `
    <div class="new-head">
    <div class="left-head">
    <a href="/home" style="text-decoration:none"> 
        <div class="beranda">
            <h2 class="header-1">L a p a c k</h2>
            <h2 class="header-2">K e m a s a n</h2>
        </div>
    </a>
        <div class="beranda px-3 mx-3" id="navLinks">
            <a id="home" class="item" href="/home">Home</a>
            <a id="produk" class="item" href="/barang">Produk</a>
            <a id="order" class="item" href="/transaksi">Order</a>
        </div>
    </div>
    <div class="right-head">
        <div class="dropdown">
            <button class="dropdown-btn" id="dropDownBtn" onclick="toggleDropdown()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
            </button>
            <ul class="dropdown-content">
                <li><a style="text-decoration :none; color:black; " href="/profile">Profile</a></li>
                <li><button id="btnLogout" onclick="logout()">Logout</button></li>
            </ul>
        </div>
        <div>
            <div>
                <a href="/keranjang">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                    d="M7.50694 25C6.8188 25 6.22971 24.7552 5.73968 24.2656C5.24964 23.776 5.00462 23.1875 5.00462 22.5C5.00462 21.8125 5.24964 21.224 5.73968 20.7344C6.22971 20.2448 6.8188 20 7.50694 20C8.19507 20 8.78416 20.2448 9.27419 20.7344C9.76423 21.224 10.0092 21.8125 10.0092 22.5C10.0092 23.1875 9.76423 23.776 9.27419 24.2656C8.78416 24.7552 8.19507 25 7.50694 25ZM20.0185 25C19.3304 25 18.7413 24.7552 18.2512 24.2656C17.7612 23.776 17.5162 23.1875 17.5162 22.5C17.5162 21.8125 17.7612 21.224 18.2512 20.7344C18.7413 20.2448 19.3304 20 20.0185 20C20.7066 20 21.2957 20.2448 21.7858 20.7344C22.2758 21.224 22.5208 21.8125 22.5208 22.5C22.5208 23.1875 22.2758 23.776 21.7858 24.2656C21.2957 24.7552 20.7066 25 20.0185 25ZM6.44345 5L9.44623 11.25H18.2043L21.645 5H6.44345ZM5.25485 2.5H23.7094C24.189 2.5 24.5539 2.71354 24.8042 3.14062C25.0544 3.56771 25.0648 4 24.8354 4.4375L20.3938 12.4375C20.1645 12.8542 19.8569 13.1771 19.4711 13.4062C19.0853 13.6354 18.6631 13.75 18.2043 13.75H8.88321L7.50694 16.25H22.5208V18.75H7.50694C6.56857 18.75 5.85958 18.3385 5.37997 17.5156C4.90036 16.6927 4.87951 15.875 5.31741 15.0625L7.00647 12L2.50231 2.5H0V0H4.06626L5.25485 2.5Z"
                    fill="#090973" />
            </svg>
                </a>
            </div>
        </div>
    </div>
</div>
    `;

  const flashMessage = localStorage.getItem("flashMessage");
  if (flashMessage) {
    const message = document.getElementById("flash-message");
    const p = document.createElement("p");
    p.textContent = flashMessage;
    p.className = "flash-message success";
    message.appendChild(p);
    localStorage.removeItem("flashMessage"); // Hapus pesan sukses setelah ditampilkan
  }
}

export function generalNav() {
  const home = document.getElementById("home");
  const produk = document.getElementById("produk");
  const order = document.getElementById("order");

  const navLinks = document.getElementById("navLinks");
  var links = navLinks.querySelectorAll(".item");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Dapatkan URL yang dituju oleh tag "a"
      const targetURL = link.getAttribute("href");

      // Dapatkan URL halaman saat ini
      const currentURL = window.location.href;

      // Periksa apakah URL saat ini sama dengan URL yang dituju
      if (currentURL === targetURL) {
        // Jika sama, maka tambahkan class "item-nav" dan hapus class "item" pada link yang diklik
        links.forEach((otherLink) => {
          otherLink.classList.remove("item-nav");
          otherLink.classList.add("item");
        });
        link.classList.remove("item");
        link.classList.add("item-nav");
      } else {
        // Jika URL tidak sama, biarkan browser menavigasi ke halaman yang dituju
        window.location.href = targetURL;
      }
    });
  });
}
