document.addEventListener("DOMContentLoaded", function () {
    displayCart()
})

function SaveItem() {
    let name = document.querySelector("#productName").value
    let data = document.querySelector("#quantity").value
    localStorage.setItem(name, data)
    displayCart()

}

function ModifyItem() {
    let name = document.querySelector("#productName").value
    document.querySelector("#quantity").value = localStorage.getItem(name)
    displayCart()
}

function RemoveItem() {
    let name = document.querySelector("#productName").value
    document.querySelector("#productName").value = ""
    document.querySelector("#quantity").value = ""
    localStorage.removeItem(name)
    displayCart()
}

function ClearAll() {
    localStorage.clear()
    displayCart()
}

// dynamically draw the table

function displayCart() {
    let key = ""
    let list = "<tr><th>Name</th><th>Quantity</th></tr>\n"

    for (let i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i)
        list += `<tr><td> ${key} </td>
            	<td> ${localStorage.getItem(key)} </td></tr>`
    }

    document.getElementById('list').innerHTML = list
}
