import {useEffect, useState} from "react";
import {todolistsApi} from "../../features/todolists/model/api/todolists-api";

export const PutResponse = () => {

    const [state, setState] = useState<any>(null);


    useEffect(() => {

        todolistsApi.putTodolist({id:'4d8affed-720e-45b8-ae86-ceca06d77691',title:'8956'}).then((response) => {
            setState(response.data);
        })
    }, []);

    return (
        <div>
            {state ? 'Success' : 'Loading'}

        </div>
    );
};

