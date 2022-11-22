import React from "react";
import Nav from "../nav/navbar";
import {Container} from '@chakra-ui/react'
import {Provider} from "react-redux";
import store from "../../store";

export default function BaseContainer({children}) {
  return (
    <Provider store={store}>
      <Nav/>
      <Container maxW='2lg' pt={20}>
        {children}
      </Container>
    </Provider>
  )
}