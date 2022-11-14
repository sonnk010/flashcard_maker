import React from "react"
import {graphql} from "gatsby"
import {ChakraProvider, Container} from '@chakra-ui/react'
import {Router} from "@reach/router"
import Nav from "../components/nav/navbar";
import Flashcard from "../components/contents/body";
import Learning from "./learning";
import {Provider} from 'react-redux'
import store from '../store'

export default function IndexPage() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Nav/>
        <Container maxW='2lg' pt={20}>
          <Router>
            <Flashcard path="/" default/>
            <Learning path="/learning"></Learning>
          </Router>
        </Container>
      </ChakraProvider>
    </Provider>
  )
}

export const query = graphql`
  query{
  directory {
    sourceInstanceName
  }
}`