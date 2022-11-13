import React from "react"
import {graphql} from "gatsby"
import {ChakraProvider} from '@chakra-ui/react'
import {Router, Link} from "@reach/router"
import Nav from "../components/nav/navbar";
import Flashcard from "../components/contents/body";
import Learning from "../components/contents/learning";

export default function IndexPage() {
  return (
    <ChakraProvider>
      <Nav/>
      <Router>
        <Flashcard path="/" default/>
        <Learning path="/learning"></Learning>
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