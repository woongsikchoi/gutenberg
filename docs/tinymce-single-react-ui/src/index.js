import React, { createElement, Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import { Provider } from 'react-redux'

const store = configureStore();
const id = 'tiny-react'

let render = () => ReactDOM.render(
	<AppContainer>
		<Root store={store} />
	</AppContainer>,
	document.getElementById(id)
);

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
		const NewRoot = require('./containers/Root').default;
		render = () => ReatDOM.render(
			<Provider store={store}>
				<AppContainer>
					<NewRoot store={store} />
				</AppContainer>
			</Provider>,
			document.getElementById(id)
		);
	});
}

render()
store.subscribe(render)
