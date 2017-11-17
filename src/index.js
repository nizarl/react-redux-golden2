/*eslint no-unused-vars: */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import configureStore, {history} from './store/configureStore';
import Root from './components/Root';
import './styles/styles.scss';
/**
  * If you lazy load a component on route in App.js file. 
  * You will need to import component SCSS file below
  * Example: import '../node_modules/@ctech/somecomponent-component/es/SomeComponent.scss';
*/
require('./favicon.ico'); // Tell webpack to load favicon.ico
import sharedStylesCtech from '@ctech/shared-styles';

const store = configureStore();

render(
  <AppContainer>
  <Root store={store} history={history}/>
</AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./components/Root', () => {
      const NewRoot = require('./components/Root').default;
      render(
        <AppContainer>
        <NewRoot store={store} history={history}/>
      </AppContainer>, document.getElementById('app'));
    });
}
