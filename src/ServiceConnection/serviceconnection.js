import axios from "axios";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
const appauth_key = "dfoodo@2029";
let APL_LINK = "http://192.168.1.23:8000/";
APL_LINK = "https://dfoodobackend.triosoft.ai/";
let Website_URL = "https://www.dfoodo.com/";
let local_server_link_react = APL_LINK + "api/web_link/";
let local_server_link_back = APL_LINK + "api/admin_link/";

const get_blog_data_website =
  local_server_link_react + "get_blog_data_website/";
const blog_details_website = local_server_link_react + "blog_details_website/";
const get_categorypage_webapp =
  local_server_link_react + "get_categorypage_webapp/";
const get_all_faq_website = local_server_link_react + "get_all_faq_website/";
const save_restaurantOwnerdetails =
  local_server_link_react + "save_restaurantOwnerdetails/";
const save_favourite = local_server_link_react + "save_favourite/";
const update_profile = local_server_link_react + "update_profile/";
const get_profile = local_server_link_react + "get_profile/";
const get_filter_data = local_server_link_react + "get_filter_data/";
const get_restropage_webapp =
  local_server_link_react + "get_restropage_webapp/";
const get_landingpage_webapp =
  local_server_link_react + "get_landingpage_webapp/";

const get_all_timing_date_wise =
  local_server_link_back + "get_all_timing_date_wise";

const city_list = local_server_link_react + "city_list/";
const get_terms_privacy_data =
  local_server_link_react + "get_terms_privacy_data/";
const get_favourite = local_server_link_react + "get_favourite/";
const get_reservation_webapp =
  local_server_link_react + "get_reservation_webapp/";

const create_table_reservation_website =
  local_server_link_react + "create_table_reservation_website";
const customer_login = local_server_link_react + "guest_login/";
const save_like = local_server_link_react + "save_like/";
const save_review = local_server_link_react + "save_review/";
const update_notifiction_sms_status =
  local_server_link_react + "update_notifiction_sms_status/";
const cancel_booking = local_server_link_react + "cancel_booking/";
const get_seo_data_website = local_server_link_react + "get_seo_data_website/";
const get_search_bar = local_server_link_react + "get_search_bar/";
const customer_id = retrieveData("customer_id");
let country_name_take = retrieveData("country_main");
const country_name = country_name_take === "0" ? "India" : country_name_take;
let city_name_take = retrieveData("city_main");
const city_name = city_name_take === "0" ? "Bhopal" : city_name_take;

const server_post_data = async (url_for, form_data) => {
  // const headers = {
  //   "Content-Type": "application/json",
  // };
  if (form_data === null) {
    form_data = new FormData();
  }
  form_data.append("country", country_name);
  form_data.append("city", city_name);
  form_data.append("appauth_key", appauth_key);
  form_data.append("customer_id", customer_id);
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
  get_restropage_webapp,
  get_categorypage_webapp,
  get_profile,
  save_favourite,
  get_filter_data,
  get_all_timing_date_wise,
  create_table_reservation_website,
  customer_login,
  save_review,
  save_like,
  cancel_booking,
  update_notifiction_sms_status,
  get_seo_data_website,
  city_list,
  get_favourite,
  get_search_bar,
  get_terms_privacy_data,
  get_reservation_webapp,
};
