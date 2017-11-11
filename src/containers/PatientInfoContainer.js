import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/patientInfoActions';
import config from '../project.properties';
import PatientInfo from '@ctech/patientinfo-component';
import {getBaseUrl} from '../utils/path.service';
import {getPatientData} from '../utils/patient.service';

/**
 * This is a Container component.  
 * It has access to Redux state and uses mapStateToProps to map Redux state to Child component props.
 * It has access to Actions and uses mapDispatchToProps to map Actions to Child component props.
 */
export class PatientInfoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    const forPatSumAPI = {apiKey: config.availableBusinessServiceKeys.patSumAPI, apiVersion: 1};
    const patientId = getPatientData();
    const path = getBaseUrl(forPatSumAPI);
    const patientinfoConfig = config.componentInfo.patientinfo;
    this.props.actions.fetchPatientInfoData(path + patientinfoConfig.urlPath + patientId); 
  }

  render () {
    return (
      <div>
      <PatientInfo
        titleHeader={this.props.titleHeader}
        isCollapsable={this.props.isCollapsable}
        patientInfoProps={this.props.patientInfoProps} />
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
      patientInfoProps: {
        componentInfo: {
            id: state.patientInfoProps.id,
            name: state.patientInfoProps.name,
        },
        patientInfoData: state.patientInfoProps.patientInfoData
      },
      titleHeader: {
        titleFull: state.patientInfoProps.titleHeader.titleFull,
        firstSegment: state.patientInfoProps.titleHeader.firstSegment,
        secondSegment: state.patientInfoProps.titleHeader.secondSegment
      },
      isCollapsable: true
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientInfoContainer);