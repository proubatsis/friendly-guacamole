import React from "react";
import { Link } from "react-router-dom";
import PollOption from "./option";
import { formatVoteCount, FLAME_ICON } from "../../util/poll";

class Poll extends React.Component {
    render() {
        return (
            <Link to={`/polls/${this.props.id}`}>
                <div className="col-xs-12 poll">
                    <div className="header row">
                        <p>{FLAME_ICON} {formatVoteCount(this.props.totalVotes)}</p>
                    </div>
                    <div className="header row">
                        <div className="col-xs-12">
                            <h2>{this.props.title}</h2>
                            <h3>{this.props.description}</h3>
                        </div>
                    </div>
                    <div className="row">
                        {this.props.options.map(opt => {
                            return (
                                <PollOption
                                    {...opt}
                                    key={opt.id}
                                    totalVotes={this.props.totalVotes}
                                    onClick={() => null}
                                />
                            );
                        })}
                    </div>
                    <div className="row">
                        <p className="poll-tags">
                            {this.props.tags.map(t => (
                                <a href="#">#{t}</a>
                            ))}
                        </p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Poll;
