import React, {useEffect, useState} from "react"
import CardFlip from "./CardFlip";
import {useInterval, Wrap, WrapItem} from '@chakra-ui/react'
import StartStopButton from "../Button/StartStopButton";
import {useDispatch, useSelector} from "react-redux";
import ForwardButton from "../Button/ForwardButton";
import BackButton from "../Button/BackButton";

import {
  decrement,
  increment,
  incrementInterval,
  setDefaultFlashCard,
  setFlashCardState,
  setPlaying,
} from '../../features/runFlashCard'

export default function OverviewCardFlip(props) {
  const dispatch = useDispatch()

  const [delay, setDelay] = useState(5000)
  const isRepeated = true

  // ON/OFF
  const isPlaying = useSelector((state) => state.overviewFlashCard.isPlaying)

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
  }, [])

  console.log('render overview runner')

  const triggerPlaying = () => {
    dispatch(setPlaying())
  }

  const forward = () => {
    dispatch(increment())
    dispatch(setFlashCardState())
  }

  const back = () => {
    dispatch(decrement())
    dispatch(setFlashCardState())
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
          <BackButton onClick={back}/>
        </WrapItem>
        <WrapItem onClick={() => {
          triggerPlaying()
        }}>
          <StartStopButton/>
        </WrapItem>
        <WrapItem>
          <ForwardButton onClick={forward} isDisabled={true}/>
        </WrapItem>
      </Wrap>
    </>
  )
}