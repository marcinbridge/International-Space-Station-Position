import _ from 'lodash';

/**
 * sets initial state
 */
const setInitialState = () => ({
    position: {},
    isFetching: false
});

/**
 * fetches position
 * @param {object} state
 * @returns {object}
 */
const fetchPosition = state => {
    const newState = _.cloneDeep(state);
    newState.isFetching = true;
    return newState;
};

/**
 * receives position
 * @param {object} state
 * @param {object[]} position
 * @returns {object}
 */
const receivePosition = (state, position) => {
    const newState = _.cloneDeep(state);
    newState.position = position;
    newState.isFetching = false;
    return newState;
};

/**
 * the reducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
const reducer = (state = {}, action = {}) => {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
            return setInitialState();
        case 'FETCH_POSITION':
            return fetchPosition(state);
        case 'RECEIVE_POSITION':
            return receivePosition(state, action.position);
    }
    return state;
};

export default reducer;
