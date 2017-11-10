import config from '../project.properties';

//v2
const defaultParam = {
  apiKey: "careProAPI",
  apiVersion: 1 //this goes unused for now..Business service urls will be versioned by convention as some point.
};

export function getBaseUrl(param = defaultParam) {
  const envKey = returnEnvKey();

  function returnEnvKey() {
    //The browser will always resolve window.location.hostname.  However, we supply localhost for Unit test purposes only.
    const hostname = (window && window.location && window.location.hostname) || "localhost";
    const domains = config.businessServiceBaseUrls.domains;

    for (let [key, value] of Object.entries(domains)) {
      if (value[0] === hostname) {
        return key;
      }
    }
    return "";
  }

  if (!envKey) {
    throw new Error(`Business service URL not found. Check project.properties.json file. Make sure " ${param.apiKey} "is set correctly.`);
  }

  const baseUrl = config.businessServiceBaseUrls[envKey][param.apiKey];
  return baseUrl;
}
