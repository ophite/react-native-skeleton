'use strict';

import React from 'react-native';
import ReactNative from "react";
import ProgressBar from 'ProgressBarAndroid';

let {
	StyleSheet
} = ReactNative;
let { Component } = React;


let styles = StyleSheet.create({
	progress: {
		marginTop: 20
	}
});


class Progress extends Component {
	render() {
		return (
			<ProgressBar style={styles.progress}/>
		);
	}
}

export default Progress;
