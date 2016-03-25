import buffer from "buffer";

class AuthService {
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
				return callback({
					success: true
				});
				console.log('>>>>> ' + JSON.stringify(results));
			})
			.catch(err => callback(err));
	}
}

module.exports = new AuthService();