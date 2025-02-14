import React, { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { TextField } from "@mui/material";

type PropsType = {
  title: string;
  changeString: (inputValue: string) => void;
  disabled?: boolean;
};

export const EditableSpan: FC<PropsType> = memo(({ title, changeString, disabled }) => {
  const [value, setValue] = useState<string>("");

  const [editMode, setEditMode] = useState(false);
  const isOpen = editMode && !disabled;
  const diactivateEditMode = useCallback(() => {
    setEditMode(false);
    changeString(value.trim());
  }, [value, changeString]);

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.code === "Enter") {
        diactivateEditMode();
      }
    },
    [diactivateEditMode],
  );

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  const activateEditMode = useCallback(() => {
    setValue(title);
    setEditMode(true);
  }, [title]);

  return isOpen ? (
    <TextField
      autoFocus
      value={value}
      onChange={onChangeHandler}
      onBlur={diactivateEditMode}
      onKeyDown={onKeyDownHandler}
      disabled={disabled}
    />
  ) : (
    <>
      <span onDoubleClick={activateEditMode}>{title}</span>
    </>
  );
});
