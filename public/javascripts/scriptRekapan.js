var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${sessionStorage.getItem("token")}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("http://localhost:3000/order", requestOptions)
    .then(response => response.json())
    .then(orders => {
        console.log(orders  )
        var tableBody = document.getElementById('orderTableBody');

        function populateTable(filteredOrders) {
            tableBody.innerHTML = '';

            filteredOrders.forEach((order, index) => {
                var row = tableBody.insertRow(index);
                row.insertCell(0).innerHTML = index + 1;
                row.insertCell(1).innerHTML = order.order_id;
                row.insertCell(2).innerHTML = order.User.nama;
                row.insertCell(3).innerHTML = `<a href="/images/${order.User.picture}" download="${order.User.picture}.png" target="_blank">download</a>`;
                row.insertCell(4).innerHTML = `
                    <span class="act_button">
                        <a href="/bukti?order_id=${order.order_id}" >detail</a>
                        <a href="#" onclick="printOrder(${order.order_id})">print</a>
                    </span>`;
            });
        }

        populateTable(orders);

        // Search functionality
        const search = document.getElementById('search');
        search.addEventListener('input', function () {
            var searchTerm = this.value.toLowerCase();

            var filteredOrders = orders.filter(order =>
                order.User.nama.toLowerCase().includes(searchTerm)||
                order.order_id.toString().includes(searchTerm)
            );

            populateTable(filteredOrders);
        });
    })
    .catch(error => console.log('error', error));


    function printOrder(orderId) {
        // URL halaman yang ingin dicetak
        var url = '/bukti?order_id=37';
    
        // Buat elemen iframe
        var iframe = document.createElement('iframe');
        iframe.style.display = 'blok';
        document.body.appendChild(iframe);
    
        // Set URL iframe ke halaman yang ingin dicetak
        iframe.src = url;
    
        
        iframe.onload = function () {
            // Lakukan pencetakan
            iframe.contentWindow.print();
            iframe.style.display = 'none';
            // document.body.removeChild(iframe);
        };
    }
// Sorting functionality
var orderIDHeader = document.getElementById('orderIDHeader');
var usernameHeader = document.getElementById('usernameHeader');

orderIDHeader.style.cursor = 'pointer';
usernameHeader.style.cursor = 'pointer';

function sortTable(sortKey) {
    var sortedOrders = orders.slice(0); // Clone the original array
    sortedOrders.sort((a, b) => {
        return a[sortKey].localeCompare(b[sortKey]);
    });

    populateTable(sortedOrders);
}