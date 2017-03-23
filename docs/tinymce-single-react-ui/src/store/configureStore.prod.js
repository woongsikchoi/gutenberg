import { createStore } from 'redux';
import content from '../reducers/content'

export default function configureStore(initialState) {
    return createStore(
        content,
        initialState
    );
}
