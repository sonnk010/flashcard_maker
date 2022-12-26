import { Badge, Box, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";

export default function ChildFlipCard({
  text,
  isFrontCard,
  internalWidths,
  internalHeights,
  isBroadways,
}) {

  const [fontSize, setFontSize] = useState("sm")

  const calFontSize = (text) => {
    if (text && text.length > 26) {
      return "xs"
    }
    return "sm"
  }
  return (
    <Box
      className={`card-face ${isFrontCard ? 'card-face-front' : (isBroadways ? 'card-face-back-broadway' : 'card-face-back')}`}
      borderWidth='1px'
      borderRadius='lg'
      borderColor='blue.500'
      overflow='hidden'
      boxShadow='base'
      bg={useColorModeValue(isFrontCard ? 'white' : 'whitesmoke', isFrontCard ? 'gray.900' : 'blackAlpha.600')}
      w={internalWidths}
      h={internalHeights}
    >
      <Box p='4'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
        </Box>
        <Box
          mt='3'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          <Text 
            textAlign={"center"}
            fontSize={calFontSize(text)}
            style={{overflow: "auto"}}
          >
            {text}
          </Text>
        </Box>

      </Box>
    </Box>
  )
}