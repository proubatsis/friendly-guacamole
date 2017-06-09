import React from "react";

class MessageBox extends React.Component {
    render() {
        return (
            <div className="message-box">
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default MessageBox;
