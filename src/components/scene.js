/* @flow */
/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import App from "../components/app";
import Login from "../components/login";
import NavigationBar from "./navigation-bar";
import authService from '../helpers/AuthService';
import ProgressBar from 'ProgressBarAndroid';
import {fetchData} from "../actions";


let {
	Navigator,
	View,
	Component,
	StyleSheet
	} = React;


let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
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

	renderScene(route:Object, navigator:Object) {
		const Component = route.component;

		return (
			<View style={{flex: 1}}>
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

	render() {
		if (this.state.checkingAuth) {
			return (<ProgressBar style={styles.progress}/>);
		}

		var component = this.state.isLoggedIn ? App : Login;
		var title = this.state.isLoggedIn ? 'Feed2' : 'Login';
		return (
			<Navigator
				style={{flex: 1}}
				renderScene={this.renderScene}
				initialRoute={{
                    component: component,
                    title: title
                }}
			/>
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
