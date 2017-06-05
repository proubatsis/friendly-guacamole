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
        polls: [
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
        ]
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
