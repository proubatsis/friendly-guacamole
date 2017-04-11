import React from "react";

const ICON_SELECTED = "\u25CF";
const ICON_NOT_SELECTED = "\u25CB";

class PollOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const percent = (this.props.value / this.props.totalVotes) * 100;

        return (
            <div className="row poll-option">
                <div className="col-xs-1">
                    { this.props.selected ? ICON_SELECTED : ICON_NOT_SELECTED }
                </div>
                <div className="col-xs-11">
                    <div className="progress">
                        <div className="progress-bar"
                            role="progressbar"
                            aria-valuenow={this.props.value}
                            aria-valuemin="0"
                            aria-valuemax={this.props.totalVotes}
                            style={{width: `${percent}%`}}>
                                <p>{this.props.name}</p>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PollOption;
