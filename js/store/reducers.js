export default function createReducers(){
    return {
        addItem:(payload,state)=>({
            ...state,
            todo:[payload,...state.todo],
        }),
        editItem: (payload, state) => ({
            ...state,
            todo: [
                ...state.todo.slice(0, payload.id),
                payload.newToDo,
                ...state.todo.slice(payload.id + 1, state.todo.length),
            ],
        }),
        removeItem:(payload,state)=>({
            ...state,
            todo:[
                ...state.todo.slice(0,payload.id),
                ...state.todo.slice(payload.id+1,state.todo.length),
            ]
        }),
        complete:(payload,state)=>({
            ...state,
            todo:[...state.todo.slice(0,payload.id),
                payload.newToDo,
                ...state.todo.slice(payload.id+1,state.todo.length),
            ],
        }),
        login:(payload,state)=>({
            ...state,
            userInfo: {
                authorized:true,
                ...payload,
            }
        }),

    }
}