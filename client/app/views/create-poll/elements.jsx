import React from "react";
import { Row } from "elements/bootstrap";

const CreatePollViewArea = props => (
    <div className="col-xs-offset-2 col-xs-8 poll-view create-poll-view">
        {props.children}
    </div>
);

const Title = props => (
    <Row>
        <input type="text" className="title" value={props.value} onChange={e => props.onChange(e.target.value)} />
    </Row>
);

const Description = props => (
    <Row>
        <input type="text" className="description" value={props.value} onChange={e => props.onChange(e.target.value)} />
    </Row>
);

export {
    CreatePollViewArea,
    Title,
    Description
};
