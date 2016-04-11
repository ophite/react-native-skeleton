'use strict';

import React from 'react-native';
import ProgressBar from 'ProgressBarAndroid';

let {
	StyleSheet,
	Component,
} = React;


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
