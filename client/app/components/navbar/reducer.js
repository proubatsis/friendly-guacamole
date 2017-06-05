import { ACTION_NAVBAR_UPDATE_TRENDING } from "./actions";

export default function(state = {}, action) {
    switch(action.type) {
        case ACTION_NAVBAR_UPDATE_TRENDING:
            return Object.assign({}, state, { trending: action.trending });
        default:
            return state;
    }
}
