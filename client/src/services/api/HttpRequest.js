import axios from 'axios';

const client = axios.create({
  baseURL: "http://localhost:5000/"
});

/**
 * Request Wrapper with default success/error actions
 */
const HttpRequest = function (options) {
  const onSuccess = function(response) {
    console.debug("Request successful!", response);
    return response.data;
  };

  const onError = function(error) {
    console.error("Request failed:", error.config);
    if(error.response) {
      console.error("Status: ", error.response.status);
      console.error("Data", error.response.data);
      console.error("Headers: ", error.response.headers);
    } else {
      console.error("Error message: ", error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default HttpRequest;