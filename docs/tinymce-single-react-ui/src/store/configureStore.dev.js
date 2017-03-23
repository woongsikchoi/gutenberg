import { createStore } from 'redux';
import content from '../reducers/content'

export default function configureStore(initialState) {
    const store = createStore(
        content,
        initialState
    );

    return store;
}
