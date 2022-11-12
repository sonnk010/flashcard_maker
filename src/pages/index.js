import React from "react"
import {graphql} from "gatsby"
import {ChakraProvider} from '@chakra-ui/react'
import {Router, Link} from "@reach/router"
import Nav from "../components/nav/navbar";
import Flashcard from "../components/contents/body";

export default function IndexPage() {
  return (
    <ChakraProvider>
      <Nav/>
      <Router>
        <Flashcard path="/" default/>
      </Router>
    </ChakraProvider>
  )
}

export const query = graphql`
  query{
  directory {
    sourceInstanceName
  }
}`