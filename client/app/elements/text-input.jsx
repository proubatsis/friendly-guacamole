import React from "react";

const TextInput = props => (
    <input
        className="form-control"
        value={props.value}
        onChange={e => props.onChange(e.target.value)} type="text"
    />
);

export default TextInput;
