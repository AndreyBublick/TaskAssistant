import axios from "axios";


export const params = {
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{
        'API-KEY': '0e5967bc-e11b-4c40-96f7-71fb2dbec90c',
    },
};

export const todolistsApi={

    get(){return axios.get('todo-lists',params)},

    post(title:string){
       return axios.post('todo-lists', {title}, params);

    },

    put(){},

    delete(){},

};
