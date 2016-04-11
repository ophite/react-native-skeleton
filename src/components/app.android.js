'use strict';

import React from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Feed from '../containers/feed';
import Search from '../containers/search';

let {
	Image,
	StyleSheet,
	Component,
} = React;


let styles = StyleSheet.create({
	image: {
		width: 70,
		height: 70
	},
	tabBar: {
		height: 0,
		overflow: 'hidden'
	},
	scene: {
		paddingBottom: 0
	}
});


class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedTab: 'feed'
		};
	}

	render() {
		return (
			<TabNavigator tabBarStyle={styles.tabBar} sceneStyle={styles.scene}>

				<TabNavigator.Item
					selected={this.state.selectedTab === 'feed'}
					title="Feed"
					renderIcon={() => <Image style={styles.image}
											 source={require('image!ic_feed')}/> }
					renderSelectedIcon={() => <Image style={styles.image}
													 source={require('image!ic_feed')}/>}
					onPress={() => this.setState({ selectedTab: 'feed' })}>
					<Feed {...this.props}/>
				</TabNavigator.Item>

				<TabNavigator.Item
					selected={this.state.selectedTab === 'search'}
					title="Search"
					renderIcon={() => <Image style={styles.image}
											 source={require('image!ic_search')}/> }
					renderSelectedIcon={() => <Image style={styles.image}
													 source={require('image!ic_search')}/>}
					onPress={() => this.setState({ selectedTab: 'search' })}>
					<Search {...this.props}/>
				</TabNavigator.Item>

			</TabNavigator>
		);
	}
}

export default App;
