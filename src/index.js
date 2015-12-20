/* @flow */

// $FlowIssue
import "./styles/Main.css";
import { render }     from 'react-dom';
import React          from 'react';
import configureStore from 'store/configureStore';
import Navigator      from 'components/Navigator/Navigator';


const store  = configureStore(__DEBUG__);
function handleUpdate() {
    let nS = store.getState();
    let props = nS.navigator;
    render(
        React.createElement(Navigator, Object.assign({},props, { store: store })),
        document.getElementById('root')
    );
}
store.subscribe(handleUpdate);
