import LButton from "./LButton";
import {useSelector} from "react-redux";
import {BiArrowBack} from "react-icons/bi";
import React from "react";

export default function ForwardButton(props) {
  const index = useSelector((state) => state.counter.index)
  const sources = useSelector((state) => state.counter.sources)
  
  const isDisable = parseInt(index.toString()) === (sources.length - 1)

  console.log(index.toString(), sources.length)
  
  return (
    <LButton
      {...props}
      rightIcon={<BiArrowBack style={{transform: 'rotate(180deg)'}} size={30}/>}
      isDisabled={isDisable}
    >
    </LButton>
  )
}
