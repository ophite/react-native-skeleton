export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const searchRequest = (searchQuery) => {
	return {
		type: SEARCH_REQUEST,
		payload: {searchQuery}
	};
};

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const searchSuccess = (data) => {
	return {
		type: SEARCH_SUCCESS,
		payload: data
	};
};

export const SEARCH_ERROR = 'SEARCH_ERROR';
export const searchError = (errors) => {
	return {
		type: SEARCH_ERROR,
		error: true,
		payload: errors
	};
};
