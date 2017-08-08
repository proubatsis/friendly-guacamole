export const ACTION_NAVBAR_UPDATE_TRENDING  = "navbar update trending";
export const ACTION_NAVBAR_UPDATE_SEARCH = "navbar update search";

export const updateTrending = (trending) => ({
    trending,
    type: ACTION_NAVBAR_UPDATE_TRENDING
});

export const updateSearch = (search) => ({
    search,
    type: ACTION_NAVBAR_UPDATE_SEARCH
});
