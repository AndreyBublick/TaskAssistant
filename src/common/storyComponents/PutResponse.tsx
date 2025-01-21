import {useEffect, useState} from "react";
import axios from "axios";
import {params} from "../../features/todolists/model/api/todolists-api";

export const PutResponse = () => {

    const [state, setState] = useState<any>(null);



    useEffect(()=>{
        axios.put('todo-lists/eab107bd-4172-4258-91ab-da00e42b7b76', {title:'1h'}, params).then((response)=> {
            setState(response.data);
        })},[]);


    return (
        <div>
            {state ? 'Success' : 'Loading'}

        </div>
    );
};

