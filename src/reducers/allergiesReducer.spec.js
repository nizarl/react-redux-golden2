import * as ActionTypes from '../constants/actionTypes';
import reducer from '../reducers/allergiesReducer';
import allergiesMockData from '../mocks/allergies.mock';
import config from '../project.properties';
const allergiesComponent = config.componentInfo.allergies;

describe('Reducers::Allergies', () => {

  const getInitialState = () => {
    return {
        allergiesData: {},
        id: allergiesComponent.id,
        name: allergiesComponent.name,
        allergiesError: allergiesComponent.allergiesError
    };
  };

  const getAppState = () => {
    return {
        allergiesData: [allergiesMockData],
        id: allergiesComponent.id,
        name: allergiesComponent.name,
        allergiesError: allergiesComponent.allergiesError
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
    const action = { type: ActionTypes.ALLERGIES_FETCH_DATA_ERROR};
    const expected = Object.assign(getAppState());
    expect(reducer(getAppState(), action)).not.toBe(expected);
  });
});
