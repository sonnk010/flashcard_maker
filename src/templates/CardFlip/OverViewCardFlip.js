import React, {useEffect, useState} from "react"
import CardFlip from "./CardFlip";
import {useInterval, Wrap, WrapItem} from '@chakra-ui/react'
import LButton from "../Button/LButton";
import {BiArrowBack} from "react-icons/bi"
import StartStopButton from "../Button/StartStopButton";
import {useDispatch} from "react-redux";
import {
  decrement,
  increment,
  incrementInterval,
  setDefaultFlashCard,
  setFlashCardState
} from '../../features/runFlashCard'

export default function OverViewCardFlip(props) {
  const dispatch = useDispatch()

  const [delay, setDelay] = useState(5000)

  // ON/OFF
  const [isPlaying, setPlaying] = useState(false)

  useInterval(
    () => {
      // Your custom logic here
      dispatch(incrementInterval())
      dispatch(setFlashCardState())
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null,
  )


  useEffect(() => {
    dispatch(setDefaultFlashCard())
  })

  console.log('render overview')

  const isRepeated = true

  const triggerPlaying = (isPlaying) => {
    setPlaying(!isPlaying)
  }

  const forward = () => {
    dispatch(increment)
    dispatch(setFlashCardState)
  }

  const back = () => {
    dispatch(decrement)
    dispatch(setFlashCardState)
  }

  return (
    <>
      <Wrap justifyContent={"center"} justify='center'>
        <WrapItem>
          <CardFlip
            heights={[200, 330, 600]}
            widths={[300, 400, 500, 800]}
            isBroadways={true}
          />
        </WrapItem>
      </Wrap>
      <Wrap justifyContent={"center"} justify='center' mt={5}>
        <WrapItem>
          <LButton rightIcon={<BiArrowBack size={30}/>} onClick={back}>
          </LButton>
        </WrapItem>
        <WrapItem onClick={() => {
          triggerPlaying(isPlaying)
        }}>
          <StartStopButton/>
        </WrapItem>
        <WrapItem>
          <LButton rightIcon={<BiArrowBack style={{transform: 'rotate(180deg)'}} size={30} onClick={() => {
            forward()
          }}/>}>
          </LButton>
        </WrapItem>
      </Wrap>
    </>
  )
}