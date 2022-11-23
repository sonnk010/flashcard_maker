import React, { useEffect } from "react"
import { Link, useStaticQuery, graphql, navigate } from 'gatsby'
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
  const dispatch = useDispatch()
  let data = useStaticQuery(graphql`
    query {
      swapi {
        countries {
          name
          emoji
          languages {
            name
            native
          }
        }
      }
    }
  `)

  useEffect(() => {
    const sourcesTemp = []
    for (let item of data['swapi']['countries']) {
      sourcesTemp.push({
        defi: item.name,
        termi: item.emoji
      })
    }

    dispatch(setSources(sourcesTemp))
  }, )

  return (
    <ChakraProvider>
      <Router>
        <PrivateRoute path="/" component={Home} default/>
        <PrivateRoute path="/app" component={Flashcard}/>
        <PrivateRoute path="/app/cards" component={Cards}/>
        <PrivateRoute path="/app/learning" component={Learning}/>
      </Router>
    </ChakraProvider>
  )
}