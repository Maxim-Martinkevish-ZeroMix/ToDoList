import Router from "./router.js";
import authStorage from "./authStorage.js";
const Storage = new authStorage();
const router = new Router(document.getElementById('app'));
fetch('https://todo-app-back.herokuapp.com/me', {
    method: 'GET',
    headers: {
        'Authorization': Storage.getAuthItem('auth-items').token,
    }
}).then(resp=>{if(resp.ok){resp.json().then(window.dispatchEvent(new CustomEvent('changeRoute',{detail:{route:'toDoPage'}})));
}else{
    resp.json().then(window.dispatchEvent(new CustomEvent('changeRoute',{detail:{route:'login'}})));
}
});
window.addEventListener('changeRoute',event=>router.changeRoute(event.detail.route));