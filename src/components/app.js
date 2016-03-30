'use strict';

import {connect} from "../../node_modules/react-redux";
import TabNavigator from 'react-native-tab-navigator';
import React from 'react-native';
import Feed from './feed';
import NavigationBar from "./navigation-bar";

let {
	Image,
	StyleSheet,
	Text,
	View,
	Component,
	Navigator
} = React;


class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedTab: 'home',
			showTabBar: true
		};
	}

	// renderScene(route, navigator) {
	// 	const Component = route.component;
	//
	// 	return (
	// 		<View style={{flex:1}}>
	// 			<NavigationBar
	// 				backgroundStyle={{backgroundColor: "#eee"}}
	// 				navigator={navigator}
	// 				route={route}
	// 				title={route.title}
	// 				titleColor="#333"
	// 			/>
	// 			<Component
	// 				navigator={navigator}
	// 				route={route}
	// 				{...route.passProps}
	// 			/>
	// 		</View>
	// 	);
	// }

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
					renderIcon={() => <Image style={styles.image} source={require('image!ic_feed')}/> }
					renderSelectedIcon={() => <Image style={styles.image} source={require('image!ic_feed')}/>}
					onPress={() => this.setState({ selectedTab: 'home' })}>
					<Feed {...this.props}/>
				</TabNavigator.Item>

				<TabNavigator.Item
					selected={this.state.selectedTab === 'home2'}
					title="Home 2"
					renderIcon={() => <Image style={styles.image} source={require('image!ic_search')}/> }
					renderSelectedIcon={() => <Image style={styles.image} source={require('image!ic_search')}/>}
					onPress={() => this.setState({ selectedTab: 'home2' })}>
					<Text>test 2</Text>
				</TabNavigator.Item>

			</TabNavigator>
		);
	}
}

let styles = StyleSheet.create({
	image: {
		width: 70,
		height: 70
	},
	navigationBar: {
		flex: 1
	}
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
