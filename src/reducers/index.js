import { combineReducers } from 'redux';
import patientInfoProps from './patientInfoReducer';
import allergiesProps from './allergiesReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  patientInfoProps,
  allergiesProps,
  routing: routerReducer
});

export default rootReducer;
