import { connect } from "react-redux";
import { updatePolls } from "./actions";
import { getPolls } from "../../ApiClient";
import HomeView from "./index";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.home, ownProps);
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPolls: () => {
            getPolls((err, res) => {
                if(!err) dispatch(updatePolls(res.body));
            });
        }
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(HomeView);
