import {handleActions} from 'redux-actions'


const DEFAULT_STATE = {
	requests: {},
	data: {}
};


const DEFAULT_REQUEST_STATE = {
	hasError: false,
	isLoading: false,
	isLoaded: false,
	errors: {}
};


export const request = handleActions({

	REQUEST_STARTED: (state, action) => {
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
	},

	REQUEST_SUCCESS: (state, action) => {
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
	},

	REQUEST_ERROR: (state, action) => {
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
	}

}, DEFAULT_STATE);
