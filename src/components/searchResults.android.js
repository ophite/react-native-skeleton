'use strict';

import React from 'react-native';
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';

import ProgressBar from 'ProgressBarAndroid';

import * as searchActions from '../actions/searchAction';
import {searchRequireSelector} from '../selectors/searchSelector';


let {
	StyleSheet,
	Text,
	Component,
	View,
	ListView,
	Image,
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

	static dataSource = new ListView.DataSource({
		rowHasChanged: (r1, r2) => r1 != r2
	});

	componentDidMount() {
		this.props.searchActions.searchRequest(this.props.searchQuery);
	}

	render() {
		if (this.props.searchSelector.showProgress) {
			return (
				<View style={styles.containerProgress}>
					<ProgressBar style={styles.progress}/>
				</View>
			);
		}

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

const mapStateToProps = (state) => {
	let items = state.search.items ? state.search.items : [];
	return {
		searchSelector: searchRequireSelector(state),
		dataSource: SearchResults.dataSource.cloneWithRows(items)
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchActions: bindActionCreators(searchActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

