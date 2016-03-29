'use strict';

import {connect} from "../../node_modules/react-redux";
let React = require('react-native');
let {
	Image,
	StyleSheet,
	Text,
	View,
} = React;
import TabNavigator from 'react-native-tab-navigator';

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedTab: 'home',
			showTabBar: true
		};
	}

	render() {
		let tabBarStyle = {};
		let sceneStyle = {};
		if (!this.state.showTabBar) {
			tabBarStyle.height = 0;
			tabBarStyle.overflow = 'hidden';
			sceneStyle.paddingBottom = 0;
		}
		
		var homeView = 'homeView';
		var profileView = 'profileView';
		let tabBarHeight = 0;

		return (
			<TabNavigator tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
						  sceneStyle={{ paddingBottom: tabBarHeight }}>

				<TabNavigator.Item
					selected={this.state.selectedTab === 'home'}
					title="Home"
					renderIcon={() => <Image style={styles.logo} source={require('image!ic_launcher')}/> }
					renderSelectedIcon={() => <Image style={styles.logo} source={require('image!ic_launcher')}/>}
					onPress={() => this.setState({ selectedTab: 'home' })}>
					<Text>test 1</Text>
				</TabNavigator.Item>

				<TabNavigator.Item
					selected={this.state.selectedTab === 'home2'}
					title="Home 2"
					renderIcon={() => <Image style={styles.logo} source={require('image!ic_feed')}/> }
					renderSelectedIcon={() => <Image style={styles.logo} source={require('image!ic_feed')}/>}
					onPress={() => this.setState({ selectedTab: 'home2' })}>
					<Text>test 2</Text>
				</TabNavigator.Item>

			</TabNavigator>
		);

	}

}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scene: {
		backgroundColor: '#1e2127',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	backdrop: {
		flex: 1,
		flexDirection: 'column',
	},

	logo: {
		width: 166,
		height: 155
	},
	button: {
		color: '#007aff',
		fontWeight: '600',
	},
});


App.propTypes = {
	dispatch: React.PropTypes.func,
	message: React.PropTypes.string,
	isFetching: React.PropTypes.bool
};

App.defaultProps = {
	dispatch: () => {
	},
	isFetching: false,
	message: ""
};

export default connect((state) => ({
	isFetching: state.data.isFetching,
	message: state.data.message
}))(App);
