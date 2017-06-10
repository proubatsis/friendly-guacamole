import React from "react";
import PollOption from "../../components/poll/option";
import { formatVoteCount, FLAME_ICON, LINK_ICON } from "../../util/poll";
import R from "ramda";

const PREV_ARROW_ICON = "\uD83E\uDC80";
const NEXT_ARROW_ICON = "\uD83E\uDC82";

class PollView extends React.Component {
    componentDidMount() {
        this.props.fetchPoll(this.props.match.params.id);
    }

    render() {
        const renderedOptions = R.map(opt => (
            <PollOption
                key={opt.id}
                selected={opt.selected}
                name={opt.name}
                totalVotes={this.props.totalVotes}
                count={opt.count}
            />
        ));

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-2">
                        <div className="side-card left"></div>
                    </div>
                    <div className="col-xs-8">
                        <div className="col-xs-12 poll-view">
                            <div className="row">
                                <div className="col-xs-1">
                                    <p className="flame">{FLAME_ICON} {formatVoteCount(this.props.totalVotes)}</p>
                                </div>
                                <div className="col-xs-11">
                                    <p onClick={this.props.copyUrlToClipboard} className="copy-link">{LINK_ICON}</p>
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
                                    {renderedOptions(this.props.options || [])}
                                </div>
                                <div className="row">
                                    <a className="poll-tags" href="#">#myamazingtag</a>
                                    <a className="poll-tags" href="#">#anothertag</a>
                                    <a className="poll-tags" href="#">#supertag</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-2">
                        <div className="side-card right"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-offset-5 col-xs-5">
                        <a href="#" className="btn btn-default btn-poll-nav">{PREV_ARROW_ICON}</a>
                        <a href="#" className="btn btn-default btn-poll-nav">{NEXT_ARROW_ICON}</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default PollView;
