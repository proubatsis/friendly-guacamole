import { connect } from "react-redux";
import Navbar from "./index";

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.navbar, ownProps);
};

const mapDispatchToProps = (state) => {
    return {};
};

const connection = connect(mapStateToProps, mapDispatchToProps);
export default connection(Navbar);
