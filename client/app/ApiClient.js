import request from "superagent";

const callbackTransform = next => ((err, res) => {
    if(err) next(err, null);
    else next(null, res.body);
});

const getToken = () => global.accessToken ? `Bearer ${global.accessToken}` : null;

const get = uri => (next =>
    request
    .get(uri)
    .set({ Authorization: getToken() })
    .end(callbackTransform(next)));

const post = (uri, body) => (next =>
    request
    .post(uri)
    .set({ Authorization: getToken() })
    .send(body)
    .end(next));

export const getPolls = get("/api/polls");
export const getTrending = get("/api/polls/trending");
export const findPollsByTag = (tag, next) => get(`/api/polls/t/${tag}`)(next);
export const searchPolls = (q, next) => get(`/api/polls/search/${q}`)(next);
export const getPoll = (id, next) => get(`/api/polls/${id}`)(next);
export const vote = (pollId, pollOptionId, next) => post(`/api/polls/${pollId}/${pollOptionId}/vote`, {})(next);
export const createPoll = (title, description, options, tags, next) => post("/api/polls", { title, description, options, tags })(next);

export const createUser = (email, password, next) => post("/api/users/create", { email, password })(next);
export const login = (email, password, next) => post("/api/users/login", { email, password })(next);
