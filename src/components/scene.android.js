/*eslint-disable prefer-const */

import React from "react-native";

import NavigationBar from "./navigation-bar";
import ProgressBar from './progress';
import Home from "./home";
import LoginContainer from "../containers/login.container";


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

	render() {
		if (this.props.isLoading) {
			return (<ProgressBar/>);
		}

		const componentInfo = this.getFirstComponentInfo();
		return (
			<Navigator style={styles.container}
					   renderScene={this.renderScene.bind(this)}
					   initialRoute={{...componentInfo}}/>
		);
	}

	getFirstComponentInfo() {
		switch (this.props.isLoggedIn) {
			case true:
				return {
					component: Home,
					title: 'Feed',
					passProps: { user: this.props.data.user, header: this.props.data.header }
				};
			case false:
				return {
					component: LoginContainer,
					title: 'Login',
					passProps: {
						nextScreenTitle: 'Feed',
						nextScreen: Home
					}
				};
			default:
				return {
					component: LoginContainer,
					title: 'Login',
					passProps: {
						nextScreenTitle: 'Feed',
						nextScreen: Home
					}
				};
		}
	}

	renderScene(route:Object, navigator:Object) {
		const onPrev = (navigator, route) => {
			navigator.pop();
			switch (route.component) {
				case Home:
					this.props.onLogout();
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

export default Scene;
