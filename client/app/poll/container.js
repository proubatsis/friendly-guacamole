import { connect } from "react-redux";
import Poll from "./index";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.poll, ownProps);
};

const mapDispatchToProps = (state) => {
    return {};
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(Poll);
