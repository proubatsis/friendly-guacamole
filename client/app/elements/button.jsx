import React from "react";

const Button = btnType => props => (
    <button
        className={`btn btn-${btnType} ${props.fill ? "btn-block" : ""}`}
        onClick={props.onClick}
    >
        {props.value}
    </button>
);

const DefaultButton = Button("default");
const PrimaryButton = Button("primary");

export {
    DefaultButton,
    PrimaryButton
};
