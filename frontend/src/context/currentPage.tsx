/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useReducer } from "react";
import {
  currentPageReducer,
  initialPage,
} from "../reducers/currentPageReducer";

type CurrentPageContextType = {
  //Declaramos todos los estados y funciones del contexto.
  currentPage: number;
  moviePayload: string;
  moveToList: () => void;
  moveToCreate: () => void;
  moveToEdit: (id: string) => void;
};

export const CurrentPageContext = createContext<
  CurrentPageContextType | undefined
>(undefined); //Exportamos el contexto para poder usarlo dentro de su provider

type ProviderProps = {
  //Es necesario para el prop del Provider
  children: ReactNode;
};

export function CurrentPageProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(currentPageReducer, initialPage); //Necesitamos el state y dispatch para usar el reducer, y pasarle la funcion reducer y un estado inicial

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
      payload: id,
    });

  //Ahora invocamos el provider, las value son todo lo que le tenemos que pasar por contexto (en el caso del estado, indicar que variable es el estado) y envolver al children
  return (
    <CurrentPageContext.Provider
      value={{
        currentPage: state.index,
        moviePayload: state.movieId,
        moveToList,
        moveToCreate,
        moveToEdit,
      }}
    >
      {children}
    </CurrentPageContext.Provider>
  );
}
