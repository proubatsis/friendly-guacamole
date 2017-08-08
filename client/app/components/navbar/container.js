import { connect } from "react-redux";
import Navbar from "./index";
import { updateTrending, updateSearch } from "./actions";
import { getTrending } from "../../ApiClient";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.navbar, ownProps);
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrending: () => {
            getTrending(function(err, trending) {
                if(!err) dispatch(updateTrending(trending));
            });
        },
        updateSearch: (search) => {
            dispatch(updateSearch(search));
        }
    };
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(Navbar);
