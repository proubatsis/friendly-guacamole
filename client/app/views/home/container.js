import { connect } from "react-redux";
import HomeView from "./index";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.home, ownProps);
};

const mapDispatchToProps = (state) => {
    return {};
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(HomeView);
