import * as ActionTypes from '../constants/actionTypes';
import configureStore from '../store/configureStore';
import config from '../project.properties';
const allergiesComponent = config.componentInfo.allergies;


describe('Store', () => {

  it('should change state for Allergies Error docs toggle', () => {
    const store = configureStore();

    const actions = [{
      type: ActionTypes.ALLERGIES_FETCH_DATA_ERROR,
    }];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      allergiesData: {},
      id: allergiesComponent.id,
      name: allergiesComponent.name,
      allergiesError: true
    };

    expect(actual.allergiesProps).toEqual(expected);
  });
});
