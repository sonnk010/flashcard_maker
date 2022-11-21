import React, {useEffect, useState} from "react"
import FlipCard from "./FlipCard";
import {useInterval, Wrap, WrapItem, Progress, Text} from '@chakra-ui/react'
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
  setDelayFlip,
} from '../../features/runFlashCard'

export default function OverviewFlipCard(props) {
  const dispatch = useDispatch()

  const [delay, setDelay] = useState(8000)
  const isRepeated = true

  // ON/OFF
  const isPlaying = useSelector((state) => state.overviewFlashCard.isPlaying)
  const delayFlip = useSelector((state) => state.overviewFlashCard.delayFlip)
  const sources = useSelector((state) => state.overviewFlashCard.sources)
  const index = useSelector((state) => state.overviewFlashCard.index)
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms));

  useInterval(
    async () => {
      await dispatch(incrementInterval())
    },
    isPlaying ? delay : null,
  )

  useInterval(
    async () => {
      await dispatch(setFlip())
      if (delayFlip) {
        await dispatch(setEmptyFlashCard())
        await sleep(200)
        await dispatch(setDelayFlip(false))
        await dispatch(setFlashCardState())
      }
    },
    isPlaying ? delay - (delayFlip ? delay/2 : 0) : null,
  )


  useEffect(() => {
    dispatch(setDefaultFlashCard())
  }, )

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
      <Text textAlign={"center"}>
        {index + 1} / {sources.length}
      </Text>
      <Progress value={(((index + 1) / sources.length) * 100).toFixed()} size="xs" mb="4" />
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