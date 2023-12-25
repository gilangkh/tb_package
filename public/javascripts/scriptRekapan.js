import { apiUrl } from './config.js';

var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${sessionStorage.getItem("token")}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(`${apiUrl}/order`, requestOptions)
    .then(response => response.json())
    .then(orders => {
        console.log(orders)
        var tableBody = document.getElementById('orderTableBody');

        function populateTable(filteredOrders) {
            tableBody.innerHTML = '';

            filteredOrders.forEach((order, index) => {
                var row = tableBody.insertRow(index);
                row.insertCell(0).innerHTML = index + 1;
                row.insertCell(1).innerHTML = order.order_id;
                row.insertCell(2).innerHTML = order.User.nama;
                row.insertCell(3).innerHTML = `<a href="${apiUrl}/images/${order.User.picture}" download="${order.User.picture}.png" target="_blank">download</a>`;
                row.insertCell(4).innerHTML = `
                    <span class="act_button">
                        <a href="${apiUrl}/bukti?order_id=${order.order_id}" >detail</a>
                        <a id="printOrder" href="#" >print</a>
                    </span>`;

                    document.getElementById("printOrder").addEventListener('click',()=>{
                        var url = `${apiUrl}/bukti?order_id=${order.order_id}`;

                        // Buat elemen iframe
                        var iframe = document.createElement('iframe');
                        iframe.style.display = 'block';
                        document.body.appendChild(iframe);
                    
                        // Set URL iframe ke halaman yang ingin dicetak
                        iframe.src = url;
                    
                        iframe.onload = function () {
                            // Lakukan pencetakan
                            iframe.contentWindow.print();
                            iframe.style.display = 'none';
                            // document.body.removeChild(iframe);
                        };
                    })
            });
            
        }

        populateTable(orders);

        // Search functionality
        const search = document.getElementById('search');
        search.addEventListener('input', function () {
            var searchTerm = this.value.toLowerCase();

            var filteredOrders = orders.filter(order =>
                order.User.nama.toLowerCase().includes(searchTerm) ||
                order.order_id.toString().includes(searchTerm)
            );

            populateTable(filteredOrders);
        });
    })
    .catch(error => console.log('error', error));




// Sorting functionality
var orderIDHeader = document.getElementById('orderIDHeader');
var usernameHeader = document.getElementById('usernameHeader');

orderIDHeader.style.cursor = 'pointer';
usernameHeader.style.cursor = 'pointer';
