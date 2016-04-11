'use strict';

import React from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
import moment from 'moment';
import authService from '../helpers/authService';
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
	containerProgress: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
	},
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		justifyContent: 'flex-start'
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
	},
	text: {
		backgroundColor: '#fff'
	}
	,
	textRepoName: {
		fontWeight: 'bold'
	},
	textView: {
		paddingLeft: 20
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

	render() {
		if (this.state.showProgress) {
			return (
				<View style={styles.containerProgress}>
					<ProgressBar style={styles.progress}/>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}/>
			</View>
		);
	}

	//TODO move to API
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
					<View style={styles.textView}>
						<Text style={styles.text}>
							{moment(rowData.created_at).fromNow()}
						</Text>
						<Text style={styles.text}>
							{rowData.actor.login}
						</Text>
						<Text style={styles.text}>
							{rowData.payload.ref.replace('refs/heads/', '')}
						</Text>
						<Text style={styles.text}>
							at <Text style={styles.textRepoName}>{rowData.repo.name}</Text>
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

Feed.propTypes = {
	navigator: React.PropTypes.object
};

export default Feed;
