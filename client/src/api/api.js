// api.js

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://olx-fargo.onrender.com",
  // Add other configurations if needed, like headers, timeouts, etc.
});

export default apiClient;
