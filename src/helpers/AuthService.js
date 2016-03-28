import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
import * as _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
	getAuthInfo(callback) {
		AsyncStorage.multiGet([authKey, userKey], (err, val) => {
			if (err) {
				return callback(err);
			}

			if (!val) {
				return callback();
			}

			let zippedObj = _.zipObject(val);
			if (!zippedObj[authKey]) {
				return callback();
			}

			let authInfo = {
				header: {
					Authorization: 'Basic ' + zippedObj[authKey]
				},
				user: JSON.parse(zippedObj[userKey])
			};

			return callback(null, authInfo);
		});
	}

	login(credentials, callback) {
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
				AsyncStorage.multiSet([
					[ authKey, encodedAuth ],
					[ userKey, JSON.stringify(results) ]
				], (err) => {
					if (err) {
						throw err;
					}

					return callback({
						success: true
					});
					// console.log('>>>>> ' + JSON.stringify(results));
				});

			})
			.catch(err => callback(err));
	}
}

module.exports = new AuthService();