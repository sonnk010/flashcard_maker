import axios from "axios"
import { getCookie, setCookie } from "./cookie"
export const axiosClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getCookie('token')
  }
})