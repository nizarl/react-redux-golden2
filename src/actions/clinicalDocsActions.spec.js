import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './clinicalDocsActions';

describe('Actions', () => {

  const appState = {
    clinicaldocsData: [],
    id: 1,
    isOpened: true,
    name: "clinicaldocs",
    urlPath: "clinicaldocs/"
  };

  it('should create an thunk action CLINICALDOCS_TOGGLE_FUNCTION', () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.CLINICALDOCS_TOGGLE_FUNCTION,
      id: 1,
    };

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.toggleCollapseComponent(appState))).toEqual('function');
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.toggleCollapseComponent(appState, appState.id)(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });

  it('should create an action FETCH_DATA_ERROR', () => {
    //this one is not a thunk
    const resp = {
      clinicaldocsData: [],
      id: 1,
      isOpened: true,
      name: "clinicaldocs",
      urlPath: "clinicaldocs/"
    };
    const actual = ActionCreators.loadError(appState, resp);
    const expected = {
      resp,
      type: ActionTypes.FETCH_DATA_ERROR,
    };

    expect(actual).toEqual(expected);
  });

  it('should create an action FETCH_DATA_SUCCESS', () => {
    //this one is not a thunk
    const resp = {
      clinicaldocsData: [],
      id: 1,
      isOpened: true,
      name: "clinicaldocs",
      urlPath: "clinicaldocs/"
    };
    const actual = ActionCreators.loadSuccess(appState, resp);
    const expected = {
      resp,
      type: ActionTypes.FETCH_DATA_SUCCESS,
    };

    expect(actual).toEqual(expected);
  });
});
