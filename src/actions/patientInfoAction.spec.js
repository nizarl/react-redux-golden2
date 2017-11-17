import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from '../actions/patientInfoActions';

describe('Actions', () => {

  const appState = {
    patientInfoData: [],
    id: 3,
    name: "patientinfo",
    urlPath: "patientInfo/",
    titleHeader: {
      titleFull: "CarePro",
      firstSegment: "Care",
      secondSegment: "Pro"
    }
  };

  const resp = {
    patientInfoData: [],
    id: 3,
    name: "patientinfo",
    urlPath: "patientInfo/",
    titleHeader: {
      titleFull: "CarePro",
      firstSegment: "Care",
      secondSegment: "Pro"
    }
  };

  it('should create an action PATIENTINFO_FETCH_DATA_ERROR', () => {
    //this one is not a thunk
    const actual = ActionCreators.patientInfoLoadError(appState, resp);
    const expected = {
      resp,
      type: ActionTypes.PATIENTINFO_FETCH_DATA_ERROR,
    };

    expect(actual).toEqual(expected);
  });

  it('should create an action PATIENTINFO_FETCH_DATA_SUCCESS', () => {
    //this one is not a thunk
    const actual = ActionCreators.patientInfoLoadSuccess(appState, resp);
    const expected = {
      resp,
      type: ActionTypes.PATIENTINFO_FETCH_DATA_SUCCESS,
    };

    expect(actual).toEqual(expected);
  });
});
