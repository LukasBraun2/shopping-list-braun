const submitInfo = document.getElementById('item-form');
const keyboardInput = document.getElementById('item-input');
const listItems = document.getElementById('item-list');
const clearAll = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
    e.preventDefault();
    if(keyboardInput.value === '') {
        alert('must enter an item');
        return;
    }
    //create a new list item
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(keyboardInput.value));
    const button = createButton('remove-item btn-link text-red');
    item.appendChild(button);
    console.log(item);
    //adding items to list
    listItems.appendChild(item);

    checkUI();

    keyboardInput.value = '';

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

function getInput(e) {
    console.log(e.target.value);
}

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        if(confirm('Are you sure you want to delete this item?')) {
            e.target.parentElement.parentElement.remove();
        }

    }
    checkUI();
}

function clearList() {
    if(confirm('Are you sure you want to clear all items?')) {
        while(listItems.firstChild) {
            listItems.removeChild(listItems.firstChild);
       }
    }
    checkUI();
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
function filterItem(e) {
    
}

submitInfo.addEventListener('submit', addItem);
keyboardInput.addEventListener('input', getInput);
listItems.addEventListener('click', removeItem);
clearAll.addEventListener('click', clearList);
itemFilter.addEventListener('input', filterItem);

checkUI();