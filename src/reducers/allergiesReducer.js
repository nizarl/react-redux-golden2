import * as types from '../constants/actionTypes';
import initialState from './initialState';
import config from '../../src/project.properties';

const allergiesComponentId = config.componentInfo.allergies.id;
export default function allergiesReducer(state = initialState.components.byId[allergiesComponentId], action = action) {

  switch (action.type) {

    case types.ALLERGIES_FETCH_DATA_SUCCESS:
      return {
        ...state,
        allergiesData: action.resp
      };

    case types.ALLERGIES_FETCH_DATA_ERROR:
      return {
        ...state,
        allergiesError: true
      };

    default:
      return state;
  }
}
