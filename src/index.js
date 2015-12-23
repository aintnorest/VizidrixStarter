/* @flow */

// $FlowIssue
import "./styles/Main.css";
import { render }     from 'react-dom';
import React          from 'react';
import configureStore from 'store/configureStore';
import Navigator      from 'components/Navigator/Navigator';

// Global __DEBUG__
const store  = configureStore(__DEBUG__);
store.dispatch({type:"Push_0", payload:{
    current: {backdrop: {x: 0, y: 0, z: 1, opacity: 100}}
} });
const Nav = Navigator();
function handleUpdate() {
    let nS = store.getState();
    let props = nS.navigator;
    console.log(props.get("current"));
    render(
        (<Nav current={props.get("current")} store={store} sceneConfigurations={require("./constants/SceneConfiguration")}/>),
        document.getElementById('root')
    );
}
store.subscribe(handleUpdate);
handleUpdate();

setTimeout(function() {
    store.dispatch({type:"Push_0", payload:{
        current: {
            backdrop: {x: 0, y: 0, z: -1, opacity: 100},
            cardFrame: {x: 0, y: 0, z: 0, opacity: 100}
        }
    } });
},2000);
