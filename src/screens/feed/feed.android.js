'use strict';

import React from "react";
import ReactNative from 'react-native';
import moment from 'moment';

import ProgressBar from '../../components/progress';

let {
	StyleSheet,
	Text,
	View,
	ListView,
	Image,
	TouchableHighlight
} = ReactNative;
let { Component } = React;

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
						{
							rowData.payload.ref ?
								(<Text style={styles.text}>
									{rowData.payload.ref.replace('refs/heads/', '')}
								</Text>) :
								(<View></View>)
						}
						<Text style={styles.text}>
							at <Text style={styles.textRepoName}>{rowData.repo.name}</Text>
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	pressRow(rowData) {
		this.props.onShowResults(rowData);
	}
}

export default Feed;
