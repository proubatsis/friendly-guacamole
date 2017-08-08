import React from "react";
import R from "ramda";
import { Link, withRouter } from "react-router-dom";

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
    <li><a href="/api/users/logout">Logout</a></li>,
];

const searchUrl = q => `/search/${q}`;

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        props.fetchTrending();
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    }

    handleSearchKeyPress(e) {
        if (e.key === "Enter") {
            this.props.history.push(searchUrl(this.props.search));
        }
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
                        <li>
                            <input
                                type="text"
                                className="form-control search-box"
                                placeholder="Search"
                                onChange={e => this.props.updateSearch(e.target.value)}
                                onKeyPress={this.handleSearchKeyPress}
                            />
                        </li>
                        <li>
                            <Link className="navbar-action-item" to={searchUrl(this.props.search)}>
                                <img src={SearchImage}></img>
                            </Link>
                        </li>
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

export default withRouter(Navbar);
