type State = { //Se crea el tipo que va a manejar el estado de las paginas
  index: number;
  movieId: string;
};

type Action = //Las acciones que nos moveran entre las paginas y entregará el payload del 
  | { type: "MOVE_TO_LIST" }
  | { type: "MOVE_TO_CREATE" }
  | { type: "MOVE_TO_EDIT"; payload: string };

export const initialPage = {
  //Estado inicial del "enrutado". Empezará por el 0 para que muestre la lista de peliculas
  index: 0,
  movieId: "",
};

export const currentPageReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "MOVE_TO_LIST":
      return {index: 0, movieId: ""};
    case "MOVE_TO_CREATE":
      return {index: 1, movieId: ""};
    case "MOVE_TO_EDIT":
      return { index: 2, movieId: action.payload };
    default:
      return state;
  }
};
