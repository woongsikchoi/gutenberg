import React, { createElement, Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Turducken from '../containers/Turducken';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <Turducken myStore={store} />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
