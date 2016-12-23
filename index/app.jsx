import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer.jsx';
import {pollPositionThunk} from './actions/actionCreators.jsx';
import {MainComponent} from './components/MainComponent.jsx';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(pollPositionThunk ());

ReactDOM.render(
    <Provider store={store}>
        <MainComponent />
    </Provider>,
    document.querySelector('.react-container')
);
