import axios from "axios";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
const appauth_key = "logoacedamy@2029";
let APL_LINK = "http://192.168.1.23:8000/";
let Website_URL = "https://www.logoacademy.co/";
let local_server_link_react = APL_LINK + "websitebackend/";

const retrievedAdminId = retrieveData("admin_id");

const server_post_data = async (url_for, form_data) => {
  // const headers = {
  //   "Content-Type": "application/json",
  // };

  if (form_data === null) {
    form_data = new FormData();
  }
  form_data.append("appauth_key", appauth_key);
  if (form_data.get("data_call") !== null) {
    form_data.append("call_id", retrievedAdminId);
  }
  return axios.post(url_for, form_data);
};

export {
  APL_LINK,
  Website_URL,
  appauth_key,
  server_post_data,
};
