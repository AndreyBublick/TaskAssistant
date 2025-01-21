import {useEffect, useState} from "react";
import axios from "axios";
import {params} from "../../features/todolists/model/api/todolists-api";

export const DeleteResponse = () => {

    const [state, setState] = useState<any>('');

    useEffect(()=>{
        axios.delete(`todo-lists/50201f1c-b7e5-4b9a-8db8-df1140d11acb`, params).then(()=> {
            setState('success');
        });
    },[]);


    return (
        <div>
            {state ? 'Success' : 'Loading'}
        </div>
    );
};

