let productNameInput = document.getElementById('productName');
let productPriceInput = document.getElementById('productPrice'); 
let productCategoryInput = document.getElementById('productCategory'); 
let productDescInput = document.getElementById('productDesc'); 

let addBtn = document.getElementById('addBtn');
let updateBtn = document.getElementById('updateBtn');

let temp ;

let productsContainer = [];

if(localStorage.getItem("Products") != null)
{
    productsContainer = JSON.parse( localStorage.getItem("Products") );
    displayProducts(productsContainer);
}

//add product
function addProduct()
{
        let products = {
            name: productNameInput.value ,
            price: productPriceInput.value ,
            category: productCategoryInput.value ,
            desc: productDescInput.value
        }
        productsContainer.push(products)
        // console.log(productsContainer);
        localStorage.setItem("Products" , JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();

}

//display
//arr = productsContainer
function displayProducts(arr)
{
    let cartoona = ``;
    for(let i = 0; i < arr.length ; i++ )
    {
        cartoona += `  <tr>
        <td>${i+1}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td><button onclick="setFormForUbdate(${i})" class="btn btn-outline-warning btn-sm">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">delete</button></td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML  = cartoona;

}

//clear
function clearForm()
{
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

//delete Product
function deleteProduct(productIndex)
{
    productsContainer.splice(productIndex,1);
    localStorage.setItem("Products" , JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

//Search by name
function searchProduct(term)
{
    let matchedProduct = [];
    for(let i = 0; i < productsContainer.length ; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            matchedProduct.push(productsContainer[i]);
        }
    }
    displayProducts(matchedProduct);
}

//update products
function setFormForUbdate(i)
{
    addBtn.classList.replace('d-block' , 'd-none' );
    updateBtn.classList.replace('d-none' , 'd-block');
    productNameInput.value = productsContainer[i].name;
    productPriceInput.value = productsContainer[i].price;
    productCategoryInput.value = productsContainer[i].category;
    productDescInput.value = productsContainer[i].desc;

    temp = i;
    
}

function saveUpdate(temp)
{
    productsContainer[temp].name = productNameInput.value;
    productsContainer[temp].price = productPriceInput.value;
    productsContainer[temp].category = productCategoryInput.value;
    productsContainer[temp].desc = productDescInput.value;
    localStorage.setItem("Products" , JSON.stringify(productsContainer));
    addBtn.classList.replace('d-none' , 'd-block' );
    updateBtn.classList.replace('d-block' , 'd-none');
    displayProducts(productsContainer);
    clearForm();
}

//regex
// function validateProductName()
// {
//     let regex = /^[A-Z][a-z]{2,9}$/;
//     return regex.test(productNameInput.vlaue) ;
    
// }

