import React from "react";

const toColString = (prefix, size) => {
    if (prefix !== undefined && size >= 1 && size <= 12) {
        return `${prefix}-${size}`;
    }

    return "";
};

const Column = (props) => {
    const columns = [
        toColString("col-xs", props.xs),
        toColString("col-sm", props.sm),
        toColString("col-md", props.md),
        toColString("col-lg", props.lg),
        toColString("col-xs-offset", props.xsOffset),
        toColString("col-sm-offset", props.smOffset),
        toColString("col-md-offset", props.mdOffset),
        toColString("col-lg-offset", props.lgOffset)
    ];

    const classes = columns.filter(c => c.length > 0).join(" ");

    return (
        <div className={classes}>
            {props.children}
        </div>
    )
};

export default Column;
