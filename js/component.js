import store from './store/index.js'
import Backend from "./Backend.js";
import authStorage from "./authStorage.js";

export default class Component {
    constructor(store,backend,anchor){
        this.anchor = anchor;
        this.store = store;
        this.backend = backend
        this._render_=this.render.bind(this);
        store.events.subscribe('change',this._render_);
    }
    onDestroy(){
        store.events.unsubscribe('change',this._render_);
        document.getElementById('app').innerHTML='';
    }
}