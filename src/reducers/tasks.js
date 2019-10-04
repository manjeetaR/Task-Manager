import {
  ADD_DEADLINE,
  ADD_NAME,
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM
} from '../actions/actionTypes';

const defaultState = {
  name: '',
  list: [{ id: 1, name: 'Meeting', deadline: '2019-08-02' }],
  deadline: ''
};

const tasks = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NAME:
      return {
        ...state,
        name: action.payload
      };
    case ADD_LIST_ITEM:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case ADD_DEADLINE:
      return {
        ...state,
        deadline: action.payload
      };
    case DELETE_LIST_ITEM:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default tasks;
