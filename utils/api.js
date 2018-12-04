import {
  CONFIG
} from './conf.js';
let DEV_URL = 'https://api.nieniepet.com/api';
let PRO_URL = 'https://api.nieniepet.com/api';
let BASE_URL = CONFIG.enviroment=='dev'?DEV_URL:PRO_URL;
export const API = {
  VIDEO_LIST: `${BASE_URL}/videos`,
  GET_VIDEO: `${BASE_URL}/video/{id}`,
  RESTORE: `${BASE_URL}/video/{id}/restore`,
  ABOUT: `${BASE_URL}/video/{id}/about`
};