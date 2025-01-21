import {ChangeEvent, KeyboardEvent, useCallback} from "react";

export const useInput = (onKeyDown:((e:KeyboardEvent<HTMLInputElement>)=>void)|undefined,onChange:((e:ChangeEvent<HTMLInputElement>)=>void)|undefined) => {

    const  onChangeHandler =useCallback((e:ChangeEvent<HTMLInputElement>)=>{onChange?.(e)},[onChange]);


    const onKeyDownHandler = useCallback((e:KeyboardEvent<HTMLInputElement>)=>{
        (e.key === 'Enter' && onKeyDown) && onKeyDown(e);
    },[onKeyDown]);

    return {onChangeHandler,onKeyDownHandler};
};