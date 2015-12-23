/* @flow */
import { TransitionMotion } from 'react-motion';
import React                from 'react';
//DEBUG
let Provider, LogMonitor, debugStyles;
//GLOBAL __DEBUG__
if(__DEBUG__) {
    const reactRedux = require("react-redux");
    debugStyles = {position:"absolute",top:"0",right:"0",zIndex:"10",width:"40vw",height:"100vh"};
    Provider = reactRedux.Provider;
    LogMonitor = require("thirdPartyComponents/LogMonitor");
}
//
export function getStyles(props: Object): Object {
    let configs = {};
    if(typeof(props.current) == "undefined"){
        console.warn('Invalid sceneConfigurations.default');
        return configs;
    }
    Object.keys(props.current).forEach((key: string) => {
        if (typeof(props.sceneConfigurations.default) == "undefined") {
            console.warn('Invalid sceneConfigurations.default');
            return configs;
        }
        console.log("key",key,props.sceneConfigurations.default);
        configs[key] = props.sceneConfigurations.default[key].Styles(props.current[key]);
    });
    return configs;
}

export function willEnter(props: Object): Function {
    return (key: string): Object => {
        return props.sceneConfigurations.default[key].Enter;
    };
}

export function willLeave(props: Object): Function {
    return (key: string): Object => {
        return props.sceneConfigurations.default[key].Leave;
    };
}
//
export function sceneObj(iS: Object, props: Object, wrapper: Object) : Function {
    return function(key: string): any {
        const style = iS[key];
        const trns = "translate3d("+style.x+"vw,"+style.y+"vh, "+style.z+"px)";
        const s = {
            opacity: style.opacity/100,
            WebkitTransform: trns,
            transform: trns
        };
        return React.cloneElement(wrapper,{style:s,key:key},props.sceneConfigurations.default[key].VM(props.store.getState()));
    };
};
//
export function interpolatedStyles(iS: Object, props: Object,  wrapper: Object) : Object {
    return (
        <div>
            {Object.keys(iS).map(sceneObj(iS, props, wrapper))}
            {(props.modal) ? props.modal : false}
            {(props.overlay) ? props.overlay : false}
            {(props.alert) ? props.alert : false}
            {(__DEBUG__ && props.debug) ? (<div style={debugStyles}><Provider store={props.store} key="provider"><LogMonitor /></Provider></div>) : false }
        </div>
    );
};
//
export default function Navigator(): Function {
    let wrapper = (<div />);
    return (props: Object) => {
        console.log("NAv Props: ",props);
        return (
            <TransitionMotion styles={getStyles(props)}
                willEnter={willEnter(props)}
                willLeave={willLeave(props)}>
                {
                    (iS: Object): Object => interpolatedStyles(iS, props, wrapper)
                }
            </TransitionMotion>
        );
    };
}
