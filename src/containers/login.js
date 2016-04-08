/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import ProgressBar from 'ProgressBarAndroid';
// import authService from '../helpers/AuthService';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/login';

let {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableHighlight,
	Component
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


class Login extends Component {

	static localState = {
		checkingAuth: false
	};

	constructor(props) {
		super(props);
		this.state = {
			showProgress: false
		};
	}

	componentDidMount() {
		// authService.getAuthInfo((err, authInfo) => {
		// 	this.setState({
		// 		checkingAuth: false,
		// 		isLoggedIn: authInfo != null
		// 	});
		// });
	}

	render() {
		// debugger;
		if (Login.localState.checkingAuth) {
			return (<ProgressBar style={styles.progress}/>);
		}

		var errorView = <View/>;
		if (!this.props.success && this.props.badCredentials) {
			errorView = (
				<Text style={styles.error}>
					That username and password combination did not work
				</Text>
			);
		}

		if (!this.props.success && this.props.unknownError) {
			errorView = (
				<Text style={styles.error}>
					We experienced an unexpected issue
				</Text>
			);
		}

		return (
			<View style={styles.container}>
				<Image style={styles.logo}
							 source={require('image!ic_launcher')}/>
				<Text style={styles.header}> Login component </Text>
				<TextInput style={styles.input}
									 placeholder="User name"
									 onChangeText={this.onUsernameChange.bind(this)}>
				</TextInput>
				<TextInput style={styles.input}
									 placeholder="Password"
									 onChangeText={this.onPasswordChange.bind(this)}
									 secureTextEntry={true}>
				</TextInput>
				<TouchableHighlight style={styles.button}
														onPress={this.onLoginPressed.bind(this)}>
					<Text style={styles.buttonText}> Log in </Text>
				</TouchableHighlight>

				{errorView}
				{this.props.showProgress ? (<ProgressBar style={styles.progress}/>) : (<View></View>)}
			</View>
		);
	}

	onPasswordChange(text) {
		Login.localState.password = text;
	}

	onUsernameChange(text) {
		Login.localState.username = text;
	}

	onLoginPressed() {
		// this.setState({ showProgress: true });
		// Login.localState.checkingAuth = true;
		this.props.loginActions.loginRequest(Login.localState);

		// TODO maybe because of this its not component but container
		// authService.login({
		// 	username: this.state.username,
		// 	password: this.state.password
		// }, (results) => {
		// 	if (results.success) {
		// 		this.setState(Object.assign({
		// 			showProgress: false,
		// 			isLoggedIn: true
		// 		}));
		//
		// 		this.props.navigator.push({
		// 			title: 'Image component list',
		// 			passProps: {
		// 				p1: 'custom prop'
		// 			},
		// 			component: this.props.nextScreen
		// 		});
		// 	} else {
		// 		this.setState(Object.assign({
		// 			showProgress: false,
		// 			isLoggedIn: false
		// 		}, results));
		// 	}
		// });

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

const mapStateToProps = (state) => {
	return {
		...state.auth
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginActions: bindActionCreators(actions, dispatch)
	}
};

Login.propTypes = {
	nextScreen: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
