import {Task} from "../../../src/components/tasks/task/Task";
import {Decorator} from "../../.storybook/decorator/Decorator.jsx";



export default {
    title: 'Task/Loer',
    component: Task,
    decorators:[Decorator]

};

export const Default = {
    args:{
            id:'1',
            title:'Test Task',
            isDone:false,

    },
};

export const Default2 = {
    args:{
        id:'1',
        title:'Test Task',
        isDone:false,

    },
};




