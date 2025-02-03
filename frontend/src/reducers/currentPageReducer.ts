type State = {
  index: number;
  movieId: string;
};

type Action =
  | { type: "MOVE_TO_LIST" }
  | { type: "MOVE_TO_CREATE" }
  | { type: "MOVE_TO_EDIT"; payload: string };

export const initialPage = {
  index: 0,
  movieId: "",
};

export const currentPageReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "MOVE_TO_LIST":
      return {index: 0, movieId: ""};
    case "MOVE_TO_CREATE":
      return {index: 0, movieId: ""};
    case "MOVE_TO_EDIT":
      return { index: 2, movieId: action.payload };
    default:
      return state;
  }
};
