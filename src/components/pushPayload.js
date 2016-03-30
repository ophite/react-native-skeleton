'use strict';

import {connect} from "../../node_modules/react-redux";
import TabNavigator from 'react-native-tab-navigator';
let React = require('react-native');
import authService from '../helpers/AuthService';
import moment from 'moment';

let {
	StyleSheet,
	Text,
	Component,
	View,
	ListView,
	Image,
} = React;

let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingTop: 80,
		alignItems: 'center',
	},
	image: {
		height: 120,
		width: 120,
		borderRadius: 60
	},
	textCreatedAt: {
		paddingTop: 20,
		// paddingBottom: 20,
		fontSize: 20
	},
	row: {
		flex: 1,
		justifyContent: 'center',
		borderColor: '#D7D7D7',
		borderBottomWidth: 1,
		// borderTopWidth: 1,
		paddingTop: 20,
		paddingBottom: 20,
		padding: 10
	},
	textRepoName: {
		paddingTop: 20,
	},
	textCommitsLength: {
		paddingTop: 20,
		// paddingBottom: 40,
		fontSize: 20
	},
	bold: {
		fontWeight: '800',
		fontSize: 16
	}
});


class PushPayload extends Component {
	constructor(props, context) {
		super(props, context);

		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});

		this.state = {
			dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
			pushEvent: props.pushEvent
		};
	}

	// TODO add space between central text descr and this text
	renderRow(rowData) {
		return (
			<View style={styles.row}>
				<Text>{rowData.sha.substring(0, 6)} - {rowData.message}</Text>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.image}
					   source={{uri: this.state.pushEvent.actor.avatar_url}}
				/>
				<Text style={styles.textCreatedAt}>
					{moment(this.state.pushEvent.created_at).fromNow()}
				</Text>
				<Text><Text style={styles.bold}>{this.state.pushEvent.actor.login}</Text></Text>
				<Text>{this.state.pushEvent.payload.ref.replace('refs/heads/', '')}</Text>
				<Text style={styles.textRepoName}>
					at <Text style={styles.bold}>{this.state.pushEvent.repo.name}</Text>
				</Text>
				<Text style={styles.textCommitsLength}>
					{this.state.pushEvent.payload.commits.length} Commits
				</Text>

				<ListView
					contentInset={{
						top:-50
					}}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}/>
			</View>
		);
	}
}

PushPayload.propTypes = {
	dispatch: React.PropTypes.func,
	message: React.PropTypes.string,
	isFetching: React.PropTypes.bool
};

PushPayload.defaultProps = {
	dispatch: () => {
	},
	isFetching: false,
	message: ""
};

export default connect((state) => ({
	isFetching: state.data.isFetching,
	message: state.data.message
}))(PushPayload);
