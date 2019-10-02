import * as types from './actionTypes';

export const addName = name => ({
    type: types.ADD_NAME,
    payload: name
});

export const addDeadline = deadline => ({
    type: types.ADD_DEADLINE,
    payload: deadline
});

export const addListItem = (id, name, deadline) => ({
    type: types.ADD_LIST_ITEM,
    payload: {
        id,
        name, deadline
    }
})