import {useEffect, useState} from "react";
import {todolistsApi} from "../../features/todolists/model/api/todolists-api";


export const GetResponse = () => {

    const [state, setState] = useState<Array<any>>([]);

    useEffect(()=>{
        todolistsApi.get().then(response=>setState(response.data));
    },[]);

    return<div>
        {state.length >= 0 ? 'Success' : 'Loading'}
        </div>

};

