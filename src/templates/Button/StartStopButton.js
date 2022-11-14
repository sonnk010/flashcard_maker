import React, {useState} from "react";
import LButton from "./LButton";
import {MdOutlinePauseCircleFilled} from "react-icons/md"
import {VscDebugStart} from "react-icons/vsc"

export default function StartStopButton(props) {
  const [isStart, setIsStart] = useState(false)
  const changeIcon = (isStart) => {
    setIsStart(!isStart)
  }
  return (
    <LButton
      {...props}
      rightIcon={isStart ? <MdOutlinePauseCircleFilled size={30}/> : <VscDebugStart size={30}/>}
      onClick={() => {
        changeIcon(isStart)
      }}
    >

    </LButton>
  )
}