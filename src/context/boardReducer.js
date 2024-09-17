import { types } from "../types/types";


export const boardReducer = (state = {}, action) => {
    switch (action.type) {
        case types.activeBoard: {
            
            return {
                ...state,
                active: action.payload,
            }
        }

        default:
            break;
    }
}



