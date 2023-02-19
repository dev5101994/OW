import axios from "axios";
import { Base_URL } from "../../utils/serverUrl";

export const SignUpApi = async (data) => {
  var config = {
    method: "post",
    url: `${Base_URL}register`,
    data: data,
  };

  var result = await axios(config)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
  return result;
};
export const LoginApi = async (data) => {
  var config = {
    method: "post",
    url: `${Base_URL}login`,
    data: data,
  };

  var result = await axios(config)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
  return result;
};
