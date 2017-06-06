import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { Router, Route, useRouterHistory, Switch } from "react-router";
import { createBrowserHistory } from "history";

import Navbar from "./components/navbar/container";
import NavbarReducer from "./components/navbar/reducer";

import HomeView from "./views/home/container";
import HomeViewReducer from "./views/home/reducer";

import PollView from "./views/poll/container";
import PollViewReducer from "./views/poll/reducer";

const reducer = combineReducers({
    navbar: NavbarReducer,
    home: HomeViewReducer,
    poll: PollViewReducer
});

const store = createStore(reducer, {
    navbar: {
        trending: []
    },
    home: {
        polls: []
    },
    poll: {
        "id": 1,
        "title": "Coke vs Pepsi",
        "description": "Just wanna know what ppl prefer",
        "totalVotes": 10000,
        "options": [
          {
            "id": 1,
            "pollId": 1,
            "name": "Coke",
            "count": 7500,
            "selected": null
          },
          {
            "id": 2,
            "pollId": 1,
            "name": "Pepsi",
            "count": 2500,
            "selected": null
          }
        ]
  }
});

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Navbar />
            <Router history={createBrowserHistory({})}>
                <Switch>
                    <Route path="/poll" component={PollView} />
                    <Route path="/" component={HomeView} />
                </Switch>
            </Router>
        </div>
    </Provider>,
    document.getElementById("app"));
