/*eslint-disable prefer-const */

import React from "react-native";
import SearchResults from './searchResults';

let {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableHighlight,
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
		searchQuery: false
	};

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

			</View>
		);
	}

	onSearchChange(text) {
		Search.localState.searchQuery = text;
	}

	onSearchPressed() {
		this.props.navigator.push({
			component: SearchResults,
			title: 'Results',
			passProps: {
				searchQuery: Search.localState.searchQuery
			}
		});
	}
}

export default Search;
