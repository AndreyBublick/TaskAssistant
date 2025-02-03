import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

/*export const useAppDispatch = useDispatch.withTypes<AppDispatch>();*/
export const useAppDispatch = () => useDispatch<AppDispatch>();
/*export const useAppSelector = useSelector.withTypes<RootStateType>();*/
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
