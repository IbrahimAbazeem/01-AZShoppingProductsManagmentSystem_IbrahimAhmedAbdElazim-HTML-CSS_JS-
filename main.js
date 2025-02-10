let itemName = document.getElementById('item');
let price = document.getElementById('price');
let taxes = document.getElementById('Tex');
let  overCost= document.getElementById('overcost');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let itemcount = document.getElementById('count');
let category= document.getElementById('Category');
let add = document.getElementById('submit');

let tmp;
let mood ='create';
//console.log(itemName, price , taxes , overCost , discount , itemcount , category , add );

//get total 
function getTotal(){
  if( price.value != ''){
 let result = (+price.value + +taxes.value + +overCost.value) - +discount.value;
  total.innerHTML =result ;
  total.style.background = '#040'
}
else{
  total.innerHTML ='' ;
  total.style.background = ' rgb(143, 64, 64)';
  
  }
}

//creat product item 
// save localstorage 
//hadling localstorage
let itemsArray;
if(localStorage.product != null){
  itemsArray = JSON.parse(localStorage.product)
}
else{  
  itemsArray =[];
}

submit.onclick = function(){
  let newitem = {
    itemName:item.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    overCost: overCost.value,
    discount: discount.value,
    total: total.innerHTML,
    itemcount: itemcount.value,
    category : category.value.toLowerCase(),

  }
  //count //add item to array
  if(mood === 'create'){
  if(newitem.itemcount > 1){
    for(let i = 0; i< newitem.itemcount;i++){
      
      itemsArray.push(newitem);
    }
  }else{
    itemsArray.push(newitem);
  }
  localStorage.setItem('product', JSON.stringify(itemsArray))

  }else{
    itemsArray[tmp] = newitem;
    mood ='create';
    submit.innerHTML ='Create';
    itemcount.style.display = 'block';
   }
  cleardata();
  showData();
}
// clear inputs

function cleardata(){
  item.value=''
  price.value=''
  taxes.value=''
  overCost.value=''
  discount.value=''
  total.innerHTML=''
  itemcount.value=''
  category.value=''
}
// read 
function showData(){
  getTotal()
 let table = ''
 for(let i = 0 ; i<itemsArray.length ; i++){
  // table = itemsArray[i]; //show object we don't need that
  table += `
  <tr>
      <td>${i+1}</td>
      <td>${itemsArray[i].itemName}</td>
      <td>${itemsArray[i].price}</td>
      <td>${itemsArray[i].taxes}</td>
      <td>${itemsArray[i].overCost}</td>
      <td>${itemsArray[i].discount}</td>
      <td>${itemsArray[i].total}</td>
      <td>${itemsArray[i].category}</td>
      <td><button onclick="updateItem(${i})" id="update">Update</button></td>
      <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>  
  </tr>
  `
 }
 document.getElementById('tbody').innerHTML = table;

 // show the delete all button 
 let btndelete = document.getElementById('deleteall');
 

   if(itemsArray.length > 0 ){
     btndelete.innerHTML= ` <button onclick="deleteAll()">Delete All (${itemsArray.length})</button>` 
   }
   else{
    btndelete.innerHTML =''
   
    }

}
showData(); // work all the time
// delete 
function deleteItem(i){
  itemsArray.splice(i,1);
  localStorage.product = JSON.stringify(itemsArray);
  showData();
}

//delete all 
function deleteAll(){
  localStorage.clear();
  itemsArray.splice(0);
  showData();
}

// count done

 // update

 function updateItem(i){
  item.value= itemsArray[i].itemName;
  price.value=itemsArray[i].price;
  taxes.value=itemsArray[i].taxes;
  overCost.value=itemsArray[i].overCost;
  discount.value=itemsArray[i].discount;
  getTotal();
  itemcount.style.display = 'none';
  category.value=itemsArray[i].category;
  submit.innerHTML = 'Update';
  mood= 'update';
  tmp=i;
  scroll({
    top:0,
    behavior:'smooth'
  })
  showData();
 }
 // search 
// search mood
let searchMood = 'item';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchbytitle') {
        searchMood = 'item';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}
// search data
function searchData(value) {
    let table = '';
    value = value.toLowerCase(); 

    for (let i = 0; i < itemsArray.length; i++) {
        if (searchMood === 'item') {
            if (itemsArray[i].itemName.toLowerCase().includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${itemsArray[i].itemName}</td>
                    <td>${itemsArray[i].price}</td>
                    <td>${itemsArray[i].taxes}</td>
                    <td>${itemsArray[i].overCost}</td>
                    <td>${itemsArray[i].discount}</td>
                    <td>${itemsArray[i].total}</td>
                    <td>${itemsArray[i].category}</td>
                    <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>  
                </tr>
                `;
            }
        } else {
            if (itemsArray[i].category.toLowerCase().includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${itemsArray[i].itemName}</td>
                    <td>${itemsArray[i].price}</td>
                    <td>${itemsArray[i].taxes}</td>
                    <td>${itemsArray[i].overCost}</td>
                    <td>${itemsArray[i].discount}</td>
                    <td>${itemsArray[i].total}</td>
                    <td>${itemsArray[i].category}</td>
                    <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>  
                </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

 