/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import ProgressBar from 'ProgressBarAndroid';
import App from "../components/app";
import Login from "./login";
import NavigationBar from "./../components/navigation-bar";
import * as actions from '../actions/loginAction';
import {bindActionCreators} from 'redux';
import {isLoginRequireSelector} from '../selectors/loginSelector';

let {
	Navigator,
	View,
	Component,
	StyleSheet
} = React;


let styles = StyleSheet.create({
	container: {
		flex: 1
	},
	progress: {
		marginTop: 20
	}
});


class Scene extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showProgressAuthChecking: false,
			isLoggedIn: false
		};
	}

	componentDidMount() {
		this.props.loginActions.loginIsLoggedRequest();
	}

	render() {
		// debugger;
		if (this.props.showProgressAuthChecking) {
			return (<ProgressBar style={styles.progress}/>);
		}

		const componentInfo = this.getFirstComponentInfo();

		return (
			<Navigator style={styles.container}
								 renderScene={this.renderScene}
								 initialRoute={{...componentInfo}}/>
		);
	}

	getFirstComponentInfo() {
		// debugger;
		const component = this.props.isLoggedIn ? App : Login;
		const title = this.props.isLoggedIn ? 'Feed' : 'Login';
		const nextScreen = this.props.isLoggedIn ? null : App;

		return {
			component,
			title,
			passProps: { nextScreen }
		};
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

const mapDispatchToProps = (dispatch) => {
	return {
		loginActions: bindActionCreators(actions, dispatch)
	}
};

export default connect(isLoginRequireSelector, mapDispatchToProps)(Scene);
