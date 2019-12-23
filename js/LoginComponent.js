import Component from './component.js';
import store from './store/index.js';
import link from './link.js';
import authStorage from "./authStorage.js";
import Backend from "./Backend.js";

export default class LoginComponent extends Component{
    constructor(app,settings,backend) {
        const template = document.getElementById('login').content.cloneNode(true);
        app.appendChild(template);
        super(store,backend,app);
        const Storage = new authStorage();
        backend = new Backend(store,Storage);
        app.querySelector('#singIn').addEventListener('click', () => {
            backend.LogIn(backend.url.login,document.getElementById('email').value,document.getElementById('password').value,Storage);
            fetch('https://todo-app-back.herokuapp.com/me', {
                method: 'GET',
                headers: {
                    'Authorization': Storage.getAuthItem('auth-items').token,
                }
                }).then(resp =>resp.json()).then(resp=>{if(resp.token === Storage.getAuthItem('auth-items').token)setTimeout(()=>{link('toDoPage')},500)});
        });



    }
    render(){
        console.log(document.getElementById('email').value);
    }
}
