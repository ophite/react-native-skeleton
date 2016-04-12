/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';

import ProgressBar from '../components/progress';
import App from "../components/app";
import Login from "./login";
import NavigationBar from "./../components/navigation-bar";

import * as loginActions from '../actions/loginAction';
import {isLoginRequireSelector} from '../selectors/loginSelector';
import newId from '../helpers/newid';

let {
	Navigator,
	View,
	Component,
	StyleSheet
} = React;


let styles = StyleSheet.create({
	container: {
		flex: 1
	}
});


class Scene extends Component {

	static localState = {
		requestId: null
	};

	componentDidMount() {
		Scene.localState.requestId = newId();
		this.props.loginActions.loginIsLoggedRequest(Scene.localState.requestId);
	}

	render() {
		if (this.props.isLoading) {
			return (<ProgressBar/>);
		}

		const componentInfo = this.getFirstComponentInfo();
		return (
			<Navigator style={styles.container}
								 renderScene={this.renderScene}
								 initialRoute={{...componentInfo}}/>
		);
	}

	getFirstComponentInfo() {
		switch (this.props.isLoggedIn) {
			case true:
				return {
					component: App,
					title: 'Feed',
					passProps: { user: this.props.data.user, header: this.props.data.header }
				};
			case false:
				return {
					component: Login,
					title: 'Login',
					passProps: { nextScreen: App }
				};
			default:
				return {
					component: Login,
					title: 'Login',
					passProps: { nextScreen: App }
				};
		}
	}

	renderScene(route:Object, navigator:Object) {
		const Component = route.component;

		return (
			<View style={styles.container}>
				<NavigationBar
					backgroundStyle={{backgroundColor: "#eee"}}
					navigator={navigator}
					route={route}
					title={route.title}
					titleColor="#333"/>
				<Component
					navigator={navigator}
					route={route}
					{...route.passProps}/>
			</View>
		);
	}
}


const mapStateToProps = (state, props) => {
	const selector = isLoginRequireSelector(state, props);
	const requestId = Scene.localState.requestId;
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

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
