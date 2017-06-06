import React from "react";

class PollView extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div class="row">
                    <div className="col-xs-2"></div>
                    <div className="col-xs-8">
                        <div className="col-xs-12 poll-view">
                            <div className="row">
                                <p>{this.props.title}</p>
                            </div>
                            <div className="row">
                                <p>{this.props.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-2"></div>
                </div>
            </div>
        )
    }
}

export default PollView;
