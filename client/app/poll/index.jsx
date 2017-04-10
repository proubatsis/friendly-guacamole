import React from "react";
import PollOption from "./option";

class Poll extends React.Component {
    render() {
        return (
            <div className="col-xs-12 poll">
                <div className="header row">
                    <h2>Poll Title</h2>
                    <h3>Poll description</h3>
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
