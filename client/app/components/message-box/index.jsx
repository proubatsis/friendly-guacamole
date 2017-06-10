import React from "react";

class MessageBox extends React.Component {
    render() {
        return (
            <div className={`message-box ${this.props.type} ${this.props.content ? "" : "hidden"}`}>
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default MessageBox;
