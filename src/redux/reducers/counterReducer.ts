import {INCREMENT_COUNT, DECREMENT_COUNT} from '../actions/types';

const initialState = {
  counter: 0,
  number: null,
};

const counter = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case DECREMENT_COUNT:
      return {
        ...state,
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

export default counter;
