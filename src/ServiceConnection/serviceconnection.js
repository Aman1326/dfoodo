import axios from "axios";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
const appauth_key = "logoacedamy@2029";
let APL_LINK = "http://192.168.1.11:8000/";
let Website_URL = "https://www.logoacademy.co/";
let local_server_link_react = APL_LINK + "api/web_link/";

const retrievedAdminId = retrieveData("admin_id");
const get_blog_data_website =
  local_server_link_react + "get_blog_data_website/";
const blog_details_website = local_server_link_react + "blog_details_website/";
const get_all_faq_website = local_server_link_react + "get_all_faq_website/";
const save_restaurantOwnerdetails =
  local_server_link_react + "save_restaurantOwnerdetails/";
const update_profile = local_server_link_react + "update_profile/";
const get_profile = local_server_link_react + "get_profile/";
const get_favourite = local_server_link_react + "get_favourite/";
const get_restropage_webapp =
  local_server_link_react + "get_restropage_webapp/";
const get_landingpage_webapp =
  local_server_link_react + "get_landingpage_webapp/";

const imageApi = APL_LINK + "assets/";

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
  get_all_faq_website,
  save_restaurantOwnerdetails,
  update_profile,
  get_landingpage_webapp,
  imageApi,
  get_restropage_webapp,
  get_profile,
  get_favourite,
};
