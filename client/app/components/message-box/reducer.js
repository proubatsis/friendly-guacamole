import { SHOW_MESSAGE_BOX, HIDE_MESSAGE_BOX } from "./actions";

export default function(state = {}, action) {
    switch(action.type) {
        case SHOW_MESSAGE_BOX:
            return action.message;
        case HIDE_MESSAGE_BOX:
            return {};
        default:
            return state;
    }
}
