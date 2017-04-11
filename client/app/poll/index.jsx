import React from "react";
import PollOption from "./option";

const formatVoteCount = totalVotes => {
    if(totalVotes > 1000000) return Math.round((totalVotes / 1000000) * 10) / 10 + "M";
    else if(totalVotes > 1000) return (Math.round((totalVotes / 1000) * 10) / 10) + "k";
    else return totalVotes;
};

class Poll extends React.Component {
    render() {
        return (
            <div className="col-xs-12 poll">
                <div className="header row">
                    <p>&#x1f525; {formatVoteCount(this.props.totalVotes)}</p>
                </div>
                <div className="header row">
                    <div className="col-xs-12">
                        <h2>{this.props.title}</h2>
                        <h3>{this.props.description}</h3>
                    </div>
                </div>
                <div className="row">
                    <PollOption selected={false} name="Panagiotis" value="20" totalVotes="40"/>
                    <PollOption selected={true} name="Roubatsis" value="30" totalVotes="40"/>
                    <PollOption selected={false} name="Hello" value="10" totalVotes="40"/>
                </div>
                <div className="row">
                    <p className="poll-tags">
                        <a href="#">#hello</a>
                        <a href="#">#world</a>
                        <a href="#">#lol</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default Poll;
