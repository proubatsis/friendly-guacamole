import React from "react";
import { Link } from "react-router-dom";

const PREV_ARROW_ICON = "\uD83E\uDC80";
const NEXT_ARROW_ICON = "\uD83E\uDC82";

const LeftNavButton = props => (
    <Link to={props.url} className="btn btn-default btn-poll-nav">{PREV_ARROW_ICON}</Link>
);

const RightNavButton = props => (
    <Link to={props.url} className="btn btn-default btn-poll-nav">{NEXT_ARROW_ICON}</Link>
);

export {
    LeftNavButton,
    RightNavButton
};
