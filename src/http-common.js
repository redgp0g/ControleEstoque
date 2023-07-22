import axios from "axios";

export default axios.create({
  baseURL: "estoqueschwazapi.azurewebsites.net",
  headers: {
    "Content-type": "application/json"
  }
});