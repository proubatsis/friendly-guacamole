import { connect } from "react-redux";
import PollView from "./index";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.poll, ownProps);
};

const mapDispatchToProps = dispatch => {
    return {}
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(PollView);
