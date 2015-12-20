/* @flow */
export function createReducer(initialState: Object, reducerMap: Object): Function {
    return (state = initialState, action: Object): Object => {
        if (typeof(action) === 'undefined') {
            console.error('-- Invalid action in reducers/utilHelpers!!! --');
            return state;
        }
        const reducer: Function = reducerMap[action.type];

        return reducer ? reducer(state, action.payload) : state;
    };
}
