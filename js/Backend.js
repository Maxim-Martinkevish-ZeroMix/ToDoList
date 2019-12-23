import routerConfig from "./routerConfig.js";
import link from "./link.js";

export default class Backend{
    constructor(store,authStorage) {
    this.store = store;
    this.authStorage = authStorage;
    this.url = {login:'https://todo-app-back.herokuapp.com/login', me:'https://todo-app-back.herokuapp.com/me', todos:'https://todo-app-back.herokuapp.com/todos', update:'https://todo-app-back.herokuapp.com/todos/', delete:`https://todo-app-back.herokuapp.com/todos/`,}
    }
    getItems(url){
        fetch(url,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getAuthItem('auth-items').token}})
            .then(resp=>resp.json()).then(resp => resp.forEach(item => this.store.dispatch('addItem', item)))}
    addItem(url,item){
        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getAuthItem('auth-items').token
            },
            body: JSON.stringify({
                text: item
            }),})
            .then(resp=>resp.json()).then(responseItem=>{this.store.dispatch('addItem', responseItem);});}
    removeItem(url,cache,id){
        fetch(url+cache, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getAuthItem('auth-items').token}})}
    updateItem(url,cache,id,item){
        fetch(url+cache, {
            method: 'PUT',
            body:
                JSON.stringify({
                    text : item,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  this.authStorage.getAuthItem('auth-items').token}})}
    updateState(url,cache,id,state=false){
        fetch(url+cache, {
            method: 'PUT',
            body:
                JSON.stringify({
                    completed: state,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  this.authStorage.getAuthItem('auth-items').token}})}
    LogIn(url,email='',password='',authStorage){
        fetch(url, {
            method: 'POST',
            body:
                JSON.stringify({
                    email: email,
                    password: password,
                }),
            headers: {
                'Content-Type': 'application/json'
            }}) .then(resp => resp.json())
            .then(resp=>{this.authStorage.setAuthItem('auth-items',resp)});}
}
