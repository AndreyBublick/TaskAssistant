import {useEffect, useState} from "react";
import {todolistsApi} from "../../features/todolists/model/api/todolists-api";

export const PostResponse = () => {


    const [state, setState] = useState<any>('');


    useEffect(()=>{
        todolistsApi.post('123123')
        .then(response=> setState(response.data.data.item));
    },[]);

    return (
        <div>
            {state ? 'Success' : 'Loading'}
        </div>
    );
};

