/**
 * 
 * SSO uses cookiestore for AT and patientId.
 * We do not want to store state in 2 places (i.e. cookiestore and Redux state) so we use also cookiestore to AT and patientId
 */

import Cookies from 'universal-cookie';
import config from '../project.properties';
const queryString = require('query-string');
const cookies = new Cookies();

export function setPatientData() {
  const parsed = queryString.parse(location.search);
  const patientIdFromUrl = parsed.patientId;
  const ssoPatId = cookies.get('patientId');
  const ssoAT = cookies.get('at');

  //Check for patientId in URL (this takes precedence while in test). This should be removed when going to Prod.
  if ((patientIdFromUrl)) {
    cookies.set('patientId', patientIdFromUrl);
  }

  //Check for patientId and SSO authentication token in cookiestore.
  //Cookies (key/values) are set in cookiestore by Referring Application.
  else if (ssoPatId && ssoAT) {
    return true;
  }

  // //use default test patient (will remove once SSO and contextual data is ready)
  else {
    cookies.set('patientId', config.defaultTestPatientId);
  }
}

export function getPatientData() {
  const patientIdFromCookieStore = cookies.get('patientId');
  return patientIdFromCookieStore;
}
