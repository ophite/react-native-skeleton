'use strict';

import {connect} from "../../node_modules/react-redux";
import TabNavigator from 'react-native-tab-navigator';
let React = require('react-native');
import authService from '../helpers/AuthService';
import ProgressBar from 'ProgressBarAndroid';

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
	image: {
		height: 36,
		width: 36,
		borderRadius: 18
	},
	progress: {
		marginTop: 20
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

	doSearch() {
		let url = 'https://api.github.com/search/repositories?q=' +
			encodeURIComponent(this.state.searchQuery);

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
			<View style={{
				padding: 20,
				borderColor: '#D7D7D7',
				borderBottomWidth: 1,
				backgroundColor: '#fff'
			}}>
				<Text style={{
						fontSize: 20,
						fontWeight:'600'
					}}>
					{rowData.full_name}
				</Text>
				<View style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 20,
					marginBottom: 20
				}}>

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
