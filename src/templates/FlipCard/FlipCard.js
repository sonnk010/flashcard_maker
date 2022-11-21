import React from "react"
import './style.css'
import {Box} from '@chakra-ui/react'
import ChildFlipCard from "./ChildFlipCard";
import {useDispatch, useSelector} from "react-redux";
import {
  setFlip
} from '../../features/runFlashCard'

export default function FlipCard(
  {
    widths,
    heights,
    isBroadways,
  }) {
  // terminology
  // definition
  const termi = useSelector((state) => state.overviewFlashCard.termi)
  const defi = useSelector((state) => state.overviewFlashCard.defi)
  const isFlip = useSelector((state) => state.overviewFlashCard.isFlip)
  
  const dispatch = useDispatch()
  
  const flip = () => {
    dispatch(setFlip())
  }

  let internalWidths = widths
  let internalHeights = heights

  if (!widths) {
    internalWidths = [80, 200, 200, 200, 200, 200]
  }

  if (!heights) {
    internalHeights = [300, 250, 250, 250, 250, 300]
  }

  return (
    <>
      <Box
        className={isBroadways ? 'scene-broadway' : 'scene'}
        w={internalWidths}
        h={internalHeights}>
        <div className={`card ${isFlip ? (isBroadways ? "is-flipped-broadway" : "is-flipped") : ""}`} onClick={flip}>
          <ChildFlipCard
            isFrontCard={true}
            text={termi}
            w={internalWidths}
            h={internalHeights}
            isBroadways={isBroadways}
            key={1}
          />
          <ChildFlipCard
            isFrontCard={false}
            text={defi}
            w={internalWidths}
            h={internalHeights}
            isBroadways={isBroadways}
            key={2}
          />
        </div>
      </Box>
    </>
  )
}