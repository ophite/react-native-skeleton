import React from "react-native";
import {Provider} from "react-redux";

import SceneContainer from "./scene.container";
import configureStore from "../store/configure-store";

const store = configureStore();

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<SceneContainer />
			</Provider>
		);
	}
}

export default Root;
