import * as typesSearch from '../actions/searchAction';

export const search = (state = {}, action) => {
	if (!action) return state;

	switch (action.type) {
		case typesSearch.SEARCH_REQUEST:
			return {
				showProgress: true
			};
		case typesSearch.SEARCH_SUCCESS:
			return {
				repositories: action.data.repositories,
				items: action.data.items,
				showProgress: false
			};
		case typesSearch.SEARCH_ERROR:
			return {
				error: action.error,
				showProgress: false
			};
		default:
			return state;
	}
};

