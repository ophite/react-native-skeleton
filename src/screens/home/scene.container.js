/*eslint-disable prefer-const */

import React from "react";
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Scene from './scene';
import * as loginActions from '../../actions/loginAction';
import {requestSelector} from 'redux-reqhelper';
import newId from '../../helpers/newid';

let {
	Component,
} = React;


class SceneContainer extends Component {

	static localState = {
		requestId: null
	};

	componentDidMount() {
		SceneContainer.localState.requestId = newId();
		this.props.loginActions.loginIsLoggedRequest(SceneContainer.localState.requestId);
	}

	render() {
		let allProps = { requestId: SceneContainer.localState.requestId, ...this.props }
		return (
			<Scene
				onLogout={this.onLogout.bind(this)}
				{...allProps}
			/>
		);
	}

	onLogout() {
		this.props.loginActions.logout(SceneContainer.localState.requestId);
	}
}


const mapStateToProps = (state, props) => {
	const selector = requestSelector('isLogin', state, props)(SceneContainer.localState.requestId);
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

export default connect(mapStateToProps, mapDispatchToProps)(SceneContainer);
