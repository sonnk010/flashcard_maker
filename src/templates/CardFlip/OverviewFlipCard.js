import React, {useEffect, useState} from "react"
import FlipCard from "./FlipCard";
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
  setEmptyFlashCard,
  setFlashCardState, 
  setFlip,
  setPlaying,
  setSkipFlip,
} from '../../features/runFlashCard'

export default function OverviewFlipCard(props) {
  const dispatch = useDispatch()

  const [delay, setDelay] = useState(8000)
  const isRepeated = true

  // ON/OFF
  const isPlaying = useSelector((state) => state.overviewFlashCard.isPlaying)
  const skipFlip = useSelector((state) => state.overviewFlashCard.skipFlip)

  useInterval(
    async () => {
      await dispatch(incrementInterval())
      await dispatch(setFlashCardState())
    },
    isPlaying ? delay : null,
  )

  useInterval(
    async () => {
      await dispatch(setFlip())
      if (skipFlip) {
        await dispatch(setEmptyFlashCard())
        await dispatch(setFlashCardState())
      }
      await dispatch(setSkipFlip())
    },
    isPlaying ? delay/2 : null,
  )


  useEffect(() => {
    dispatch(setDefaultFlashCard())
  }, [])

  console.log('render overview runner')

  const triggerPlaying = () => {
    dispatch(setPlaying())
  }

  const forward = async () => {
    await dispatch(setPlaying(false))
    await dispatch(increment())
    await dispatch(setFlashCardState())
  }

  const back = async () => {
    await dispatch(setPlaying(false))
    await dispatch(decrement())
    await dispatch(setFlashCardState())
  }

  return (
    <>
      <Wrap justifyContent={"center"} justify='center'>
        <WrapItem>
          <FlipCard
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