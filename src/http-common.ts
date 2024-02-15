import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
