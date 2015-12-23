/* @flow */
import { applyMiddleware, compose, createStore } from 'redux';
import { Map } from 'immutable';
import rootReducer  from 'reducers/rootReducer';
import thunk        from 'redux-thunk';
import DevTools     from 'thirdPartyComponents/LogMonitor';
console.log("DEV TOOLS: ",DevTools);

export default function configureStore(debug: boolean = false) {
    let createStoreWithMiddleware;

    const middleware = applyMiddleware(thunk);

    if (debug) {
      createStoreWithMiddleware = compose(middleware, DevTools.instrument());
    } else {
      createStoreWithMiddleware = compose(middleware);
    }

    const store = createStoreWithMiddleware(createStore)(
      rootReducer
    );

    return store;
}
