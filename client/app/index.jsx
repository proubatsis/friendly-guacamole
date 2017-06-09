import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { Router, Route, useRouterHistory, Switch } from "react-router";
import { createBrowserHistory } from "history";

import Navbar from "./components/navbar/container";
import NavbarReducer from "./components/navbar/reducer";

import MessageBox from "./components/message-box/container";

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
    messageBox: {
        type: "sucess",
        content: "Hello, world!"
    },
    navbar: {
        trending: []
    },
    home: {
        polls: []
    },
    poll: {}
});

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Navbar />
            <MessageBox />
            <Router history={createBrowserHistory({})}>
                <Switch>
                    <Route path="/polls/:id" component={PollView} />
                    <Route path="/" component={HomeView} />
                </Switch>
            </Router>
        </div>
    </Provider>,
    document.getElementById("app"));
