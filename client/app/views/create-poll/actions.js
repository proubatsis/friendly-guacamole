export const DEFAULT_STATE = {
    title: "Poll Name",
    description: "Description of your poll",
    options: ["Option 1", "Option 2"]
};

export const LOAD_DEFAULT_STATE = "create poll load default state";
export const UPDATE_TITLE = "create poll update title";
export const UPDATE_DESCRIPTION = "create poll update description";
export const UPDATE_OPTION = "create poll update option";
export const ADD_OPTION = "create poll add option";
export const DELETE_OPTION = "create poll delete option";
export const POLL_CREATED = "create poll -> poll created";

export const loadDefaultState = () => ({
    type: LOAD_DEFAULT_STATE,
    state: DEFAULT_STATE
});

export const updateTitle = title => ({
    type: UPDATE_TITLE,
    title: title
});

export const updateDescription = description => ({
    type: UPDATE_DESCRIPTION,
    description: description
});

export const updateOption = (option, index) => ({
    type: UPDATE_OPTION,
    option: {
        name: option,
        index: index
    }
});

export const addOption = () => ({
    type: ADD_OPTION
});

export const deleteOption = index => ({
    type: DELETE_OPTION,
    index: index
});

export const pollCreated = pollId => ({
    pollId,
    type: POLL_CREATED
});
