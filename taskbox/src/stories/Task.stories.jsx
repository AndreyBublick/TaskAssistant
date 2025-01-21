import {Task} from "../../../src/features/todolists/ui/todoLists/todolist/tasks/task/Task";
import {Decorator} from "../../.storybook/decorator/Decorator.jsx";



export default {
    title: 'Task/Layer',
    component: Task,
    decorators:[Decorator]

};

export const TaskDefault = {
    args:{
        task:{
            id:'1',
            title:'Test Task',
            isDone:false,
        }
    },
};






