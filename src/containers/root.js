import React from "react-native";
import {Provider} from "react-redux";
import Scene from "./scene";
import configureStore from "../store/configure-store";

const store = configureStore();

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Scene />
			</Provider>
		);
	}
}

export default Root;
