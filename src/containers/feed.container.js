'use strict';

import React from 'react-native';
import {connect} from "../../node_modules/react-redux";
import {bindActionCreators} from 'redux';
import {requestSelector} from 'redux-reqhelper';

import Feed from '../components/feed';
import * as feedActions from '../actions/feedAction';
import newId from '../helpers/newid';

let {
	Component,
	ListView,
} = React;


class FeedContainer extends Component {

	static localState = {
		requestId: null,
		dataSource: new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		})
	};

	componentDidMount() {
		FeedContainer.localState.requestId = newId();
		this.props.feedActions.feedRequest(FeedContainer.localState.requestId, {
			user: this.props.user,
			header: this.props.header
		});
	}

	render() {
		return (<Feed {...this.props}/>);
	}

}


const mapStateToProps = (state, props) => {
	const selector = requestSelector('feed', state, props)(FeedContainer.localState.requestId);
	let data = Array.isArray(selector.data) ? selector.data : [];
	let feedItems = data.filter((ev)=> ~[ 'PushEvent', 'WatchEvent' ].indexOf(ev.type));

	return {
		...selector,
		dataSource: FeedContainer.localState.dataSource.cloneWithRows(feedItems || [])
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		feedActions: bindActionCreators(feedActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
