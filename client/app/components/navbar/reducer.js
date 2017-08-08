import { ACTION_NAVBAR_UPDATE_TRENDING, ACTION_NAVBAR_UPDATE_SEARCH } from "./actions";

export default function(state = {}, action) {
    switch(action.type) {
        case ACTION_NAVBAR_UPDATE_TRENDING:
            return Object.assign({}, state, { trending: action.trending });
        case ACTION_NAVBAR_UPDATE_SEARCH:
            return Object.assign({}, state, { search: action.search });
        default:
            return state;
    }
}
