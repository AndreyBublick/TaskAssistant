import {ChangeEvent, useState} from "react";

export const useInput = () => {
    const [value, setValue] = useState('');
    const  changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    return {value,changeHandler};
};