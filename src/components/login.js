/* @flow */
/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import {fetchData} from "../actions";
import ProgressBar from 'ProgressBarAndroid';
import App from "./app";
import authService from '../helpers/AuthService';

//import App from 'app';

let {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Image,
	TextInput,
	TouchableHighlight,
} = React;

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
	},
	logo: {
		width: 166,
		height: 155
	},
	header: {
		fontSize: 30,
		marginTop: 10
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 2,
		borderColor: '#48bbec'
	},
	button: {
		height: 50,
		backgroundColor: '#48bbec',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center'
	},
	progress: {
		marginTop: 20
	},
	error: {
		color: 'red',
		paddingTop: 10
	}
});


class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showProgress: false,
			isLoggedIn: false
		};
	}

	componentDidMount() {
		this.props.dispatch(fetchData());
	}

	render() {

		if (this.state.isLoggedIn) {
			return (
				<App/>
			);
		}

		var errorView = <View/>;
		if (!this.state.success && this.state.badCredentials) {
			errorView = <Text style={styles.error}>
				That username and password combination did not work
			</Text>;
		}

		if (!this.state.success && this.state.unknownError) {
			errorView = <Text style={styles.error}>
				We experienced an unexpected issue
			</Text>;
		}

		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('../static/image/holiday-octocat.png')}/>
				<Text style={styles.header}> Login component </Text>
				<TextInput style={styles.input} placeholder="User name"
						   onChangeText={this.onUserNameChanged.bind(this)}>
				</TextInput>
				<TextInput style={styles.input} placeholder="Password"
						   onChangeText={this.onUserPassChanged.bind(this)} secureTextEntry={true}>
				</TextInput>
				<TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
					<Text style={styles.buttonText}> Log in </Text>
				</TouchableHighlight>

				{errorView}

				{this.state.showProgress ? (<ProgressBar style={styles.progress}/>) : (<View></View>)}
			</View>
		);
	}

	onUserPassChanged(text) {
		this.setState({ password: text });
	}

	onUserNameChanged(text) {
		this.setState({ username: text });
	}

	onLoginPressed() {
		this.setState({ showProgress: true });
		// this.setState({ showProgress: !this.state.showProgress });
		authService.login({
			username: this.state.username,
			password: this.state.password
		}, (results) => {
			this.setState(Object.assign({showProgress: false}, results));
			if (results.success) {
				this.props.navigator.push({
					title: 'Image component list',
					passProps: {
						p1: 'custom prop'
					},
					component: App
				});
			}
		});

		// mock
		// setTimeout(() => {
		// 	console.log('login pressed', this.state.username);
		// 	console.log('progress', this.state.showProgress);
		//
		// 	this.props.navigator.push({
		// 		title: 'Image component list',
		// 		passProps: {
		// 			p1: 'custom prop'
		// 		},
		// 		component: App
		// 	});
		// 	//this.setState({
		// 	//    showProgress: !this.state.showProgress,
		// 	//    isLoggedIn: true
		// 	//});
		// }, 1000);
	}
}

Login.propTypes = {
	dispatch: React.PropTypes.func,
	message: React.PropTypes.string,
	isFetching: React.PropTypes.bool
};

Login.defaultProps = {
	dispatch: () => {
	},
	isFetching: false,
	message: ""
};

export default connect((state) => ({
	isFetching: state.data.isFetching,
	message: state.data.message
}))(Login);
