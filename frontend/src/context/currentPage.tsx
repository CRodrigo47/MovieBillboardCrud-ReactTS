/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useReducer } from "react";
import { currentPageReducer, initialPage } from "../reducers/currentPageReducer";

type CurrentPageContextType = {
  currentPage: number;
  moviePayload: (string);
  moveToList: () => void;
  moveToCreate: () => void;
  moveToEdit: (id: string) => void;
};

export const CurrentPageContext = createContext<
  CurrentPageContextType | undefined
>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export function CurrentPageProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(currentPageReducer, initialPage);

  const moveToList = () =>
    dispatch({
      type: "MOVE_TO_LIST",
    });

  const moveToCreate = () =>
    dispatch({
      type: "MOVE_TO_CREATE",
    });

  const moveToEdit = (id: string) =>
    dispatch({
      type: "MOVE_TO_EDIT",
      payload: id
    });

  return (
    <CurrentPageContext.Provider
      value={{ currentPage: state.index, moviePayload: state.movieId, moveToList, moveToCreate, moveToEdit }}
    >
      {children}
    </CurrentPageContext.Provider>
  );
}
