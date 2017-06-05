import request from "superagent";

export const getPolls = next => request.get("/api/polls").end(next);
export const getTrending = next => request.get("/api/polls/trending").end(next);
