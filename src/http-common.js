import axios from "axios";

export default axios.create({
  baseURL: "https://estoqueschwazapi.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
  }
});