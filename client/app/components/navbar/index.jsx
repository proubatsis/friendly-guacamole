import React from "react";
import R from "ramda";

const renderTrending = R.map(trending => (
    <li>
        <a href="#">#{trending}</a>
    </li>
));

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Friendly Guacamole</a>
                    </div>
                    <ul className="nav navbar-nav">
                        {renderTrending(this.props.trending)}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
