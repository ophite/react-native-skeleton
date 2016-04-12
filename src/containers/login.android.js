/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';
import ProgressBar from '../components/progress';
import * as loginActions from '../actions/loginAction';
import {loginRequireSelector} from '../selectors/loginSelector';
import newId from '../helpers/newid';

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
	error: {
		color: 'red',
		paddingTop: 10
	}
});


class Login extends Component {

	static localState = {
		requestId: null
	};

	constructor(props) {
		super(props);
		this.state = {
			showProgress: false,
			isLoggedIn: false
		};
	}

	componentWillReceiveProps(nextProps) {
		debugger;
		// login
		if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
			nextProps.navigator.push({
				component: nextProps.nextScreen,
				passProps: {
					user: nextProps.data.user,
					header: nextProps.data.header
				}
			});
			return;
		}

		// When on next screen click left button then before you login again you need to logout for login flow in saga
		if (this.props.isLoggedIn && !nextProps.isLoggedIn) {
			nextProps.loginActions.logout();
			return;
		}
	}

	render() {
		var errorView = <View/>;
		if (this.props.error && this.props.error.badCredentials) {
			errorView = (
				<Text style={styles.error}>
					That username and password combination did not work
				</Text>
			);
		}

		if (this.props.error && this.props.error.unknownError) {
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
				{this.props.isLoading ? (<ProgressBar/>) : (<View></View>)}
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
		Login.localState.requestId = newId();
		this.props.loginActions.loginRequest(
			Login.localState.requestId,
			{
				username: Login.localState.username,
				password: Login.localState.password
			});
	}
}

Login.propTypes = {
	nextScreen: React.PropTypes.func
};


const mapStateToProps = (state, props) => {
	const selector = loginRequireSelector(state, props);
	const requestId = Login.localState.requestId;
	let requestInfo = selector.requests[ requestId ];
	if (requestInfo) {
		return {
			...requestInfo,
			isLoggedIn: requestInfo.data && !requestInfo.hasError && !requestInfo.isLoading && requestInfo.isLoaded
		}
	}

	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginActions: bindActionCreators(loginActions, dispatch)
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
