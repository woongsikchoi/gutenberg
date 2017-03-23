import React, { createElement, Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import { Provider } from 'react-redux'

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
			<Provider store={store}>
				<Component store={store} />
			</Provider>
    </AppContainer>,
    document.getElementById('tiny-react')
  );
}

render(Root);

if (module.hot) {
  module.hot.accept('./containers/Root', () => render(Root) );
}

store.subscribe(() => render(Root))
