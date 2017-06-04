import React from "react";
import Poll from "../../poll";
import R from "ramda";

const POLLS_PER_ROW = 3;

const renderPolls = R.map(poll => (
    <div className="col-xs-12 col-lg-4">
        <Poll {...poll} />
    </div>
));

const renderRows = R.map(row => (
    <div className="row">
        {renderPolls(row)}
    </div>
));

class HomeView extends React.Component {
    render() {
        const rows = R.splitEvery(POLLS_PER_ROW, this.props.polls);

        return (
            <div className="container-fluid">
                {renderRows(rows)}
            </div>
        );
    }
}

export default HomeView;
