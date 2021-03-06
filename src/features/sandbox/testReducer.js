import { toast } from "react-toastify";

import {
  asyncActionError,
  asyncActionFinished,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { delay } from "../../app/common/util/util";

const INCREMENT_COUNTER = "INCREMENT_COUNTER";
const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export function increment(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({
        type: INCREMENT_COUNTER,
        payload: amount,
      });
      dispatch(asyncActionFinished());
    } catch (error) {
      dispatch(asyncActionError(error));
      toast.error(error);
    }
  };
}
export function decrement(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({
        type: DECREMENT_COUNTER,
        payload: amount,
      });
      dispatch(asyncActionFinished());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

const initialState = {
  data: 42,
};

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };

    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload,
      };

    default:
      return state;
  }
}
