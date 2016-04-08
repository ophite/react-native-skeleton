import {createSelector} from 'reselect';

const loginSelector = (state) => state.auth;

export default loginRequireSelector = createSelector(
	loginSelector,
	(login) => ({
		...login
	})
);
