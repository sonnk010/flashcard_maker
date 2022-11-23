import { navigate } from 'gatsby'
import { axiosClient } from "../utils/axios";
import { deleleCookie } from "../utils/cookie";

export const isLoggedIn = () => {
  axiosClient.post("check-login").then((res) => {
    // do nothing
  }).catch((err) => {
    console.log(err)
    deleleCookie("token")
    navigate("/login")
  })
  return true
}