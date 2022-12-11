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
import Reminder from "./app/reminder";

export default function IndexPage() {
  return (
    <ChakraProvider>
      <Router>
        <PrivateRoute path="/" component={Home} default/>
        <PrivateRoute path="/app/flash-card/:courseId" component={Flashcard}/>
        <PrivateRoute path="/app/cards" component={Cards}/>
        <PrivateRoute path="/app/learning" component={Learning}/>
        <PrivateRoute path="/app/reminder" component={Reminder}/>
      </Router>
    </ChakraProvider>
  )
}


