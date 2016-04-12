import {createSelector} from 'reselect';

const loginSelector = (state) => state.login;
export const loginRequireSelector = createSelector(
	loginSelector,
	(login) => ({
		...login
	})
);


const isLoginSelector = (state) => state.isLogin;
export const isLoginRequireSelector = createSelector(
	isLoginSelector,
	(isLogin) => ({
		...isLogin
	})
);


const requestSelector = (state) => state.request;
export const requestRequireSelector = createSelector(
	requestSelector,
	(request) => ({
		requests: request.requests
	})
);
