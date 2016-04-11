export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = (data) => {
	return {
		type: LOGIN_REQUEST,
		payload: data
	};
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = ({username, password}) => {
	return {
		type: LOGIN_SUCCESS,
		payload: {username, password}
	};
};

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (errors) => {
	return {
		type: LOGIN_ERROR,
		error: true,
		payload: errors
	};
};

export const LOGOUT = 'LOGOUT';
export const logout = () => {
	return {
		type: LOGOUT
	};
};



export const LOGIN_IS_LOGGED_REQUEST = 'LOGIN_IS_LOGGED_REQUEST';
export const loginIsLoggedRequest = (data) => {
	return {
		type: LOGIN_IS_LOGGED_REQUEST
	};
};

export const LOGIN_IS_LOGGED_SUCCESS = 'LOGIN_IS_LOGGED_SUCCESS';
export const loginIsLoggedSuccess = (data) => {
	return {
		type: LOGIN_IS_LOGGED_SUCCESS,
		payload: data
	};
};

export const LOGIN_IS_LOGGED_ERROR = 'LOGIN_IS_LOGGED_ERROR';
export const loginIsLoggedError = (errors) => {
	return {
		type: LOGIN_IS_LOGGED_ERROR,
		error: true,
		payload: errors
	};
};
