import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiKey } from "./constants";
export default class HttpService {
  constructor() {
    this.BaseUrl;
  }

  async GetAsync(url) {
    let requestSettings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: "Bearer " + await AsyncStorage.getItem("token"),

      },
    };
    this.BaseUrl = await AsyncStorage.getItem("ip");
    const response = await fetch(`${this.BaseUrl}${url}`, requestSettings);

    try {
      return await response.json();
    } catch (e) {
      return response.statusText;
    }
  }
  async PostAsync(url, data) {
    let requestSettings = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: "Bearer " + await AsyncStorage.getItem("token"),
      },
    };

    this.BaseUrl = await AsyncStorage.getItem("ip");
    const response = await fetch(`${this.BaseUrl}${url}`, requestSettings);

    try {
      return await response.json();
    } catch (e) {
      return response.statusText;
    }
  }
  async PutAsync(url, data) {
    let requestSettings = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: "Bearer " + await AsyncStorage.getItem("token"),
      },
    };

    this.BaseUrl = await AsyncStorage.getItem("ip");
    const response = await fetch(`${this.BaseUrl}${url}`, requestSettings);

    try {
      return await response.json();
    } catch (e) {
      return response.statusText;
    }
  }
  async DeleteAsync(url) {
    let requestSettings = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: "Bearer " + await AsyncStorage.getItem("token"),

      },
    };

    this.BaseUrl = await AsyncStorage.getItem("ip");
    const response = await fetch(`${this.BaseUrl}${url}`, requestSettings);

    try {
      return await response.json();
    } catch (e) {
      return response.statusText;
    }
  }
}
