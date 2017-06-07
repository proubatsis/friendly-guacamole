import React from "react";
import PollOption from "../../components/poll/option";
import { formatVoteCount, FLAME_ICON, LINK_ICON } from "../../util/poll";

class PollView extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div class="row">
                    <div className="col-xs-2"></div>
                    <div className="col-xs-9">
                        <div className="col-xs-12 poll-view">
                            <div className="row">
                                <div className="col-xs-1">
                                    <p className="flame">{FLAME_ICON} {formatVoteCount(this.props.totalVotes)}</p>
                                </div>
                                <div className="col-xs-11">
                                    <p className="copy-link">{LINK_ICON}</p>
                                </div>
                            </div>
                            <div className="col-xs-8 col-xs-offset-2">
                                <div className="row">
                                    <p className="title">{this.props.title}</p>
                                </div>
                                <div className="row">
                                    <p className="description">{this.props.description}</p>
                                </div>
                                <div className="row">
                                    <PollOption count={7} totalVotes={10} name="Coke" />
                                    <PollOption count={3} totalVotes={10} name="Pepsi" />
                                </div>
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
