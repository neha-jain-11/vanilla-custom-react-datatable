const axios = require("axios");

export const getServiceData = async (url) => {
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(extractedRes => {
      return extractedRes.data;
    })
    .catch(err => {
      return null;
    });
  return response;
}