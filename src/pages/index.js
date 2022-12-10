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
  if (!('serviceWorker' in navigator)) {
    console.log("Service Worker isn't supported on this browser")
    return
  }

  if (!('PushManager' in window)) {
    console.log("Push isn't supported on this browser")
    return
  }

  return navigator.serviceWorker
    .register('/sw')
    .then(function (registration) {
      console.log('Service worker successfully registered.');
      console.log(registration)
      return registration;
    })
    .catch(function (err) {
      console.error('Unable to register service worker.', err);
    });

}