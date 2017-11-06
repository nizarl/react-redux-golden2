import config from '../project.properties';

//The browser will always resolve window.location.hostname.  However, we supply localhost for Unit test purposes only.
const hostname = (window && window.location && window.location.hostname) || "localhost";

let envKey;
const domains = config.businessServiceBaseUrls.domains;

for (let [key, value] of Object.entries(domains)) { 
    if(value[0]===hostname){
        envKey = key;
    } 
  }

if(!envKey){
    throw new Error("Business service URL not found. Check project.properties.json file for correct config values.");
}

const apiUrl = config.businessServiceBaseUrls[envKey].careProAPI;

export const BASE_URL = apiUrl;
