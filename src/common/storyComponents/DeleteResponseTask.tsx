import {useCallback, useState} from "react";
import {todolistsApi} from "../../features/todolists/model/api/todolists-api";
import {Wrapper} from "./Wrapper/Wrapper";
import {Button, TextField} from "@mui/material";

export const DeleteResponseTask = () => {

    const [state, setState] = useState<boolean>(false);
    const [idTL, setIdTL] = useState<string>('');
    const [idTask, setIdTask] = useState<string>('');




    const addNewTodolist = useCallback(()=>{
        setState(false);
        setIdTL('');
        setIdTask('');

        todolistsApi.deleteTask({todoListId:idTL,id:idTask}).then(()=> setState(true));

    },[idTL,idTask]);


    return  <Wrapper>
        {state ? 'Success' : 'Waiting...'}
        <div>

            <TextField id="standard-basic" onChange={(e)=>{setIdTL(e.currentTarget.value)}} value={idTL} label="Id Todolist" variant="standard" />

            <TextField id="standard-basic" onChange={(e)=>{setIdTask(e.currentTarget.value)}} value={idTask} label="Id Task" variant="standard" />

            <Button disabled={!idTL || !idTask} variant="contained" onClick={addNewTodolist}>Delete</Button>
        </div>

    </Wrapper>
};

