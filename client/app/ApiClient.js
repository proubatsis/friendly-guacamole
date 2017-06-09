import request from "superagent";

const callbackTransform = next => ((err, res) => {
    if(err) next(err, null);
    else next(null, res.body);
});

const get = uri => (next => request.get(uri).end(callbackTransform(next)));

export const getPolls = get("/api/polls");
export const getTrending = get("/api/polls/trending");
export const getPoll = (id, next) => get(`/api/polls/${id}`)(next);
