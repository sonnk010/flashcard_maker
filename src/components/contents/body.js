import React, {useEffect, useState} from "react"
import {graphql} from "gatsby"
import {ChakraProvider, Container, Wrap, WrapItem} from '@chakra-ui/react'
import CardFlip from "../../templates/CardFlip/CardFlip";

export default function Flashcard() {
  return (
    <Container maxW='2lg' pt={20}>
      <Wrap justifyContent={"center"} justify='center'>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
        <WrapItem>
          <CardFlip termi="Thuật ngữ" defi="Định nghĩa"/>
        </WrapItem>
      </Wrap>
    </Container>
  )
}