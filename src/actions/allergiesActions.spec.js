import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from '../actions/allergiesActions';

describe('Actions', () => {

  const appState = {
    allergiesData: [],
    id: 4,
    name: "allergies",
    urlPath: "allergies/",
    allergiesError: false
  };

  const resp = {
    allergiesData: [],
    id: 4,
    name: "allergies",
    urlPath: "allergies/",
    allergiesError: false
  };

  it('should create an action ALLERGIES_FETCH_DATA_ERROR', () => {
    //this one is not a thunk
    const actual = ActionCreators.allergiesLoadError(appState, resp);
    const expected = {
      resp,
      type: ActionTypes.ALLERGIES_FETCH_DATA_ERROR,
    };

    expect(actual).toEqual(expected);
  });

  it('should create an action ALLERGIES_FETCH_DATA_SUCCESS', () => {
    //this one is not a thunk
    const actual = ActionCreators.allergiesLoadSuccess(appState, resp);
    const expected = {
      resp,
      type: ActionTypes.ALLERGIES_FETCH_DATA_SUCCESS,
    };

    expect(actual).toEqual(expected);
  });
});
