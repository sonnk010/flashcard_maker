import React, {useEffect, useState} from "react"
import FlipCard from "./FlipCard";
import {useInterval, Wrap, WrapItem, Progress, Text, Button} from '@chakra-ui/react'
import StartStopButton from "../Button/StartStopButton";
import {useDispatch, useSelector} from "react-redux";
import ForwardButton from "../Button/ForwardButton";
import BackButton from "../Button/BackButton";
import {FaRandom} from "react-icons/fa";
import {TbArrowsRight} from "react-icons/tb";


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
  setSources,
  setUseShuffledSources,
  setRootSources,
  shuffle,
} from '../../features/runFlashCard'
import {GET_CARDS} from "../../graphql/queries";
import apolloClient from "../../graphql/apolloClient";

export default function OverviewFlipCard(props) {
  const dispatch = useDispatch()

  const [delay, setDelay] = useState(8000)
  const isRepeated = true

  // ON/OFF
  const isPlaying = useSelector((state) => state.overviewFlashCard.isPlaying)
  const delayFlip = useSelector((state) => state.overviewFlashCard.delayFlip)
  const sources = useSelector((state) => state.overviewFlashCard.sources)
  const index = useSelector((state) => state.overviewFlashCard.index)
  const useShuffledSources = useSelector((state) => state.overviewFlashCard.useShuffledSources)
  const rootSources = useSelector((state) => state.overviewFlashCard.rootSources)
  const courseID = useSelector((state) => state.courses.courseId)

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

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
        await sleep(250)
        await dispatch(setDelayFlip(false))
        await dispatch(setFlashCardState())
      }
    },
    isPlaying ? delay - (delayFlip ? delay / 2 : 0) : null,
  )


  useEffect(() => {
    dispatch(setDefaultFlashCard())
  },)

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
  
  const switchShuffledSources = async () => {
    dispatch(setUseShuffledSources(!useShuffledSources))
    if (useShuffledSources) {
      dispatch(shuffle())
    } else {
      dispatch(setSources(rootSources))
    }
  }

  // setup cards
  const fetchCards = async () => {
    const {loading, error, data} = await apolloClient.query({
      query: GET_CARDS,
      variables: {
        courseID: courseID
      }
    }).catch((err) => {
      console.log(err)
    })
    if (data) {
      dispatch(setSources([...data.getCards]))
      dispatch(setRootSources([...data.getCards]))
    }
  };

  useEffect(() => {
    if (courseID !== undefined || courseID != "") {
      fetchCards()
    }
  }, [courseID])

  return (
    <>
      <Text textAlign={"center"}>
        {index + 1} / {sources.length}
      </Text>
      <Progress value={(((index + 1) / sources.length) * 100).toFixed()} size="xs" mb="4"/>
      <Wrap justifyContent={"center"} justify='center'>
        <WrapItem>
          <FlipCard
            heights={[200, 330, 500]}
            widths={[300, 400, 500, 800]}
            isBroadways={true}
          />
        </WrapItem>
      </Wrap>
      <Wrap justifyContent={"center"} justify='center' mt={5}>
        <WrapItem>
          <Button
            {...props}
            size='sm'
            border='1px'
            borderColor='blue.500'
            rightIcon={useShuffledSources ? <FaRandom size={24}/> : <TbArrowsRight size={24}/>}
            mt="2"
            color="white"
            onClick={switchShuffledSources}
          />
        </WrapItem>
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