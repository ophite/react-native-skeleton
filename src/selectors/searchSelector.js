import {createSelector} from 'reselect';

const searchSelector = (state) => state.search;
export const searchRequireSelector = createSelector(
	searchSelector,
	(search) => ({
		requests: search.requests
	})
);
