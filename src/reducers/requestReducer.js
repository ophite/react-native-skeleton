export const DEFAULT_STATE = {
	requests: {},
	data: {}
};

export const requestStarted = (state, action) => {
	const { requestId } = action.payload;
	return {
		...state,
		requests: {
			[requestId]: {
				hasError: false,
				isLoaded: false,
				isLoading: true,
				errors: null
			}
		}
	}
};

export const requestSuccess = (state, action) => {
	const { requestId, data } = action.payload;
	return {
		...state,
		requests: {
			[requestId]: {
				data: data,
				hasError: false,
				isLoaded: true,
				isLoading: false,
				errors: null
			}
		}
	}
};

export const requestError = (state, action) => {
	const { requestId, error } = action.payload;
	return {
		...state,
		requests: {
			[requestId]: {
				hasError: true,
				isLoaded: false,
				isLoading: false,
				error: error
			}
		}
	}
};
