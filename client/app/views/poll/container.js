import { connect } from "react-redux";
import PollView from "./index";
import { updatePollView } from "./actions";
import { getPoll } from "../../ApiClient";
import { copyToClipboard } from "../../util/clipboard";
import { showAndHideMessageBox, MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_ERROR, DURATION_SHORT } from "../../components/message-box/actions";
import { vote } from "../../ApiClient";

const COPY_SUCCESSFUL_MESSAGE = "Poll URL copied to clipboard!";
const COPY_FAILURE_MESSAGE = "Poll URL cannot be copied :(";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.poll, ownProps);
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPoll: id => getPoll(id, (err, poll) => {
            if(!err) dispatch(updatePollView(poll));
        }),
        copyUrlToClipboard: () => {
            if(copyToClipboard(window.location.href))
                showAndHideMessageBox(COPY_SUCCESSFUL_MESSAGE, MESSAGE_TYPE_SUCCESS, DURATION_SHORT, dispatch);
            else showAndHideMessageBox(COPY_FAILURE_MESSAGE, MESSAGE_TYPE_ERROR, DURATION_SHORT, dispatch);
        },
        vote: (pollId, optId) => {
            vote(pollId, optId, (err, res) => {
                if (!err && res.body) dispatch(updatePollView(res.body));
            });
        }
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(PollView);
