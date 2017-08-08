import React from "react";
import Poll from "components/poll";
import R from "ramda";
import { Row, ContainerFluid, Column } from "elements/bootstrap";
import withNavbar from "util/with-navbar";

const POLLS_PER_ROW = 3;

const rowKey = R.compose(R.reduce((a, b) => a + b.toString(), ""), R.map(poll => poll.id));

const renderPolls = R.map(poll => (
    <Column xs="12" lg="4">
        <Poll {...poll} />
    </Column>
));

const updateView = (p) => {
    if (p.match && p.match.params.tag) {
        p.fetchPollsByTag(p.match.params.tag);
    } else if (p.match && p.match.params.search) {
        p.searchPolls(p.match.params.search);
    } else {
        p.fetchPolls();
    }
};

const renderRows = R.map(row => (
    <Row key={rowKey(row)}>
        {renderPolls(row)}
    </Row>
));

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        updateView(props);
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            updateView(nextProps);
        }
    }

    render() {
        const rows = R.splitEvery(POLLS_PER_ROW, this.props.polls);

        return (
            <ContainerFluid>
                {renderRows(rows)}
            </ContainerFluid>
        );
    }
}

export default withNavbar(HomeView);
