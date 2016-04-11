import {AsyncStorage} from 'react-native';

const AUTH_KEY = 'auth';
const USER_KEY = 'user';

export const convertAuthData = (val) => {
	if (!val) {
		return null;
	}

	try {
		let zippedObj = {};
		val.forEach((item) => {
			zippedObj[ item[ 0 ] ] = item[ 1 ];
		});

		// let zippedObj = _.zipObject(val);
		if (!zippedObj[ AUTH_KEY ]) {
			return null;
		}

		let authInfo = {
			header: {
				Authorization: 'Basic ' + zippedObj[ AUTH_KEY ]
			},
			user: JSON.parse(zippedObj[ USER_KEY ])
		};

		return authInfo;
	}
	catch (err) {
		return null;
	}
};

export const authSave = ({ authKey, userKey }) => {
	AsyncStorage.multiSet([
		[ AUTH_KEY, authKey ],
		[ USER_KEY, JSON.stringify(userKey) ]
	]);
};

export const authClear = () => {
	AsyncStorage.multiRemove([ AUTH_KEY, USER_KEY ]);
};

export const authGet = () => {
	return AsyncStorage.multiGet([ AUTH_KEY, USER_KEY ]);
};
