import React from "react";
import R from "ramda";
import { Link } from "react-router-dom";

import BrandImage from "../../images/brand.png";
import SearchImage from "../../images/search.png";
import CreateImage from "../../images/create.png";
import UserImage from "../../images/user.png";

const renderTrending = R.map(trending => (
    <li key={trending}>
        <Link to={`/t/${trending}`}>#{trending}</Link>
    </li>
));

const loggedOutMenu = [
    <li><Link to="/login">Login</Link></li>,
    <li><Link to="/signup">Create Account</Link></li>
];

const loggedInMenu = [
    <li><a href="/guac/logout">Logout</a></li>,
];

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        props.fetchTrending();
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand" href="#">
                            <Link to="/"><img src={BrandImage}></img></Link>
                        </div>
                    </div>

                    <ul className="nav navbar-nav">
                        {renderTrending(this.props.trending)}
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li><a className="navbar-action-item" href="#"><img src={SearchImage}></img></a></li>
                        <li><Link className="navbar-action-item" to="/polls/create"><img src={CreateImage}></img></Link></li>
                        <li>
                            <div className="navbar-action-item">
                                <div className="dropdown">
                                    <a className="dropdown-toggle" href="#" data-toggle="dropdown"><img src={UserImage}></img></a>
                                    <ul className="dropdown-menu">
                                        {global.accessToken ? loggedInMenu : loggedOutMenu}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
