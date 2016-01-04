/* @flow */
/*eslint-disable prefer-const */

import React from "react-native";
import { connect } from "../../node_modules/react-redux/native";
import { fetchData } from "../actions";

import App from "./app";

//import App from 'app';

let {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    } = React;


import ProgressBar from 'ProgressBarAndroid';

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
    progress: {
        marginTop: 20
    }
});


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            isLoggedIn: false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchData());
    }

    render() {

        if (this.state.isLoggedIn) {
            return (
              <App/>
            );
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                       source={require('../static/image/holiday-octocat.png')}/>
                <Text style={styles.header}>
                    Login component
                </Text>
                <TextInput style={styles.input}
                           onChangeText={(text) => {
                            console.log(text);
                            this.setState({username: text});
                           }}
                           placeholder="User name">
                </TextInput>
                <TextInput style={styles.input}
                           placeholder="Password">
                </TextInput>
                <TouchableHighlight style={styles.button}
                                    onPress={this.onLoginPressed.bind(this)}>
                    <Text style={styles.buttonText}>
                        Log in
                    </Text>
                </TouchableHighlight>

                {this.state.showProgress ? (<ProgressBar style={styles.progress}/>) : (<View></View>)}
            </View>
        );
    }

    onLoginPressed() {
        this.setState({ showProgress: !this.state.showProgress });
        setTimeout(() => {
            console.log('login pressed', this.state.username);
            console.log('progress', this.state.showProgress);

            this.props.navigator.push({
                title: 'Image component list',
                passProps: {
                    p1: 'custom prop'
                },
                component: App
            });
            //this.setState({
            //    showProgress: !this.state.showProgress,
            //    isLoggedIn: true
            //});
        }, 1000);
    }
}

Login.propTypes = {
    dispatch: React.PropTypes.func,
    message: React.PropTypes.string,
    isFetching: React.PropTypes.bool
};

Login.defaultProps = {
    dispatch: () => {
    },
    isFetching: false,
    message: ""
};

export default connect((state) => ({
    isFetching: state.data.isFetching,
    message: state.data.message
}))(Login);
