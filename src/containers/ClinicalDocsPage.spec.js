import React from 'react';
import {shallow} from 'enzyme';
import {CDContainer} from './ClinicalDocsPage';
import ClinicalDocsComponent from '@ctech/clinicaldocs-component';
import {fetchClinicalDocsData} from '../actions/clinicalDocsActions';

describe('<CDContainer />', () => {
      it('should contain <ClinicalDocsComponent />', () => {
          const actions = {
            toggleCollapseComponent: () => {return true;},
            fetchClinicalDocsData: fetchClinicalDocsData
          };
          const tempProps = {
            clinicaldocsData: [],
            componentInfo: {
              id: 1,
              name: 'clinicaldocs',
              urlPath: 'clinicaldocs/',
            },
            isOpened: true
          };
          const wrapper = shallow(<CDContainer toggleCollapseComponent = {
              actions.toggleCollapseComponent
            }
            actions = {
              actions
            }
            clinicaldocsProps = {
              tempProps
            }
            />);

            expect(wrapper.find(ClinicalDocsComponent).length).toEqual(1);
          });
      });
