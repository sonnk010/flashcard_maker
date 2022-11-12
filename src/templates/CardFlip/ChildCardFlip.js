import {Badge, Box, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";

export default function ChildCardFlip(props) {
  return (
    <Box
      className={`card-face ${props.isFrontCard ? 'card-face-front' : 'card-face-back' }`}
      maxW='sm'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='base'
      bg={useColorModeValue('white', props.isFrontCard ? 'gray.900' : 'blackAlpha.600')}
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
          <Text textAlign={"center"}>
            {props.text}
          </Text>
        </Box>

      </Box>
    </Box>
  )
}