import React from "react";
import ReactDOM from "react-dom";
import Poll from "./poll";

ReactDOM.render(
    <Poll
        title="Who is the best?"
        description="I AM THE BEST!"
        totalVotes={1234}
    />,
    document.getElementById("app"));
