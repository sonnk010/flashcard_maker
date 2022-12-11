import React, { useEffect } from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { ChakraProvider } from '@chakra-ui/react'
import { Router } from "@reach/router"
import Flashcard from "./app/flash-card";
import Learning from "./app/learning";
import Cards from "./app/cards";
import { useDispatch } from "react-redux";
import { setSources } from "../features/runFlashCard";
import PrivateRoute from "../components/route/PrivateRoute";
import Home from "./home";
import { axiosClient } from "../utils/axios";
import {setCookie} from "../utils/cookie";

export default function IndexPage() {
  registerServiceWorker()
  return (
    <ChakraProvider>
      <Router>
        <PrivateRoute path="/" component={Home} default/>
        <PrivateRoute path="/app/flash-card/:courseId" component={Flashcard}/>
        <PrivateRoute path="/app/cards" component={Cards}/>
        <PrivateRoute path="/app/learning" component={Learning}/>
      </Router>
    </ChakraProvider>
  )
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
    navigator.serviceWorker.ready
      .then(function(registration) {
        return registration.pushManager.getSubscription();
      })
      .then(function(subscription) {
        if (!subscription) {
          subscribe();
        } else {
          console.log(
            JSON.stringify(subscription)
          );
        }
      });
  }
}

function subscribe() {
  navigator.serviceWorker.ready
    .then(function(registration) {
      const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    })
    .then(function(subscription) {
      console.log(
        JSON.stringify(subscription)
      );
      axiosClient.post("/user/subscribe-notification", {
        subscription: JSON.stringify(subscription),
      }).then((res) => {
        console.log("Subscription!")
      }).catch((err) => {
        console.log(err)
      })
    })
    .catch(err => console.error(err));
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
