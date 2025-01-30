import React, { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { TextField } from "@mui/material";

type PropsType = {
  title: string;
  changeString: (inputValue: string) => void;
};

export const EditableString: FC<PropsType> = memo(({ title, changeString }) => {
  const [value, setValue] = useState<string>("");

  const [editMode, setEditMode] = useState(false);

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

  return editMode ? (
    <TextField
      autoFocus
      value={value}
      onChange={onChangeHandler}
      onBlur={diactivateEditMode}
      onKeyDown={onKeyDownHandler}
    />
  ) : (
    <>
      <span onDoubleClick={activateEditMode}>{title}</span>
    </>
  );
});

/*const TitleTodoList = styled.h2`
    font-size: 22px;
    margin: 0;
`;*/
