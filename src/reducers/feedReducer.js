import * as typesFeed from '../actions/feedAction';

export const feed = (state = {}, action) => {
	if (!action) return state;

	switch (action.type) {
		case typesFeed.FEED_REQUEST:
			return {
				showProgress: true
			};
		case typesFeed.FEED_SUCCESS:
			let feedItems = action.data.filter((ev)=> ev.type === 'PushEvent');
			return {
				feedItems,
				showProgress: false
			};
		case typesFeed.FEED_ERROR:
			return {
				error: action.error,
				showProgress: false
			};
		default:
			return state;
	}
};

