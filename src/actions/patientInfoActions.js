import * as types from '../constants/actionTypes';
import {init} from '../utils/http.service';

/*
 * We use the redux-thunk middleware library for async actions.  Thunk defers work for later (Async).
 * Thunk bindings are created in configureStore.js file. (see: createStore(){...})
 * Thunk allows you to write action creators that return a function instead of an action. 
 * The inner function can receive the store methods .dispatch() and .getState() as parameters.
 * Futher reading: https://github.com/gaearon/redux-thunk
 */


export function loadSuccess(resp) {
  return {
    type: types.PATIENTINFO_FETCH_DATA_SUCCESS,
    resp
  };
}
export function loadError(resp) {
  return {
    type: types.PATIENTINFO_FETCH_DATA_ERROR,
    resp
  };
}

// example of a redux-thunk
export function fetchPatientInfoData(url) {
  return async(dispatch) => {
    try {
    
    const httpClient = init();
    const response = await httpClient.get(url);
    const data = response.data;
    dispatch(loadSuccess(data));
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      dispatch(loadError(err));
    }
  };
}
