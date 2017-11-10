import React from 'react';
import PropTypes from 'prop-types';
import {Switch, NavLink, Route} from 'react-router-dom';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import {setAppInfo} from '../utils/appinfo.service';
import {setPatientData, getPatientData} from '../utils/patient.service';
import Loadable from 'react-loadable';
import LoadingComponent from '../components/LoadingComponent';
import PatientInfo from '@ctech/patientinfo-component';
import config from '../project.properties';
import {getBaseUrl} from '../utils/path.service';
import {init} from '../utils/http.service';

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
    this.state = {
      patientId: getPatientData(),
      PatInfodefaultProps: {
        patientInfoProps: {
          componentInfo: {
            name: 'patientinfo',
            id: 1
          },
          patientInfoData: {}

        },
        titleHeader: {
          titleFull: "CarePro",
          firstSegment: "Care",
          secondSegment: "Pro"
        },
        isCollapsable: true
      }
    };
  }

  componentDidMount() {
    const forPatSumAPI = {apiKey: config.availableBusinessServiceKeys.patSumAPI, apiVersion: 1};
    let path = getBaseUrl(forPatSumAPI);
    const patientinfoConfig = config.componentInfo.patientinfo;

    (async () =>{
        try {
          const httpClient = init();
          const response = await httpClient.get(path + patientinfoConfig.urlPath + this.state.patientId);
          const data = response.data;
          let props = {...this.state.PatInfodefaultProps};
          props.patientInfoProps.patientInfoData = data;
          this.setState(() => {return props;});
        } catch (err) {
          //Entire page should show <ErrorPage /> component if patientinfo fails to load
          console.log(err); // eslint-disable-line no-console
        }
      }
    )();
  }

  render() {
    const activeStyle = {
      color: 'red'
    };
    return (
      <div>
        <PatientInfo
          titleHeader={this.state.PatInfodefaultProps.titleHeader}
          isCollapsable={this.state.PatInfodefaultProps.isCollapsable}
          patientInfoProps={this.state.PatInfodefaultProps.patientInfoProps}/>

        <div className="carepro-navbar">
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/clinical" activeStyle={activeStyle}>Clinical</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/clinical" render={() =>< AsyncClinicalDocsContainer patientId = {this.state.patientId} />}/>
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
