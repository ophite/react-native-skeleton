'use strict';

import React from 'react';
import ReactNative from 'react-native';

let {
	StyleSheet,
	Text,
	View,
	ListView,
	Image,
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
		justifyContent: 'flex-start'
	},
	repoCell: {
		width: 50,
		alignItems: 'center'
	},
	repoCellIcon: {
		width: 20,
		height: 20,
	},
	repoCellLabel: {
		textAlign: 'center'
	},
	progress: {
		marginTop: 20
	},
	rowContainer: {
		padding: 20,
		borderColor: '#D7D7D7',
		borderBottomWidth: 1,
		backgroundColor: '#fff'
	},
	rowInnerContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		marginBottom: 20
	},
	textFullName: {
		fontSize: 20,
		fontWeight: '600'
	}
});


class SearchResults extends Component {

	render() {
		return (
			<View style={styles.container}>
				<ListView dataSource={this.props.dataSource}
									renderRow={this.renderRow.bind(this)}/>
			</View>
		);
	}

	renderRow(rowData) {
		return (
			<View style={styles.rowContainer}>
				<Text style={styles.textFullName}>
					{rowData.full_name}
				</Text>

				<View style={styles.rowInnerContainer}>
					<View style={styles.repoCell}>
						<Image source={require('image!ic_star')}
									 style={styles.repoCellIcon}>
						</Image>
						<Text style={styles.repoCellLabel}>
							{rowData.stargazers_count}
						</Text>
					</View>

					<View style={styles.repoCell}>
						<Image source={require('image!ic_fork')}
									 style={styles.repoCellIcon}>
						</Image>
						<Text style={styles.repoCellLabel}>
							{rowData.forks}
						</Text>
					</View>

					<View style={styles.repoCell}>
						<Image source={require('image!ic_fork')}
									 style={styles.repoCellIcon}>
						</Image>
						<Text style={styles.repoCellLabel}>
							{rowData.open_issues}
						</Text>
					</View>
				</View>

			</View>
		);
	}
}


export default SearchResults;

