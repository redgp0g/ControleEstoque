import axios from "axios";

export default axios.create({
  baseURL: "https://estoqueschwarzapi20230720222040.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
  }
});