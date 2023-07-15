import axios from "axios";

const API_URL = "http://localhost:5000/user/";

export const register = (username, email, password) => {
    return axios.post(API_URL + "userRegister", {
      username,
      email,
      password,
    });
  };
  
  export const login = (username, password) => {
    return axios
      .post(API_URL + "userLogin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        return response.data;
      });
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
  };