import React, { useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { ChakraProvider } from '@chakra-ui/react'
import { Router } from "@reach/router"
import Flashcard from "../components/contents/body";
import Learning from "./learning";
import Cards from "./cards";
import { useDispatch } from "react-redux";
import { setSources } from "../features/runFlashCard";

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
        <Flashcard path="/" default/>
        <Cards path="/cards"/>
        <Learning path="/learning"/>
      </Router>
    </ChakraProvider>
  )
}