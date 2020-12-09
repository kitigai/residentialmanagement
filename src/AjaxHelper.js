import * as axios from "axios";
// import { getCookie } from "./utils";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    // this.api_url = process.env.REACT_APP_API_ENDPOINT;
    this.api_url = "https://residentsmanagement.herokuapp.com";
  }

  init = () => {
    // this.api_token = getCookie("ACCESS_TOKEN");

    let headers = {
      Accept: "application/json"
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers
    });

    return this.client;
  };

  getResidents = (params) => {
    return this.init().get("/residents", { params: params });
  };

  getApartments = (data) => {
    return this.init().post("/apartment", data);
  };
}
