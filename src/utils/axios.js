import axios from "axios"
import { getCookie, setCookie } from "./cookie"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

export const axiosClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getCookie('token')
  }
})

axiosClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
      // handle error: inform user, go to login, etc
      navigate("/login/")
  } else {
      
  }
});
