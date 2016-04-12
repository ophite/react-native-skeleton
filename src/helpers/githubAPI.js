import buffer from 'buffer';

class AuthService {

	getFeedData({ user, header }) {
		let url = 'https://api.github.com/users/' + user.login + '/received_events';

		return fetch(url, {
			headers: header
		})
			.then(response => response.json())
			.catch(err => {
				throw err;
			});
	}

	getSearchData(searchQuery) {
		let url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(searchQuery);

		return fetch(url)
			.then((response) => response.json())
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
