import { ACTION_UPDATE_POLL_VIEW } from "./actions";

export default function(state = {}, action) {
    switch(action.type) {
        case ACTION_UPDATE_POLL_VIEW:
            return action.poll;
        default:
            return state;
    }
}
