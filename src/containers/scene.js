/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import ProgressBar from 'ProgressBarAndroid';
import App from "../components/app";
import Login from "./login";
import NavigationBar from "./../components/navigation-bar";
import {fetchData} from "../actions";
import authService from '../helpers/AuthService';


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
			showProgress: false,
			isLoggedIn: false,
			checkingAuth: true
		};
	}

	componentDidMount() {
		this.props.dispatch(fetchData());
		authService.getAuthInfo((err, authInfo) => {
			this.setState({
				checkingAuth: false,
				isLoggedIn: authInfo != null
			});
		});
	}

	render() {
		if (this.state.checkingAuth) {
			return (<ProgressBar style={styles.progress}/>);
		}

		const component = this.state.isLoggedIn ? App : Login;
		const title = this.state.isLoggedIn ? 'Feed' : 'Login';
		const nextScreen = this.state.isLoggedIn ? null : App;

		return (
			<Navigator style={styles.container}
					   renderScene={this.renderScene}
					   initialRoute={{
							component: component,
							title: title,
							passProps: { nextScreen }
						}}/>
		);
	}

	// TODO flow config see
	//TODO maybe do everywhere like this
	renderScene(route:Object, navigator:Object) {
		const Component = route.component;

		return (
			<View style={styles.container}>
				<NavigationBar
					backgroundStyle={{backgroundColor: "#eee"}}
					navigator={navigator}
					route={route}
					title={route.title}
					titleColor="#333"
				/>
				<Component
					navigator={navigator}
					route={route}
					{...route.passProps}
				/>
			</View>
		);
	}
}

Scene.propTypes = {
	dispatch: React.PropTypes.func,
	message: React.PropTypes.string,
	isFetching: React.PropTypes.bool
};

Scene.defaultProps = {
	dispatch: () => {
	},
	isFetching: false,
	message: ""
};

export default connect((state) => ({
	isFetching: state.data.isFetching,
	message: state.data.message
}))(Scene);
