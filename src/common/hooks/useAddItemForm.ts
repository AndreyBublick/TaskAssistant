import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "common/hooks/Hooks";
import { getAppError } from "../../app/app-reducer";
import { getTodoLists } from "../../features/todolists/model/todolist-reducer/todolists-reducer";

export const useAddItemForm = (callBack: (value: string) => void) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  const todolists = useAppSelector(getTodoLists);

  useEffect(() => {
    setValue("");
  }, [todolists]); ////////Question

  const deactivateEditMode = useCallback(() => {
    if (value.trim()) {
      callBack(value.trim());

      setError(null);
    } else {
      setError("this field is required");
    }
  }, [callBack, value]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      if (error !== null) {
        setError(null);
      }
    },
    [error],
  ); /**/

  return { value, error, deactivateEditMode, onChangeHandler, setValue };
};
