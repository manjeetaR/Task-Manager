import { ADD_DEADLINE, ADD_NAME, ADD_LIST_ITEM } from '../actions/actionTypes';

const defaultState = {
  name: '',
  list: [],
  deadline: ''
};

const tasks = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NAME:
      return {
        ...state,
        name: action.payload.name
      };
    default:
      return state;
  }
};

export default tasks;
