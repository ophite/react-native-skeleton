'use strict';

import React from 'react-native';
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';

import ProgressBar from '../components/progress';
import moment from 'moment';

import PushPayload from '../components/pushPayload';
import requestSelector from '../selectors/requestSelector';
import * as feedActions from '../actions/feedAction';
import newId from '../helpers/newid';

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

	static localState = {
		requestId: null,
		dataSource: new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		})
	};

	componentDidMount() {
		Feed.localState.requestId = newId();
		this.props.feedActions.feedRequest(Feed.localState.requestId, { user: this.props.user, header: this.props.header });
	}

	render() {
		if (this.props.isLoading) {
			return (
				<View style={styles.containerProgress}>
					<ProgressBar/>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.props.dataSource}
					renderRow={this.renderRow.bind(this)}/>
			</View>
		);
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

	pressRow(rowData) {
		this.props.navigator.push({
			title: 'Push Event',
			component: PushPayload,
			passProps: {
				pushEvent: rowData
			}
		});
	}
}

Feed.propTypes = {
	navigator: React.PropTypes.object
};


const mapStateToProps = (state, props) => {
	const selector = requestSelector('feed', state, props)(Feed.localState.requestId);
	let data = Array.isArray(selector.data) ? selector.data : [];
	let feedItems = data.filter((ev)=> ev.type === 'PushEvent');

	return {
		...selector,
		dataSource: Feed.localState.dataSource.cloneWithRows(feedItems || [])
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		feedActions: bindActionCreators(feedActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
