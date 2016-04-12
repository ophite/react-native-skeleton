import {createSelector} from 'reselect';

const feedSelector = (state) => state.feed;
export const feedRequireSelector = createSelector(
	feedSelector,
	(feed) => ({
		requests: feed.requests
	})
);
