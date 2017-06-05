import { ACTION_HOME_UPDATE_POLLS } from "./actions";

export default function(state = {}, action) {
    switch(action.type) {
        case ACTION_HOME_UPDATE_POLLS:
            return Object.assign({}, state, { polls: action.polls });
        default:
            return state;
    }
};
