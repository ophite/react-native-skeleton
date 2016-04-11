import {AsyncStorage} from 'react-native';
import buffer from 'buffer';

const AUTH_KEY = 'auth';
const USER_KEY = 'user';

class AuthService {

	getAuthData(val) {
		if (!val) {
			return null;
		}

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

	getAuthInfo(callback) {
		AsyncStorage.multiGet([ AUTH_KEY, USER_KEY ], (err, val) => {
			if (err) {
				return callback(err);
			}

			if (!val) {
				return callback();
			}

			let zippedObj = {};
			val.forEach((item) => {
				zippedObj[ item[ 0 ] ] = item[ 1 ];
			});

			// let zippedObj = _.zipObject(val);
			if (!zippedObj[ AUTH_KEY ]) {
				return callback();
			}

			let authInfo = {
				header: {
					Authorization: 'Basic ' + zippedObj[ AUTH_KEY ]
				},
				user: JSON.parse(zippedObj[ USER_KEY ])
			};

			return callback(null, authInfo);
		});
	}

	getFeed({user, header}) {
		let url = 'https://api.github.com/users/' + user.login + '/received_events';

		return fetch(url, {
			headers: header
		})
			.then(response => response.json())
			.catch(err => {
				throw err;
			});
	}

	login(credentials) {
		let b = new buffer.Buffer(credentials.username + ":" + credentials.password);
		let encodedAuth = b.toString('base64');

		return fetch('https://api.github.com/user', {
			headers: {
				'Authorization': 'Basic ' + encodedAuth
			}
		})
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					return response;
				}

				throw {
					badCredentials: response.status === 401,
					unknownError: response.status !== 401
				};
			})
			.then(response => response.json())
			.then((results) => {

				return {
					authKey: encodedAuth,
					userKey: results
				};
			})
			.catch(err => {
				throw err;
			});
	}
}

export default new AuthService();
