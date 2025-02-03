import { createContext, ReactNode, useReducer } from "react";
import { currentPageReducer } from "../reducers/currentPageReducer";

type CurrentPageContextType = {
  currentPage: number;
  moveToList: () => void;
  moveToCreate: () => void;
  moveToEdit: () => void;
};

export const CurrentPageContext = createContext<
  CurrentPageContextType | undefined
>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export function CurrentPageProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(currentPageReducer, 0);

  const moveToList = () =>
    dispatch({
      type: "MOVE_TO_LIST",
    });

  const moveToCreate = () =>
    dispatch({
      type: "MOVE_TO_CREATE",
    });

  const moveToEdit = () =>
    dispatch({
      type: "MOVE_TO_EDIT",
    });

  return (
    <CurrentPageContext.Provider
      value={{ currentPage: state, moveToList, moveToCreate, moveToEdit }}
    >
      {children}
    </CurrentPageContext.Provider>
  );
}
