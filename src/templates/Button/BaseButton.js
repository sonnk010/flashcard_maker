import React from "react";
import {Button} from '@chakra-ui/react'

export default function BaseButton(props) {
  return (
    <Button
      {...props}
      size='md'
      border='2px'
      borderColor='blue.500'
    />
  )
}