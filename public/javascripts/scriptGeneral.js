function verived() {
    const token = sessionStorage.getItem("token");

    if (!token) {
        window.location.href = "/login"; // Redirect to the login page if token doesn't exist
    }

}
function adminHead() {
    const head = document.getElementById("navLinks"); // Corrected the element ID

    // Create a link for "Delivery"
    const deliver = document.createElement('a');
    deliver.innerText = 'Delivery';
    deliver.href = '/deliver/detail';
    deliver.className = 'item';
    head.appendChild(deliver);

    // Create a link for "Payment"
    const payment = document.createElement('a');
    payment.innerText = 'Payment';
    payment.href = '/pembayaran'; // Link to the /pembayaran URL
    payment.className = 'item';
    head.appendChild(payment);

    // Create a link for "DetailItem"
    const detailItem = document.createElement('a');
    detailItem.innerText = 'Item';
    detailItem.href = '/produk/detail'; // Link to the /produk/detail URL
    detailItem.className = 'item';
    head.appendChild(detailItem);
}
function generalHead() {
    const head = document.getElementById("generalHead");

    const body = `
        <div class="beranda">
            <h2 class="header-1">Q u a </h2>
            <h2 class="header-2">k e t</h2>
        </div>
        <div class="beranda px-3 mx-3" id="navLinks">
            <a id="home" class="item" href="/home">Home</a>
            <a id="produk" class="item" href="/barang">Produk</a>
            <a id="order" class="item" href="/transaksi">Order</a>
        </div>
    `;

    head.insertAdjacentHTML('beforeend', body);

    const flashMessage = localStorage.getItem("flashMessage");
    if (flashMessage) {
        const message = document.getElementById("flash-message");
        const p = document.createElement("p");
        p.textContent = flashMessage;
        p.className = "flash-message success"
        message.appendChild(p);
        localStorage.removeItem("flashMessage"); // Hapus pesan sukses setelah ditampilkan
    }
}

function generalNav() {

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

