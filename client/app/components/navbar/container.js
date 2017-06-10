import { connect } from "react-redux";
import Navbar from "./index";
import { updateTrending } from "./actions";
import { getTrending } from "../../ApiClient";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.navbar, ownProps);
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrending: function() {
            getTrending(function(err, trending) {
                if(!err) dispatch(updateTrending(trending));
            });
        }
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(Navbar);
