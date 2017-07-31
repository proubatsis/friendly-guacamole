import request from "superagent";

const callbackTransform = next => ((err, res) => {
    if(err) next(err, null);
    else next(null, res.body);
});

const get = uri => (next => request.get(uri).end(callbackTransform(next)));
const post = (uri, body) => (next => request.post(uri).send(body).end(next));

export const getPolls = get("/api/polls");
export const getTrending = get("/api/polls/trending");
export const getPoll = (id, next) => get(`/api/polls/${id}`)(next);

export const createUser = (email, password) => post("/api/users/create", { email, password });
export const login = (email, password) => post("/api/users/login", { email, password });
