import { connect } from "react-redux";
import { updateEmail, updateUsername, updatePassword } from "./actions";
import { getPolls } from "../../ApiClient";
import UserView from "./index";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.userEntry, ownProps);
};

const mapDispatchToProps = dispatch => {
    return {
        updateEmail: email => dispatch(updateEmail(email)),
        updateUsername: username => dispatch(updateUsername(username)),
        updatePassword: password => dispatch(updatePassword(password))
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(UserView);
