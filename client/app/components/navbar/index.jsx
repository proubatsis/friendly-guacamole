import React from "react";
import R from "ramda";

import BrandImage from "../../images/brand.png";
import SearchImage from "../../images/search.png";
import CreateImage from "../../images/create.png";
import UserImage from "../../images/user.png";

const renderTrending = R.map(trending => (
    <li>
        <a href="#">#{trending}</a>
    </li>
));

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
                        <a className="navbar-brand" href="#">
                            <img src={BrandImage}></img>
                        </a>
                    </div>

                    <ul className="nav navbar-nav">
                        {renderTrending(this.props.trending)}
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li><a className="navbar-action-item" href="#"><img src={SearchImage}></img></a></li>
                        <li><a className="navbar-action-item" href="#"><img src={CreateImage}></img></a></li>
                        <li><a className="navbar-action-item" href="#"><img src={UserImage}></img></a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
