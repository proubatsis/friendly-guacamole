import { connect } from "react-redux";
import PollView from "./index";
import { updatePollView } from "./actions";
import { getPoll } from "../../ApiClient";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.poll, ownProps);
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPoll: id => getPoll(id, (err, poll) => {
            if(!err) dispatch(updatePollView(poll));
        })
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(PollView);
