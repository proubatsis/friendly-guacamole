// export const FLAME_ICON = "&#x1f525;";
export const FLAME_ICON = "\uD83D\uDD25";
export const LINK_ICON = "\uD83D\uDD17";

export const formatVoteCount = totalVotes => {
    if(totalVotes >= 1000000) return Math.round((totalVotes / 1000000) * 10) / 10 + "M";
    else if(totalVotes >= 1000) return (Math.round((totalVotes / 1000) * 10) / 10) + "k";
    else return totalVotes;
};
