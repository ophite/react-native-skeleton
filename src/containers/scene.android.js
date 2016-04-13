/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';

import ProgressBar from '../components/progress';
import App from "../components/app";
import Login from "./login";
import NavigationBar from "./../components/navigation-bar";

import * as loginActions from '../actions/loginAction';
import {requestSelector} from 'redux-reqhelper';
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
								 initialRoute={{...componentInfo}}
								 passProps={{...this.props}}/>
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
					passProps: {
						nextScreenTitle: 'Feed',
						nextScreen: App
					}
				};
			default:
				return {
					component: Login,
					title: 'Login',
					passProps: {
						nextScreenTitle: 'Feed',
						nextScreen: App }
				};
		}
	}

	renderScene(route:Object, navigator:Object) {
		const onPrev = (navigator, route) => {
			navigator.pop();
			switch (route.component) {
				case App:
					this.passProps.loginActions.logout(Scene.localState.requestId);
					break;
				default:
					break;
			}
		};

		const hidePrev = (navigator, route) => {
			const routes = navigator.getCurrentRoutes();
			return routes.length === 1;
		};

		const Component = route.component;
		return (
			<View style={styles.container}>
				<NavigationBar
					onPrev={onPrev.bind(this)}
					hidePrev={hidePrev(navigator, route)}
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
	const selector = requestSelector('isLogin', state, props)(Scene.localState.requestId);
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

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
