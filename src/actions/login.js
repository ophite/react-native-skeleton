import authService from '../helpers/AuthService';

// // Triggered whenever the user clicks the login submit button
// export const LOGIN_SUBMIT = 'core_auth/LOGIN_SUBMIT';
// export function loginSubmit(data) {
// 	return {
// 		type: LOGIN_SUBMIT,
// 		payload: data
// 	};
// }

// Triggered whenever a login request is dispatched from whenever point in the code
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = (data) => {
	return {
		type: LOGIN_REQUEST,
		payload: data
	};
};

// triggered when the login has succeded
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = ({username, password}) => {
	return {
		type: LOGIN_SUCCESS,
		payload: {username, password}
	};
};

// triggered when the login failed
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (errors) => {
	return {
		type: LOGIN_ERROR,
		error: true,
		payload: errors
	};
};

// triggered to logout the user
export const LOGOUT = 'LOGOUT';
export const logout = () => {
	return {
		type: LOGOUT
	};
};
