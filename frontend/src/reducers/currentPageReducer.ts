type State = number

type Action = 
 |{type: "MOVE_TO_LIST"}
 |{type: "MOVE_TO_CREATE"}
 |{type: "MOVE_TO_EDIT"}

export const currentPageReducer = (state: State, action: Action) => {
    switch(action.type){
        case "MOVE_TO_LIST":
            return 0
        case "MOVE_TO_CREATE":
            return 1
        case "MOVE_TO_EDIT":
            return 2
        default:
            return state
    }
}