import ListComponent from "./list-component.js";
import LoginComponent from "./LoginComponent.js";

export default {
    'login':{
        data:{route: 'login'},
        url: 'login',
        component: LoginComponent,
        settings:{
            redirect:'toDoPage'
        }
    },
    'toDoPage':{
        data: {route: 'toDoPage'},
        url:'toDoPage',
        component: ListComponent,
        settings: {},
    }

}