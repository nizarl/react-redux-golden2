import { combineReducers } from 'redux';
import clinicaldocsProps from './clinicalDocsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  clinicaldocsProps,
  routing: routerReducer
});

export default rootReducer;
