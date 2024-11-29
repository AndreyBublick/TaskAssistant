import React, {FC, useEffect, useState} from 'react';
import {Input} from "../input/Input";
import {Button} from "../button/Button";

type PropsType = {
    callBack: (value: string) => void,
    autoFocus?: boolean,
    isDisabledOnBlur?: boolean,
    defaultValue?: string,

};

export const AddItemForm: FC<PropsType> = ({callBack, autoFocus, isDisabledOnBlur=true,defaultValue}) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

   /* const onClickHandler = () => {

        if (!!value) {
            callBack(value.trim());

            setValue('');
            setError(null);

        } else {
            setError('this field is required');

        }
    };*/
    const diactivateEditMode = () => {

        if (!!value) {
            callBack(value.trim());

            setValue('');
            setError(null);

        } else {
            setError('this field is required');

        }

    };


    const onChangeHandler = () => {
        setError(null);
    };
    const onBlurHandler = () => {

        if (!isDisabledOnBlur) {

            if (!!value) {

                callBack(value.trim());

                setValue('');
                setError(null);

            }

            else {
                setError('this field is required');

            }
        }

    };


    useEffect(() => {

        defaultValue && setValue(defaultValue);
    }, [defaultValue]);

    return <div>
        <Input autoFocus={autoFocus} onKeyDown={diactivateEditMode} onBlur={onBlurHandler} onChange={onChangeHandler}
               error={error} req={true} value={value}
               setValue={setValue}/>
        <Button disabled={!!error} title={'+'} onClick={diactivateEditMode}/>
        {error && <span style={{color: "red", display: "block"}}>this field required</span>}

    </div>;
};

