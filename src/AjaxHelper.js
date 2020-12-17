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

  postResidents = (query) => {
    return this.init().post("/residents", query);
  };
  putResidents = (query) => {
    return this.init().put("/residents", query);
  };
  getResidents = (query) => {
    return this.init().get("/residents", query);
  };
  getSingleResident = (id) => {
    return this.init().get("/residents/" + id, {});
  };
  deleteResident = (id) => {
    const query = { params: { id: id } };
    return this.init().delete("residents", query);
  };
  getApartments = (data) => {
    return this.init().get("/apartment", data);
  };
  postApartments = (data) => {
    return this.init().post("/apartment", data);
  };
  putApartments = (data) => {
    return this.init().put("/apartment", data);
  };
  deleteApartments = (id) => {
    const query = { params: { id: id } };
    return this.init().delete("/apartment", query);
  };
  postTransfer = (transferDate, transferAmount, residents_id) => {
    return this.init().post("/transfer", {
      transferDate: transferDate,
      transferAmount: transferAmount,
      residents_id: residents_id
    });
  };
  deleteTransfer = (id) => {
    const query = { params: { id: id } };
    return this.init().delete("/transfer", query);
  };
  postBilling = (billingDate, residents_id) => {
    return this.init().post("/billing", {
      billingDate: billingDate,
      residents_id: residents_id
    });
  };
}
