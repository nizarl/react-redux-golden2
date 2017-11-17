import * as types from '../constants/actionTypes';
import initialState from './initialState';
import config from '../../src/project.properties';

/*
* Redux state should only be changed by Reducers only.
* The concept of a reducer is that it takes the current state and an action and it returns the next state. 
* It's a pure function that does not modify the current state.
* State is considered immutable. (Object.assign and spread operator should be used to ensure immutability.)
*
*
* To access entire state object just you could do the following.
* export default function patientInfoReducer(state = initialState, action = action) {

* --------------- Example PatientInfo Reducer: ------------
*/

const patientInfoComponentId = config.componentInfo.patientinfo.id;
export default function patientInfoReducer(state = initialState.components.byId[patientInfoComponentId], action = action) {

  switch (action.type) {

    case types.PATIENTINFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        patientInfoData: action.resp
      };

    case types.PATIENTINFO_FETCH_DATA_ERROR:
      //You could update state here for failed fetch.  In this example just return state.
      return state;

    default:
      return state;
  }
}
