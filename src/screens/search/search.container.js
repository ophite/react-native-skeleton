/*eslint-disable prefer-const */

import React from "react";
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestSelector} from 'redux-reqhelper';

import Search from './search';
import SearchResults from './searchResults';
import * as searchActions from '../../actions/searchAction';
import newId from '../../helpers/newid';


let {
	ListView,
} = ReactNative;
let { Component } = React;


class SearchContainer extends Component {

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
					dataSource: this.props.dataSource.cloneWithRows(nextProps.data.items)
				}
			});
		}
	}

	render() {
		return (
			<Search
				onSearchChange={this.onSearchChange}
				onSearchPressed={this.onSearchPressed.bind(this)}
				{...this.props}
			/>
		);
	}

	onSearchChange(text) {
		SearchContainer.localState.searchQuery = text;
	}

	onSearchPressed() {
		SearchContainer.localState.requestId = newId();
		this.props.searchActions.searchRequest(SearchContainer.localState.requestId, SearchContainer.localState.searchQuery);
	}
}


const mapStateToProps = (state, props) => {
	const selector = requestSelector('search', state, props)(SearchContainer.localState.requestId);
	let data = selector.data || {};
	return {
		...selector,
		data: {
			items: data.items || null
		},
		dataSource: SearchContainer.localState.dataSource.cloneWithRows(data.items || [])
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchActions: bindActionCreators(searchActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);

