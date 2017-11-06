import * as ActionTypes from '../constants/actionTypes';
import reducer from './clinicalDocsReducer';
import clinicalDocsMockData from '../mocks/clinicaldocs.mock';

describe('Reducers::ClinicalDocs', () => {

  const getInitialState = () => {
    return {
        clinicaldocsData: [],
        id: 1,
        isOpened: true,
        name: "clinicaldocs",
        urlPath: "mocks/"
    };
  };

  const getAppState = () => {
    return {
        clinicaldocsData: [clinicalDocsMockData],
        id: 1,
        isOpened: true,
        name: "clinicaldocs",
        urlPath: "mocks/"
    };
  };


  it('should set initial state by default', () => {
    const action = {
      type: 'unknown'
    };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CLINICALDOCS_TOGGLE_FUNCTION', () => {
    const action = { type: ActionTypes.CLINICALDOCS_TOGGLE_FUNCTION};
    const expected = Object.assign(getAppState(), { isOpened:false });

    expect(reducer(getAppState(), action)).toEqual(expected);
  });

  it('should handle FETCH_DATA_ERROR', () => {
    const action = { type: ActionTypes.FETCH_DATA_ERROR};
    const expected = Object.assign(getAppState());
    expect(reducer(getAppState(), action)).not.toBe(expected);
  });
});
