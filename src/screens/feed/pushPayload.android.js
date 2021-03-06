'use strict';

import React from 'react-native';
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
		fontSize: 20
	},
	row: {
		flex: 1,
		justifyContent: 'center',
		borderColor: '#D7D7D7',
		borderBottomWidth: 1,
		paddingTop: 20,
		paddingBottom: 20,
		padding: 10
	},
	textRepoName: {
		paddingTop: 20,
	},
	textCommitsLength: {
		paddingTop: 20,
		fontSize: 20
	},
	bold: {
		fontWeight: '800',
		fontSize: 16
	},
	listView: {
		top: -50
	} // warning using it in ListView style   contentInset={styles.listView} in android!!!
});


class PushPayload extends Component {

	constructor(props, context) {
		super(props, context);

		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});
		this.dataSource = ds.cloneWithRows(props.pushEvent.payload.commits || []);
	}

	render() {
		return (
			<View style={styles.container}>

				<Image style={styles.image}
					   source={{uri: this.props.pushEvent.actor.avatar_url}}/>

				<Text style={styles.textCreatedAt}>
					{moment(this.props.pushEvent.created_at).fromNow()}
				</Text>

				<Text>
					<Text style={styles.bold}>{this.props.pushEvent.actor.login}</Text>
				</Text>

				{
					this.props.pushEvent.payload.ref ?
						(<Text>{this.props.pushEvent.payload.ref.replace('refs/heads/', '')}</Text>):
						(<View></View>)
				}

				<Text style={styles.textRepoName}>
					at <Text style={styles.bold}>{this.props.pushEvent.repo.name}</Text>
				</Text>

				{
					this.props.pushEvent.payload.commits ?
						(<Text style={styles.textCommitsLength}>
							{this.props.pushEvent.payload.commits.length} Commits
						</Text>) + (<ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)}/>):
						(<View></View>)
				}
			</View>
		);
	}

	renderRow(rowData) {
		return (
			<View style={styles.row}>
				<Text>{rowData.sha.substring(0, 6)} - {rowData.message}</Text>
			</View>
		);
	}
}

export default PushPayload;
