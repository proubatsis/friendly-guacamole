import React from "react";

const PREV_ARROW_ICON = "\uD83E\uDC80";
const NEXT_ARROW_ICON = "\uD83E\uDC82";

const aTag = props => (<a {...props}>{props.children}</a>);

const leftNavButton = tag => props => (
    <a href={props.url} className="btn btn-default btn-poll-nav">{PREV_ARROW_ICON}</a>
);

const rightNavButton = tag => props => (
    <a href={props.url} className="btn btn-default btn-poll-nav">{NEXT_ARROW_ICON}</a>
);

const LeftNavButton = leftNavButton(aTag);
const RightNavButton = rightNavButton(aTag);

export {
    LeftNavButton,
    RightNavButton
};
