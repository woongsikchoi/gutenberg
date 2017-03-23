import React, { createElement, Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Turducken from './containers/Turducken';
import content from './reducers/content'

const store = createStore(content)

const render = () => ReactDOM.render(
	<Provider store={store}>
		<Turducken myStore={store}/>
	</Provider>
		, document.getElementById('tiny-react')
	);

render()
store.subscribe(render)

// TODO: wrap Turducken in a Provider and add the react-redux stuff
/*
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}

*/