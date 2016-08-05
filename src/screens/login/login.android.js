/*eslint-disable prefer-const */

import React from "react";
import ReactNative from 'react-native';
import ProgressBar from '../../components/progress';

let {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableHighlight,
} = ReactNative;
let { Component } = React;


let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
	},
	logo: {
		width: 166,
		height: 155
	},
	header: {
		fontSize: 30,
		marginTop: 10
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
	error: {
		color: 'red',
		paddingTop: 10
	}
});


class Login extends Component {

	render() {
		var errorView = <View/>;
		if (this.props.error && this.props.error.badCredentials) {
			errorView = (
				<Text style={styles.error}>
					That username and password combination did not work
				</Text>
			);
		}

		if (this.props.error && this.props.error.unknownError) {
			errorView = (
				<Text style={styles.error}>
					We experienced an unexpected issue
				</Text>
			);
		}

		return (
			<View style={styles.container}>
				<Image style={styles.logo}
					   source={require('image!ic_launcher')}/>
				<Text style={styles.header}> Login component </Text>
				<TextInput style={styles.input}
						   placeholder="User name"
						   onChangeText={this.props.onUsernameChange}>
				</TextInput>
				<TextInput style={styles.input}
						   placeholder="Password"
						   onChangeText={this.props.onPasswordChange}
						   secureTextEntry={true}>
				</TextInput>
				<TouchableHighlight style={styles.button}
									onPress={this.props.onLoginPressed}>
					<Text style={styles.buttonText}> Log in </Text>
				</TouchableHighlight>

				{errorView}
				{this.props.isLoading ? (<ProgressBar/>) : (<View></View>)}
			</View>
		);
	}
}

export default Login;
