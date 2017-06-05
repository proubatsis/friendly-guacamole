import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

import Navbar from "./components/navbar/container";
import NavbarReducer from "./components/navbar/reducer";

import HomeView from "./views/home/container";
import HomeViewReducer from "./views/home/reducer";

const reducer = combineReducers({
    navbar: NavbarReducer,
    home: HomeViewReducer
});

const store = createStore(reducer, {
    navbar: {
        trending: []
    },
    home: {
        polls: []
    }
});

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Navbar />
            <HomeView />
        </div>
    </Provider>,
    document.getElementById("app"));
