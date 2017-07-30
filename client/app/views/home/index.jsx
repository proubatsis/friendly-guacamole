import React from "react";
import Poll from "components/poll";
import R from "ramda";
import { Row, ContainerFluid, Column } from "elements/bootstrap";

const POLLS_PER_ROW = 3;

const rowKey = R.compose(R.reduce((a, b) => a + b.toString(), ""), R.map(poll => poll.id));

const renderPolls = R.map(poll => (
    <Column xs="12" lg="4">
        <Poll {...poll} />
    </Column>
));

const renderRows = R.map(row => (
    <Row key={rowKey(row)}>
        {renderPolls(row)}
    </Row>
));

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        props.fetchPolls();
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

export default HomeView;
