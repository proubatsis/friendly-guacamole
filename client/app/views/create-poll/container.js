import { connect } from "react-redux";
import { loadDefaultState, updateTitle, updateDescription, updateOption, addOption, deleteOption } from "./actions";
import { showAndHideMessageBox, DURATION_MEDIUM, MESSAGE_TYPE_ERROR } from "../../components/message-box/actions";
import CreatePollView from "./index";

const MIN_OPTIONS_MESSAGE = "You must have at least 2 options in your poll!";
const MAX_OPTIONS_MESSAGE = "You can only have at most 8 options in your poll!";
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 8;

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.createPoll, ownProps);
};

const mapDispatchToProps = dispatch => {
    return {
        loadDefaultState: () => dispatch(loadDefaultState()),
        updateTitle: title => dispatch(updateTitle(title)),
        updateDescription: description => dispatch(updateDescription(description)),
        updateOption: (option, index) => dispatch(updateOption(option, index)),
        addOption: options => {
            if(options.length < MAX_OPTIONS) dispatch(addOption());
            else showAndHideMessageBox(MAX_OPTIONS_MESSAGE, MESSAGE_TYPE_ERROR, DURATION_MEDIUM, dispatch);
        },
        deleteOption: (options, index) => {
            if(options.length > MIN_OPTIONS) dispatch(deleteOption(index));
            else showAndHideMessageBox(MIN_OPTIONS_MESSAGE, MESSAGE_TYPE_ERROR, DURATION_MEDIUM, dispatch);
        }
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(CreatePollView);
