/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';
import ProgressBar from '../components/progress';

import SearchResults from '../components/searchResults';

import * as searchActions from '../actions/searchAction';
import {requestSelector} from 'redux-reqhelper';
import newId from '../helpers/newid';


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
	}
});


class Search extends Component {

	static localState = {
		searchQuery: false,
		dataSource: new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		}),
		requestId: null
	};

	componentWillReceiveProps(nextProps) {
		if (!this.props.data.items && nextProps.data.items) {
			this.props.navigator.push({
				component: SearchResults,
				title: 'Results',
				passProps: {
					dataSource: Search.localState.dataSource.cloneWithRows(nextProps.data.items)
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

				{this.props.isLoading ? (<ProgressBar/>) : (<View></View>)}

			</View>
		);
	}

	onSearchChange(text) {
		Search.localState.searchQuery = text;
	}

	onSearchPressed() {
		Search.localState.requestId = newId();
		this.props.searchActions.searchRequest(Search.localState.requestId, Search.localState.searchQuery);
	}
}


const mapStateToProps = (state, props) => {
	const selector = requestSelector('search', state, props)(Search.localState.requestId);
	let data = selector.data || {};

	return {
		...selector,
		data: {
			items: data.items || null
		}
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchActions: bindActionCreators(searchActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

