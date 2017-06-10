import React from "react";
import Poll from "../../components/poll";
import R from "ramda";

const POLLS_PER_ROW = 3;

const rowKey = R.compose(R.reduce((a, b) => a + b.toString(), ""), R.map(poll => poll.id));

const renderPolls = R.map(poll => (
    <div key={poll.id} className="col-xs-12 col-lg-4">
        <Poll {...poll} />
    </div>
));

const renderRows = R.map(row => (
    <div key={rowKey(row)} className="row">
        {renderPolls(row)}
    </div>
));

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        props.fetchPolls();
    }

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
