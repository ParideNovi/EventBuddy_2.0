// use fetch to make call to our REST API
// could also use axios npm package
import { CSRF_TOKEN } from "./csrf_token.js";

async function getJSON(response) {
  if (response.status === 204) return ""; // example when delete a resource
  return response.json();
}
//generic code for all the different request to our API
function apiService(endpoint, method, data) {
  const config = {
    method: method || "GET", //method = method(if exist) OR method = GET
    body: data !== undefined ? JSON.stringify(data) : null, // if data !== undef then body=JSON.. else body:null
    headers: {
      //generic headers of a request
      "content-type": "application/json", //exept img
      "X-CSRFToken": CSRF_TOKEN
    }
  };
  return fetch(endpoint, config) //use fetch (generic request HTTP)
    .then(getJSON)
    .catch(error => console.log(error));
}

export { apiService };
