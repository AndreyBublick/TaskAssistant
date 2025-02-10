import { ChangeEvent, useCallback, useState } from "react";

export const useAddItemForm = (callBack: (value: string) => void) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  const deactivateEditMode = useCallback(() => {
    if (value.trim()) {
      callBack(value.trim());
      setValue("");
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
