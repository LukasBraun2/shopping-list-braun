const submitInfo = document.getElementById('item-form');
const keyboardInput = document.getElementById('item-input');
const listItems = document.getElementById('item-list');
const clearAll = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
}

function addItemSubmit(e) {
    e.preventDefault();
    if(keyboardInput.value === '') {
        alert('must enter an item');
        return;
    }

    addItemToDOM(keyboardInput.value);
    addItemToStorage(keyboardInput.value);
    checkUI();

    keyboardInput.value = '';

}

function addItemToDOM(itemVal){
    //create a new list item
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(itemVal));
 //   localStorage.setItem(document.createTextNode(keyboardInput.value));
    const button = createButton('remove-item btn-link text-red');
    item.appendChild(button);
   // console.log(itemVal);
    //adding items to list
    listItems.appendChild(item);
}


function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;    

}

function addItemToStorage(itemVal) {
   const itemsFromStrg = getItemFromStorage();

   itemsFromStrg.push(itemVal);
   localStorage.setItem('items', JSON.stringify(itemsFromStrg));   
}

function getItemFromStorage (){
    let itemsFromStrg;
    if(localStorage.getItem('items') === null) {
        itemsFromStrg = [];
    } else {
        itemsFromStrg = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStrg;
}

function getInput(e) {
    console.log(e.target.value);
}

function onClick(e){
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
}

function removeItem(e) {
    console.log(e)
    //remove from DOM
    if(confirm('Are you sure you want to delete this item?')) {
        e.remove();
    }
    //remove from storage
    removeItemFromStorage(e.textContent);
    checkUI();
}

function removeItemFromStorage(itemVal) {
    let itemsFromStrg = getItemFromStorage();
    itemsFromStrg = itemsFromStrg.filter(item => item !== itemVal);
    localStorage.setItem('items', JSON.stringify(itemsFromStrg));
}

function clearList() {
    if(confirm('Are you sure you want to clear all items?')) {
        while(listItems.firstChild) {
            listItems.removeChild(listItems.firstChild);
       }
    }
    checkUI();
    localStorage.removeItem('items');
}

function filterItem(e) {
    const needFilter = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    needFilter.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        //check all text in the list items
        if(itemName.indexOf(text) != -1) {
            //show if input matches
            item.style.display = 'flex';
        } else {
            //hide if not
            item.style.display = 'none';
        }
    });
}
function checkUI() {
    const needFilter = document.querySelectorAll('li');
    console.log(needFilter.length);
    if (needFilter.length === 0){
        clearAll.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearAll.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}


//initialize the app
function init() {
    submitInfo.addEventListener('submit', addItemSubmit);
    keyboardInput.addEventListener('input', getInput);
    listItems.addEventListener('click', onClick);
    clearAll.addEventListener('click', clearList);
    itemFilter.addEventListener('input', filterItem);
    document.addEventListener('DOMContentLoaded', displayItems);   

    checkUI();
}

init();
