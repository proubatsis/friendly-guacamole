import React from "react";
import Poll from "../../poll";

class HomeView extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                {this.props.polls.map(function(poll, i) {
                    return <Poll key={i} {...poll} />
                })}
            </div>
        );
    }
}

export default HomeView;
