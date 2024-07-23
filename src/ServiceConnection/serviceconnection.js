import axios from "axios";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
const appauth_key = "logoacedamy@2029";
let APL_LINK = "http://192.168.1.8:8000/";
let Website_URL = "https://www.logoacademy.co/";
let local_server_link_react = APL_LINK + "api/web_link/";

const retrievedAdminId = retrieveData("admin_id");
const get_blog_data_website =
  local_server_link_react + "get_blog_data_website/";
const blog_details_website = local_server_link_react + "blog_details_website/";
const get_all_faq = local_server_link_react + "get_all_faq/";
const save_restaurantOwnerdetails =
  local_server_link_react + "save_restaurantOwnerdetails/";

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
  get_blog_data_website,
  blog_details_website,
  get_all_faq,
  save_restaurantOwnerdetails,
};
