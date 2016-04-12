import {createSelector} from 'reselect';


const loginSelector = (state) => state.login;
export const loginRequireSelector = createSelector(
	loginSelector,
	(login) => ({
		requests: login.requests
	})
);


const isLoginSelector = (state) => state.isLogin;
export const isLoginRequireSelector = createSelector(
	isLoginSelector,
	(isLogin) => ({
		requests: isLogin.requests
	})
);
