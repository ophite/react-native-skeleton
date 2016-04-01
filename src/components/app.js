'use strict';

import React from 'react-native';
import {connect} from "../../node_modules/react-redux";
import TabNavigator from 'react-native-tab-navigator';
import Feed from './feed';
import Search from './search';

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
			selectedTab: 'home'
		};
	}

	render() {
		return (
			<TabNavigator tabBarStyle={styles.tabBar} sceneStyle={styles.scene}>

				<TabNavigator.Item
					selected={this.state.selectedTab === 'home'}
					title="Home"
					renderIcon={() => <Image
										style={styles.image}
										source={require('image!ic_feed')}/> }
					renderSelectedIcon={() => <Image
										style={styles.image}
										source={require('image!ic_feed')}/>}
					onPress={() => this.setState({ selectedTab: 'home' })}>
					<Feed {...this.props}/>
				</TabNavigator.Item>

				<TabNavigator.Item
					selected={this.state.selectedTab === 'search'}
					title="Search"
					renderIcon={() => <Image
										style={styles.image}
										source={require('image!ic_search')}/> }
					renderSelectedIcon={() => <Image
										style={styles.image}
										source={require('image!ic_search')}/>}
					onPress={() => this.setState({ selectedTab: 'search' })}>
					<Search {...this.props}/>
				</TabNavigator.Item>

			</TabNavigator>
		);
	}
}


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
