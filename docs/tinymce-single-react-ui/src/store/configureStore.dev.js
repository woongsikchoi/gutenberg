import { createStore } from 'redux';
import content from '../reducers/content'

export default function configureStore(initialState) {
    const store = createStore(
        content,
        window.__REDUX_DEVTOOLS_EXTENSION__ ?
            window.__REDUX_DEVTOOLS_EXTENSION__()
            : initialState
    );

    return store;
}
