import { connect } from "react-redux";
import MessageBox from "./index";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.messageBox, ownProps);
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(MessageBox);
