import React, {useState} from "react"
import './style.css'
import {Box} from '@chakra-ui/react'
import ChildCardFlip from "./ChildCardFlip";
import {useSelector} from "react-redux";

export default function CardFlip({
                                   widths,
                                   heights,
                                   isBroadways,
                                 }) {
  // terminology
  // definition
  const termi = useSelector((state) => state.overviewFlashCard.termi)
  const defi = useSelector((state) => state.overviewFlashCard.defi)

  console.log("render CardFlip")

  const [isFlipped, setFlipped] = useState(false)
  const flip = () => {
    setFlipped(!isFlipped)
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
        <div className={`card ${isFlipped ? (isBroadways ? "is-flipped-broadway" : "is-flipped") : ""}`} onClick={flip}>
          <ChildCardFlip
            isFrontCard={true}
            text={termi}
            w={internalWidths}
            h={internalHeights}
            isBroadways={isBroadways}
            key={1}
          />
          <ChildCardFlip
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