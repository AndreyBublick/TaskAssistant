import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStateType } from "../../app/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootStateType>();
