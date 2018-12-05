import {
  CONFIG
} from './conf.js';
let DEV_URL = 'https://api.nieniepet.com/api';
let PRO_URL = 'https://api.nieniepet.com/api';
let BASE_URL = CONFIG.enviroment == 'dev' ? DEV_URL : PRO_URL;
export const API = {
  LOGIN: `${BASE_URL}/login`,
  VIDEO_LIST: `${BASE_URL}/videos`,
  GET_VIDEO: `${BASE_URL}/video/{id}`,
  RESTORE_VIDEO: `${BASE_URL}/video/{id}/restore`,
  VIEW_VIDEO: `${BASE_URL}/video/{id}/view`,
  ABOUT: `${BASE_URL}/video/{id}/about`,
  VIEW_LIST: `${BASE_URL}/views`,
  RESTORE_LIST: `${BASE_URL}/restores`
};