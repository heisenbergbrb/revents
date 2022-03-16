import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
} from "./eventConstants";
import {
  asyncActionError,
  asyncActionFinished,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { fetchSampleData } from "../../app/api/mockApi";

export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
}

export function deleteEvent(eventId) {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
}

export function listenToEvents(payload) {
  return {
    type: FETCH_EVENTS,
    payload,
  };
}

export function loadEvents() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: events });
      dispatch(asyncActionFinished());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}