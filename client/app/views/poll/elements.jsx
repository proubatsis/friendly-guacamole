import React from "react";
import { Row, Column } from "elements/bootstrap";
import { formatVoteCount, FLAME_ICON, LINK_ICON } from "util/poll";
import { Link } from "react-router-dom";

// Top Level

const PollViewArea = props => (
    <div className="col-xs-12 poll-view">
        {props.children}
    </div>
);

const SideCard = props => (
    <div className={`side-card ${props.pos}`}></div>
);

// Header

const PollViewHeader = Row;

const FlameVotes = props => (
    <div className="col-xs-1">
        <p className="flame">{FLAME_ICON} {formatVoteCount(props.totalVotes)}</p>
    </div>
);

const CopyLink = props => (
    <div className="col-xs-11">
        <p onClick={props.onClick} className="copy-link">{LINK_ICON}</p>
    </div>
);

// Body

const PollViewBody = props => (
    <Column xs="8" xsOffset="2">
        {props.children}
    </Column>
);

const Title = props => (
    <Row>
        <p className="title">{props.children}</p>
    </Row>
);

const Description = props => (
    <Row>
        <p className="description">{props.children}</p>
    </Row>
);

const PollTag = props => (
    <Link to={`/t/${props.children}`} className="poll-tags" href="#">#{props.children}</Link>
);

const PollTags = props => (
    <Row>
        {props.tags.map(t => (
            <PollTag key={t}>{t}</PollTag>
        ))}
    </Row>
);

export {
    PollViewArea,
    SideCard,
    PollViewHeader,
    FlameVotes,
    CopyLink,
    PollViewBody,
    Title,
    Description,
    PollTag,
    PollTags
};
