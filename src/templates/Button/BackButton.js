import LButton from "./LButton";
import {useSelector} from "react-redux";
import {BiArrowBack} from "react-icons/bi";
import React from "react";

export default function BackButton(props) {
  const index = useSelector((state) => state.counter.index)
  const isDisable = parseInt(index.toString()) === 0

  return (
    <LButton
      {...props}
      rightIcon={<BiArrowBack size={30}/>}
      isDisabled={isDisable}
    >
    </LButton>
  )
}
