import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

import Poll from "./poll/container";
import PollReducer from "./poll/reducer";

const reducer = combineReducers({
    poll: PollReducer
});

const store = createStore(reducer, {
    poll: {
            id: "1",
            title: "Coca Cola or Pepsi?",
            description: "Just wanna know what ppl prefer",
            totalVotes: 1000,
            options: [
                {
                    id: "1",
                    name: "Coca Cola",
                    count: 750,
                    selected: false
                },
                {
                    id: "2",
                    name: "Pepsi",
                    count: 250,
                    selected: false
                }
            ]
        }
});

ReactDOM.render(
    <Provider store={store}>
        <Poll />
    </Provider>,
    document.getElementById("app"));
