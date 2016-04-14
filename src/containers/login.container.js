/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';
import {requestSelector} from 'redux-reqhelper';

import Login from '../components/login';
import * as loginActions from '../actions/loginAction';
import newId from '../helpers/newid';

let {
	Component
} = React;


class LoginContainer extends Component {

	static localState = {
		requestId: null
	};

	componentWillReceiveProps(nextProps) {
		if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
			nextProps.navigator.push({
				component: nextProps.nextScreen,
				title: nextProps.nextScreenTitle,
				passProps: {
					user: nextProps.data.user,
					header: nextProps.data.header
				}
			});
			return;
		}
	}

	render() {
		return (
			<Login
				onPasswordChange={this.onPasswordChange}
				onUsernameChange={this.onUsernameChange}
				onLoginPressed={this.onLoginPressed.bind(this)}
				{...this.props}
			/>
		);
	}

	onPasswordChange(text) {
		LoginContainer.localState.password = text;
	}

	onUsernameChange(text) {
		LoginContainer.localState.username = text;
	}

	onLoginPressed() {
		LoginContainer.localState.requestId = newId();
		this.props.loginActions.loginRequest(
			LoginContainer.localState.requestId,
			{
				username: LoginContainer.localState.username,
				password: LoginContainer.localState.password
			});
	}
}

Login.propTypes = {
	nextScreen: React.PropTypes.func,
	nextScreenTitle: React.PropTypes.string
};


const mapStateToProps = (state, props) => {
	const selector = requestSelector('login', state, props)(LoginContainer.localState.requestId);
	return {
		...selector,
		isLoggedIn: selector.data && !selector.hasError && !selector.isLoading && selector.isLoaded
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginActions: bindActionCreators(loginActions, dispatch)
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
