/* @flow */
import { Map, List } from 'immutable';
import { createReducer } from './utilHelpers';
//TYPE DEF
/*
type NavObj = {
    current: Map;   //
    history: List,  // Immutable array of current Maps.
    debug: boolean, // Set based on development vs production.
    modal: any,     // Will be undefined or a component.
    alert: any,     // Will be undefined or a component.
    overlay: any    // Will be undefined or a component.
};
*/
//INIT STATE IF NONE IS PROVIDED
const initialState = Map({
    current: Map(),
    history: List([]),
    debug: false,
    modal: undefined,
    alert: undefined,
    overlay: undefined
});
//REDUCER FUNCTIONS EXPORTABLE FOR TESTING
    export function push(state: Map, action: Object): Map {
        const nS = state.withMutations( (map: Map) => {
            map.set('current', action.current).set('history', map.get("history").push(map.get("current")));
        });
        return nS;
    }
    //
    export function pop(state: Map): Map {
        if(state.get("history").size === 0) return state;
        const nS = state.withMutations( (map: Map) => {
            map.set('current', map.get("history").last()).set('history',map.get("history").pop());
        });
        return nS;
    }
    //
    export function debug(state: Map, action: Object): Map {
        const nS = state.set('debug',!state.get('debug'));
        return nS;
    }
//
export default function createNavigationReducer(namespace: string, initState:Map = initialState) {
    // SWITCH THIS FOR WHATEVER STRATEGY YOU WANT WHERE EVER U WANT IT;
    const Push = "Push"+namespace;
    const Pop = "Pop"+namespace;
    const Debug = "Debug"+namespace;
    /*
    getCurrentRoutes() - returns the current list of routes
    jumpBack() - Jump backward without unmounting the current scene
    jumpForward() - Jump forward to the next scene in the route stack
    jumpTo(route) - Transition to an existing scene without unmounting
    push(route) - Navigate forward to a new scene, squashing any scenes that you could jumpForward to
    pop() - Transition back and unmount the current scene
    replace(route) - Replace the current scene with a new route
    replaceAtIndex(route, index) - Replace a scene as specified by an index
    replacePrevious(route) - Replace the previous scene
    immediatelyResetRouteStack(routeStack) - Reset every scene with an array of routes
    popToRoute(route) - Pop to a particular scene, as specified by its route. All scenes after it will be unmounted
    popToTop() - Pop to the first scene in the stack, unmounting every other scene
    */
    return createReducer(initialState, {
        [Push] : push,
        [Pop] :  pop,
        [Debug]: debug,
    });
}
