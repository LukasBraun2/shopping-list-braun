const submitInfo = document.getElementById('item-form');
const keyboardInput = document.getElementById('item-input');
const listItems = document.getElementById('item-list');
const clearAll = document.getElementById('clear');

function addItem(e) {
    e.preventDefault();
    if(keyboardInput.value === '') {
        alert('must enter an item');
        return;
    }
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(keyboardInput.value));
    const button = createButton('remove-item btn-link text-red');
    item.appendChild(button);
    console.log(item);
    listItems.appendChild(item);
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
        e.target.parentElement.parentElement.remove();

    }
}

function clearList() {
    while(listItems.firstChild) {
        listItems.removeChild(listItems.firstChild);
    }
}

submitInfo.addEventListener('submit', addItem);
keyboardInput.addEventListener('input', getInput);
listItems.addEventListener('click', removeItem);
clearAll.addEventListener('click', clearList);