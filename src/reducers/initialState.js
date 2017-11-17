/**
 * Redux is intended to be a predictable state container. l
 * We store application state as needed into a single state seen below.
 * State is changed by Reducers only. Never directory by components. 
 * Let's try to keep this structure flat as much as possible.  This will make Reducer logic simpler.
 * 
 */

import config from '../project.properties';
const patientInfoConfig = config.componentInfo.patientinfo;
const allergiesConfig = config.componentInfo.allergies;

export default {
  components: {
    byId: {
      1: {
        id: patientInfoConfig.id,
        name: patientInfoConfig.name,
        patientInfoData: {},
        titleHeader: {
          titleFull: patientInfoConfig.titleHeader.titleFull,
          firstSegment: patientInfoConfig.titleHeader.firstSegment,
          secondSegment: patientInfoConfig.titleHeader.secondSegment
        },
        isCollapsable: true
      },
      2: {
        id: allergiesConfig.id,
        name: allergiesConfig.name,
        allergiesData: {},
        allergiesError: false
      },
    },
    allIds: [1, 2]
  }
};
