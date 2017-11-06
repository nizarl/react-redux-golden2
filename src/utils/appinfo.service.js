import Cookies from 'universal-cookie';
import config from '../project.properties';
const cookies = new Cookies();

export function setAppInfo() {
  cookies.set('appName', config.appName);
  cookies.set('appVersion', config.appVersion);
}

export function getAppInfo() {
  const appName = cookies.get('appName');
  const appVersion = cookies.get('appVersion');
  return {
    appName: appName,
    appVersion: appVersion
  };
}

