import React from "react";
import Nav from "../nav/navbar";
import {Container} from '@chakra-ui/react'

export default function BaseContainer({children}) {
    return (
        <>
            <Nav/>
            <Container maxW='2lg' pt={20}>
                {children}
            </Container>
        </>
    )
}