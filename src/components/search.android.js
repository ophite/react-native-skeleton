/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';
import ProgressBar from 'ProgressBarAndroid';

import SearchResults from './searchResults';

import * as searchActions from '../actions/searchAction';
import {searchRequireSelector} from '../selectors/searchSelector';


let {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ListView,
	Component
} = React;


let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: 100,
		alignItems: 'center',
		padding: 10
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 2,
		borderColor: '#48bbec'
	},
	button: {
		height: 50,
		backgroundColor: '#48bbec',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center'
	},
	progress: {
		marginTop: 20
	},
});


class Search extends Component {

	static localState = {
		searchQuery: false,
		dataSource: new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		})
	};

	componentWillReceiveProps(nextProps) {
		if (!this.props.searchSelector.items && nextProps.searchSelector.items) {
			this.props.navigator.push({
				component: SearchResults,
				title: 'Results',
				passProps: {
					dataSource: nextProps.dataSource
				}
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>

				<TextInput style={styles.input}
									 placeholder="Search holder"
									 onChangeText={this.onSearchChange.bind(this)}>
				</TextInput>

				<TouchableHighlight style={styles.button}
														onPress={this.onSearchPressed.bind(this)}>
					<Text style={styles.buttonText}> Search </Text>
				</TouchableHighlight>

				{this.props.searchSelector.showProgress ? (<ProgressBar style={styles.progress}/>) : (<View></View>)}

			</View>
		);
	}

	onSearchChange(text) {
		Search.localState.searchQuery = text;
	}

	onSearchPressed() {
		this.props.searchActions.searchRequest(Search.localState.searchQuery);
	}
}

const mapStateToProps = (state) => {
	let items = state.search.items ? state.search.items : [];
	return {
		searchSelector: searchRequireSelector(state),
		dataSource: Search.localState.dataSource.cloneWithRows(items)
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchActions: bindActionCreators(searchActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

