import { combineReducers } from 'redux';
import clinicaldocsProps from './clinicalDocsReducer';
import patientInfoProps from './patientInfoReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  clinicaldocsProps,
  patientInfoProps,
  routing: routerReducer
});

export default rootReducer;
