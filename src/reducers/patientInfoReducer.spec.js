import * as ActionTypes from '../constants/actionTypes';
import reducer from '../reducers/patientInfoReducer';
import patientinfoMockData from '../mocks/patientinfo.mock';
import config from '../project.properties';

const patientInfoComponent = config.componentInfo.patientinfo;

describe('Reducers::PatientInfo', () => {

  const getInitialState = () => {
    return {
        id: patientInfoComponent.id,
        name: patientInfoComponent.name,
        titleHeader: {
          titleFull: patientInfoComponent.titleHeader.titleFull,
          firstSegment: patientInfoComponent.titleHeader.firstSegment,
          secondSegment: patientInfoComponent.titleHeader.secondSegment
        },
        patientInfoData: {},
        isCollapsable: true
    };
  };

  const getAppState = () => {
    return {
        patientInfoData: patientinfoMockData,
        id: patientInfoComponent.id,
        name: patientInfoComponent.name,
        titleHeader: {
          titleFull: patientInfoComponent.titleHeader.titleFull,
          firstSegment: patientInfoComponent.titleHeader.firstSegment,
          secondSegment: patientInfoComponent.titleHeader.secondSegment
        },
        isCollapsable: true
    };
  };


  it('should set initial state by default', () => {
    const action = {
      type: 'unknown'
    };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });


  it('should handle FETCH_DATA_ERROR', () => {
    const action = { type: ActionTypes.PATIENTINFO_FETCH_DATA_ERROR};
    const expected = Object.assign(getAppState());
    expect(reducer(getAppState(), action)).not.toBe(expected);
  });
});
