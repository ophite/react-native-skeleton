export const FEED_REQUEST = 'FEED_REQUEST';
export const feedRequest = (user, header) => {
	return {
		type: FEED_REQUEST,
		payload: {user, header}
	};
};

export const FEED_SUCCESS = 'FEED_SUCCESS';
export const feedSuccess = (data) => {
	return {
		type: FEED_SUCCESS,
		payload: data
	};
};

export const FEED_ERROR = 'FEED_ERROR';
export const feedError = (errors) => {
	return {
		type: FEED_ERROR,
		error: true,
		payload: errors
	};
};
