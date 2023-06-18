function addNewSmartPhone() {
    let name = $('#name').val();
    let description = $('#description').val();
    let price = $('#price').val();
    let addNewProduct = {
        name: name,
        description: description,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(addNewProduct),
        url: "http://localhost:8080/product",
        success: console.log('success')

    });
    event.preventDefault();
}

function getSmartphone(product) {
    return `<tr><td >${product.name}</td><td >${product.description}</td><td >${product.price}</td>` +
        `<td><button class="deleteSmartphone" onclick="deleteRecord(${product.id})">Delete</button></td></tr>`;
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/product",
        success: function (productList) {
            let content = '    <tr>\n' +
                '        <td>Name</td>\n' +
                '        <td>Description</td>\n' +
                '        <td>Price</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < productList.length; i++) {
                content += getSmartphone(productList[i]);
            }
            document.getElementById('listProduct').innerHTML = content;
        }
    });
}
function deleteRecord(id) {
    $.ajax({
        url: `http://localhost:8080/product/${id}` ,
        type: "DELETE",
        success: function(response) {
            alert("Da xoa xong");
        },
        error: function(xhr, status, error) {
            alert("Error deleting record: " + error);
        }
    })
}