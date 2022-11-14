import React from "react";
import BaseButton from "./BaseButton";

export default function LButton(props) {
  return (
    <BaseButton
      height='48px'
      width='200px'
      colorScheme='teal'
      variant='outline'
      {...props}
    />
  )
}