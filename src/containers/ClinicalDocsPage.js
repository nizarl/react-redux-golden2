import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/clinicalDocsActions';
import config from '../project.properties';
import {BASE_URL} from '../utils/path.service';
import ClinicalDocs from '@ctech/clinicaldocs-component';

/**
 * This is a Container component.  
 * It has access to Redux state and uses mapStateToProps to map Redux state to Child component props.
 * It has access to Actions and uses mapDispatchToProps to map Actions to Child component props.
 */
export class CDContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    const baseUrl = BASE_URL;
    const clinicaldocsConfig = config.componentInfo.clinicaldocs;
    this.props.actions.fetchClinicalDocsData(baseUrl + clinicaldocsConfig.urlPath + clinicaldocsConfig.mockFile); 
  }

  render () {
    return (
      <div className="container-fluid">
      <ClinicalDocs
        //{this.props.patientId} is available.  It is passed in to CDContainer by App.js <Route .../>
        toggleCollapseComponent={this.props.actions.toggleCollapseComponent}
        clinicaldocsProps={this.props.clinicaldocsProps}/>
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
    clinicaldocsProps: {
      componentInfo:{
        id: state.clinicaldocsProps.id,
        name: state.clinicaldocsProps.name,
        urlPath: state.clinicaldocsProps.urlPath,
      },
      clinicaldocsData: state.clinicaldocsProps.clinicaldocsData,
      isOpened: state.clinicaldocsProps.isOpened
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CDContainer);