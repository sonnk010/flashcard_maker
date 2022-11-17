import React from "react";
import LButton from "./LButton";
import {MdOutlinePauseCircleFilled} from "react-icons/md"
import {VscDebugStart} from "react-icons/vsc"
import { useSelector } from "react-redux";

export default function StartStopButton(props) {
  const isPlaying = useSelector((state) => state.overviewFlashCard.isPlaying)
  return (
    <LButton
      {...props}
      rightIcon={isPlaying ? <MdOutlinePauseCircleFilled size={30}/> : <VscDebugStart size={30}/>}
    >

    </LButton>
  )
}