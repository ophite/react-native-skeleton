'use strict';

import {connect} from "../../node_modules/react-redux";
import TabNavigator from 'react-native-tab-navigator';
let React = require('react-native');
import authService from '../helpers/AuthService';
import ProgressBar from 'ProgressBarAndroid';
import moment from 'moment';
import PushPayload from './pushPayload';

let {
	StyleSheet,
	Text,
	Component,
	View,
	ListView,
	Image,
	TouchableHighlight
} = React;

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		padding: 20,
		alignItems: 'center',
		borderColor: '#D7D7D7',
		borderBottomWidth: 1
	},
	image: {
		height: 36,
		width: 36,
		borderRadius: 18
	},
	progress: {
		marginTop: 20
	}
});


class Feed extends Component {
	constructor(props, context) {
		super(props, context);

		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});

		this.state = {
			dataSource: ds,
			showProgress: true
		};
	}

	componentDidMount() {
		this.fetchFeed();
	}

	fetchFeed() {
		authService.getAuthInfo((err, authInfo)=> {
			let url = 'https://api.github.com/users/'
				+ authInfo.user.login
				+ '/received_events';

			fetch(url, {
				headers: authInfo.header
			})
				.then((response) => response.json())
				.then((responseData) => {
					let feedItems = responseData.filter((ev)=> ev.type === 'PushEvent');
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(feedItems),
						showProgress: false
					});
				});
		});
	}

	pressRow(rowData) {
		this.props.navigator.push({
			title: 'Push Event',
			component: PushPayload,
			passProps: {
				pushEvent: rowData
			}
		});
	}

	renderRow(rowData) {
		return (
			<TouchableHighlight
				onPress={()=> this.pressRow(rowData)}
				underlayColor='#ddd'>
				<View style={styles.row}>
					<Image style={styles.image}
						   source={{uri: rowData.actor.avatar_url}}/>
					<View style={{
					paddingLeft: 20
				}}>
						<Text style={{backgroundColor: '#fff'}}>
							{moment(rowData.created_at).fromNow()}
						</Text>
						<Text style={{backgroundColor: '#fff'}}>
							{rowData.actor.login}
						</Text>
						<Text style={{backgroundColor: '#fff'}}>
							{rowData.payload.ref.replace('refs/heads/', '')}
						</Text>
						<Text style={{backgroundColor: '#fff'}}>
							at <Text style={{
							fontWeight: 'bold'
						}}>{rowData.repo.name}</Text>
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		if (this.state.showProgress) {
			return (
				<View style={styles.container}>
					<ProgressBar style={styles.progress}/>
				</View>
			);
		}

		return (
			<View style={{
				flex:1,
				justifyContent: 'flex-start'}}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}/>
			</View>
		);
	}
}

Feed.propTypes = {
	dispatch: React.PropTypes.func,
	message: React.PropTypes.string,
	isFetching: React.PropTypes.bool,
	navigator: React.PropTypes.object
};

Feed.defaultProps = {
	dispatch: () => {
	},
	isFetching: false,
	message: ""
};

export default connect((state) => ({
	isFetching: state.data.isFetching,
	message: state.data.message
}))(Feed);
