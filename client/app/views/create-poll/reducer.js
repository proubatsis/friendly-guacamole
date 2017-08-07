import {
    LOAD_DEFAULT_STATE,
    UPDATE_TITLE,
    UPDATE_DESCRIPTION,
    UPDATE_OPTION,
    ADD_OPTION,
    DELETE_OPTION,
    UPDATE_TAGS
} from "./actions";
import R from "ramda";

const MAX_TAGS = 3;

const reduceOptions = (state, action) => {
    switch(action.type) {
        case UPDATE_OPTION:
            return R.update(action.option.index, action.option.name, state);
        case ADD_OPTION:
            return R.append("Option", state);
        case DELETE_OPTION:
            return R.remove(action.index, 1, state);
        default:
            return state;
    }
};

const optionsEvent = (state, action) => Object.assign({}, state, { options: reduceOptions(state.options, action) });

export default function(state = {}, action) {
    switch(action.type) {
        case LOAD_DEFAULT_STATE:
            return action.state;
        case UPDATE_TITLE:
            return Object.assign({}, state, { title: action.title });
        case UPDATE_DESCRIPTION:
            return Object.assign({}, state, { description: action.description });
        case UPDATE_TAGS:
            return Object.assign({}, state, { tags: R.take(MAX_TAGS, action.tags) });
        default:
            return optionsEvent(state, action);
    }
}
