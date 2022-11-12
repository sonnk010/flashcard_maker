import React, {useState} from "react"
import './style.css'
import {Box, Image, Badge, useColorModeValue} from '@chakra-ui/react'
import ChildCardFlip from "./ChildCardFlip";

export default function CardFlip(props) {
  // terminology
  // definition

  const [isFlipped, setFlipped] = useState(false)
  const flip = () => {
    console.log(isFlipped)
    setFlipped(!isFlipped)
  }
  return (
    <>
      <Box className="scene" w={[80,200, 200, 200, 200, 200]}>
        <div className={`card ${isFlipped ? "is-flipped" : ""}`} onClick={flip}>
          <ChildCardFlip isFrontCard={true} text={props.termi}/>
          <ChildCardFlip isFrontCard={false} text={props.defi}/>
        </div>
      </Box>
    </>
  )
}