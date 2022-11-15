import React, {useState} from "react";
import LButton from "./LButton";
import {MdOutlinePauseCircleFilled} from "react-icons/md"
import {VscDebugStart} from "react-icons/vsc"
import {useDispatch, useSelector} from "react-redux";
import {
  setPlaying,
} from '../../features/runFlashCard'

export default function StartStopButton(props) {
  const dispatch = useDispatch()
  const isPlaying = useSelector((state) => state.overviewFlashCard.isPlaying)
  return (
    <LButton
      {...props}
      rightIcon={isPlaying ? <MdOutlinePauseCircleFilled size={30}/> : <VscDebugStart size={30}/>}
    >

    </LButton>
  )
}