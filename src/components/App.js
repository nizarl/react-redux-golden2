/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import {Switch, NavLink, Route} from 'react-router-dom';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import {setAppInfo} from '../utils/appinfo.service';
import {setPatientData} from '../utils/patient.service';
import Loadable from 'react-loadable';
import LoadingComponent from '../components/LoadingComponent';
import PatientInfoContainer from '../containers/PatientInfoContainer';

/**
 * Loadable uses react-loadable: https://github.com/thejameskyle/react-loadable
 */
const AsyncClinicalDocsContainer = Loadable({
  loader: () => import ("../containers/ClinicalDocsPage"),
  loading: LoadingComponent
});

/**
* This is a class-based component because the current
* version of hot reloading won't hot reload a stateless
* component at the top-level.
*/
class App extends React.Component {
  constructor(props) {
    super(props);
    setAppInfo();
    setPatientData();
  }

  componentDidMount() {
  }

  //WE SHOULD APPLY AT TERNARY IN THE RETURN STATEMENT.  IF PATIENTINFO ERROR THEN SHOW <ERRORPAGE /> COMPONENT
  render() {
    const activeStyle = {color: 'red'};
    return (
      <div>
        <PatientInfoContainer />

        <div className="carepro-navbar">
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/clinical" activeStyle={activeStyle}>Clinical</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/clinical" render={() =><AsyncClinicalDocsContainer />}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
