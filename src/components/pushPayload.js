'use strict';

import {connect} from "../../node_modules/react-redux";
import TabNavigator from 'react-native-tab-navigator';
let React = require('react-native');
import authService from '../helpers/AuthService';
import moment from 'moment';

let {
	StyleSheet,
	Text,
	Component,
	View,
	ListView,
	Image,
} = React;

let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingTop: 80,
		alignItems: 'center',
	}
});


class PushPayload extends Component {
	constructor(props, context) {
		super(props, context);

		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});

		this.state = {
			dataSource: ds,
		};
	}

	componentDidMount() {
		this.fetchFeed();
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>
					Hello there
				</Text>
			</View>
		);
	}
}

PushPayload.propTypes = {
	dispatch: React.PropTypes.func,
	message: React.PropTypes.string,
	isFetching: React.PropTypes.bool
};

PushPayload.defaultProps = {
	dispatch: () => {
	},
	isFetching: false,
	message: ""
};

export default connect((state) => ({
	isFetching: state.data.isFetching,
	message: state.data.message
}))(PushPayload);
