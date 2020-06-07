export const getServiceData = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(extractedRes => {
      return extractedRes;
    })
    .catch(err => {
      return null;
    });
  return response;
}