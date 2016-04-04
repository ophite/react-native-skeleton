/*eslint-disable prefer-const */

import React from "react-native";
import SearchResults from './SearchResults';
import authService from '../helpers/AuthService';

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

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		authService.getAuthInfo((err, authInfo) => {
			this.setState({
				checkingAuth: false,
				isLoggedIn: authInfo != null
			});
		});
	}

	render() {
		return (
			<View style={styles.container}>

				<TextInput style={styles.input}
						   placeholder="Search holder"
						   onChangeText={(text) => {
								this.setState({
									searchQuery: text
								});
							}}>
				</TextInput>

				<TouchableHighlight style={styles.button}
									onPress={this.onSearchPressed.bind(this)}>
					<Text style={styles.buttonText}> Search </Text>
				</TouchableHighlight>

			</View>
		);
	}

	onSearchPressed() {
		this.props.navigator.push({
			component: SearchResults,
			title: 'Results',
			passProps: {
				searchQuery: this.state.searchQuery
			}
		});
	}
}

export default Search;
