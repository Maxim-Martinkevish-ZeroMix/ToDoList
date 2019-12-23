import Component from "./component.js";
import store from "./store/index.js";
import authStorage from "./authStorage.js";
import Backend from "./Backend.js";
import filters from "./filters.js";
import changeToDo from "./changeToDo.js";
export default class ListComponent extends Component{
    constructor(app,backend,settings){
        const template = document.getElementById('toDoPage').content.cloneNode(true);
        app.append(template);
        super(store,backend, document.querySelector('#list'));
        backend = new Backend(store,new authStorage());
        store.state.todo = [];
        backend.getItems(backend.url.todos);
        const exitButton = document.getElementById('exit');
        this.counterFin = document.getElementById('counterFin');
        this.counterUnFin = document.getElementById('counterUnFin');
        this.counterAll =document.getElementById('counterAll');
        const filterFin = document.getElementById('filterFin');
        const filterUnFin = document.getElementById('filterUnFin');
        const filterAll = document.getElementById('filterAll');
        const input = document.getElementById('toDoEl');
        const submit = document.querySelector('.addBtn');
        const addHandleClick = () =>{
            let value = input.value.trim();
            if(value.length>=5){
                backend.addItem(backend.url.todos,input.value);
                input.value = '';
                input.focus();}};
        const addButtonPress = event=>{
            let value = input.value.trim();
            if(event.keyCode === 13 && value.length>=5){
                backend.addItem(backend.url.todos,input.value);
                input.value = '';
                input.focus();}}
        filterFin.addEventListener('click',filters.filterFinButton);
        filterUnFin.addEventListener('click',filters.filterUnFinButton);
        filterAll.addEventListener('click',filters.filterAllButton);
        submit.addEventListener('click',addHandleClick);
        input.addEventListener('keydown', addButtonPress);
    }
    render() {
        if (store.state.todo.length == 0) {
            this.anchor.innerHTML = `<li>To-do list is empty</li>`;
            return;
        }
        this.anchor.innerHTML = `${store.state.todo.map(todoItem => `
			<li class="listItem"><div class="todoItem"><span>${todoItem.text}</span></div><span class ="change" >C</span><span class="close" >X</span></li>`).join('')
        }`;
        this.anchor.querySelectorAll('.todoItem').forEach((li, id) => {
            let newToDo = store.state.todo[id];
            let cache = store.state.todo[id]._id;
            li.addEventListener('click', () => {
                let state = true;
                let back = new Backend(store, new authStorage());
                back.updateState(back.url.update, cache, id, state);
                newToDo.completed = true;
                store.dispatch('complete', {newToDo, id})
            })
        });
        this.anchor.querySelectorAll('li').forEach((li, id) => {
            if (store.state.todo[id].completed === true) {
                li.className = 'checked';
            }
        });
        this.counterFin.innerHTML=document.querySelectorAll('.checked').length;
        this.counterUnFin.innerHTML=document.querySelectorAll('li').length-document.querySelectorAll('.checked').length;
        this.counterAll.innerHTML=document.querySelectorAll('li').length;
        this.anchor.querySelectorAll('.change').forEach((button, id) => {
            button.addEventListener('click', () => {
                changeToDo(id);
                let changeItem = document.querySelector('.input-change')
                let buttonSave = document.querySelector('.save-button');
                let newToDo = store.state.todo[id];
                let cache = store.state.todo[id]._id;
                buttonSave.addEventListener('click', () => {
                    let value = changeItem.value.trim();
                    let back = new Backend(store, new authStorage());
                    newToDo.text = value;
                    if (value.length) {
                        back.updateItem(back.url.update, cache, id, value);
                        store.dispatch('editItem', {newToDo, id});
                    }
                })
            })
        });
        this.anchor.querySelectorAll('.close').forEach((button, id) => {
            let cache = store.state.todo[id]._id;
            let back = new Backend(store, new authStorage());
            button.addEventListener('click', () => {
                back.removeItem(back.url.delete, cache, id);
                store.dispatch('removeItem', {id});
                this.counterFin.innerHTML=document.querySelectorAll('.checked').length;
                this.counterAll.innerHTML=document.querySelectorAll('listItem').length;
                this.counterUnFin.innerHTML=document.querySelectorAll('listItem').length-document.querySelectorAll('.checked').length;
            })
        });
        document.querySelector('.cleaner').addEventListener('click', () => {
            let back = new Backend(store, new authStorage());
            this.counterFin.innerHTML=0;
            this.counterUnFin.innerHTML=0;
            this.counterAll.innerHTML=0;
            this.anchor.querySelectorAll('li').forEach((li, id) => {
                let cache = store.state.todo[id]._id;
                back.removeItem(back.url.delete, cache, id);
                store.dispatch('removeItem', {id});
            })
        });




    }}