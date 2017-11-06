import * as ActionTypes from '../constants/actionTypes';
import configureStore from './configureStore';

describe('Store', () => {

  it('should change state for clinical docs toggle', () => {
    const store = configureStore();

    const actions = [{
      type: ActionTypes.CLINICALDOCS_TOGGLE_FUNCTION,
      isOpened: false
    }];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      clinicaldocsData: [],
      id: 1,
      isOpened: false,
      name: "clinicaldocs",
      urlPath: "mocks/"
    };

    expect(actual.clinicaldocsProps).toEqual(expected);
  });
});
