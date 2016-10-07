import * as redux from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import {IApplicationState} from './types';

var g = <any>window;

var createStoreWithMiddleware = redux.compose(
    redux.applyMiddleware(thunk),
    g.devToolsExtension ? g.devToolsExtension() : f => f
)(redux.createStore);

var store = createStoreWithMiddleware(reducers) as redux.Store<IApplicationState>;

export default store;
