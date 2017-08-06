import { connect } from "react-redux";
import { updatePolls } from "./actions";
import { getPolls } from "../../ApiClient";
import HomeView from "./index";
import withNavbar from "util/with-navbar";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.home, ownProps);
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPolls: () => {
            getPolls((err, polls) => {
                if(!err) dispatch(updatePolls(polls));
            });
        }
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(HomeView);
