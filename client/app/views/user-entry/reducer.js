import { USER_ENTRY_UPDATE_EMAIL, USER_ENTRY_UPDATE_USERNAME, USER_ENTRY_UPDATE_PASSWORD, USER_ENTRY_SUCCESS } from "./actions";

export default function(state = {}, action) {
    switch(action.type) {
        case USER_ENTRY_UPDATE_EMAIL:
            return Object.assign({}, state, { email: action.email });
        case USER_ENTRY_UPDATE_USERNAME:
            return Object.assign({}, state, { username: action.username });
        case USER_ENTRY_UPDATE_PASSWORD:
            return Object.assign({}, state, { password: action.password });
        case USER_ENTRY_SUCCESS:
            return Object.assign({}, state, { isSuccess: action.isSuccess });
        default:
            return state;
    }
}
