/* @flow */
import { Map, List } from 'immutable';
import { createReducer } from './utilHelpers';
//INIT STATE IF NONE IS PROVIDED
const initialState = Map({
    current: Map(),
    history: List([]),
    debug:   false,
    modal:   undefined,
    alert:   undefined,
    overlay: undefined
});
//REDUCER FUNCTIONS EXPORTABLE FOR TESTING
    export function push(state: Map, action: Object): Map {
        return state.withMutations( (map: Map) => {
            map.set('current', action.current).set('history', map.get("history").push(map.get("current")));
        });
    }
    //
    export function pop(state: Map): Map {
        if(state.get("history").size === 0) return state;
        return state.withMutations( (map: Map) => {
            map.set('current', map.get("history").last()).set('history',map.get("history").pop());
        });
    }
    //
    export function debug(state: Map, action: Object): Map {
        return state.set('debug',!state.get('debug'));
    }
    //
    export function replace(state: Map, action: Object): Map {
        return state.set('current', action.current);
    }
    //
    export function replaceAtIndex(state: Map, action: Object): Map {
        return state.withMutations( (map: Map) => {
            map.set('history',map.get("history").splice(action.index)).set('current',action.current);
        });
    }
    //
    export function resetRouteStack(state: Map, action: Object): Map {
        return state.set('history',action.stack);
    }
    //
    export function setLayers(layerName: string): Function {
        return function (state: Map, action: Object): Map {
            return state.set(layerName, action.layer);
        }
    }
//
export default function createNavigationReducer(namespace: string, initState:Map = initialState) {
    // SWITCH THIS FOR WHATEVER STRATEGY YOU WANT WHERE EVER U WANT IT;
    const Push = "Push"+namespace;
    const Pop = "Pop"+namespace;
    const Debug = "Debug"+namespace;
    const Replace = "Replace"+namespace;
    const ReplaceAtIndex = "ReplaceAtIndex"+namespace;
    const ResetRouteStack = "ResetRouteStack"+namespace;
    const SetModalLayer = "SetModalLayer"+namespace;
    const SetAlertLayer = "SetAlertLayer"+namespace;
    const SetOverlayLayer = "SetOverlayLayer"+namespace;
    /*
    replacePrevious(route) - Replace the previous scene
    popToRoute(route) - Pop to a particular scene, as specified by its route. All scenes after it will be unmounted
    */
    return createReducer(initialState, {
        [Push]:            push,
        [Pop]:             pop,
        [Debug]:           debug,
        [Replace]:         replace,
        [ReplaceAtIndex]:  replaceAtIndex,
        [ResetRouteStack]: resetRouteStack,
        [SetModalLayer]:   setLayers('modal'),
        [SetAlertLayer]:   setLayers('alert'),
        [SetOverlayLayer]: setLayers('overlay'),
    });
}
