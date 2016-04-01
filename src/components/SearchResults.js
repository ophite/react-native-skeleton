'use strict';

import React from 'react-native';
import {connect} from "../../node_modules/react-redux";
import ProgressBar from 'ProgressBarAndroid';

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
	constructor(props, context) {
		super(props, context);

		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});

		this.state = {
			dataSource: ds,
			showProgress: true,
			searchQuery: props.searchQuery
		};
	}

	componentDidMount() {
		this.doSearch();
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
				<ListView dataSource={this.state.dataSource}
						  renderRow={this.renderRow.bind(this)}/>
			</View>
		);
	}

	doSearch() {
		let url = 'https://api.github.com/search/repositories?q=' +
			encodeURIComponent(this.state.searchQuery);

		//TODO move to API
		fetch(url)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					repositories: responseData.repositories,
					dataSource: this.state.dataSource.cloneWithRows(responseData.items)
				});
			})
			.finally(() => {
				this.setState({
					showProgress: false
				});
			});
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

SearchResults.propTypes = {
	dispatch: React.PropTypes.func,
	message: React.PropTypes.string,
	isFetching: React.PropTypes.bool,
	navigator: React.PropTypes.object
};

SearchResults.defaultProps = {
	dispatch: () => {
	},
	isFetching: false,
	message: ""
};

export default connect((state) => ({
	isFetching: state.data.isFetching,
	message: state.data.message
}))(SearchResults);
