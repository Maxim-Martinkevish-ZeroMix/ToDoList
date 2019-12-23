export default function createInput(id){
    const changeItem = document.createElement('input');
    changeItem.type = 'text';
    changeItem.className = 'input-change';
    changeItem.setAttribute('maxlength','90');
    changeItem.value = document.querySelectorAll('.todoItem')[id].innerText;
    document.querySelectorAll('li')[id].appendChild(changeItem);
    document.querySelectorAll('.change')[id].remove();
    document.querySelectorAll('.todoItem')[id].remove();
    document.querySelectorAll('.close')[id].remove();
    const buttonSave = document.createElement('button');
    buttonSave.type = 'button';
    buttonSave.className = 'save-button';
    buttonSave.innerText = 'Save';
    document.querySelectorAll('li')[id].appendChild(buttonSave);
    changeItem.focus();
}


