import React, { useEffect, useState } from "react";
import BaseContainer from "../components/contents/BaseContainer";
import apolloClient from "../graphql/apolloClient";
import { GET_COURSES } from "../graphql/queries";
import { CREATE_CARD_FROM_CLIPBOARD } from "../graphql/mutations";
import { Button, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Lorem, ModalFooter, useDisclosure, Input, useToast } from '@chakra-ui/react'
import { useDispatch } from "react-redux";
import { setCourseID } from "../features/courses";
import { Link } from "gatsby";

export default function Home() {
  const dispatch = useDispatch()
  const toast = useToast()
  const [courses, setCourses] = useState([])
  const [nameCourse, setNameCourse] = useState("")
  const [descriptionCourse, setDescriptionCourse] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getResponse = async () => {
    const { loading, error, data } = await apolloClient.query({
      query: GET_COURSES,
    })
    if (data) {
      setCourses([...data.getCourses])
    }
  };

  useEffect(() => {
    getResponse()
  }, [])

  const setCourse = (id) => {
    dispatch(setCourseID(id))
  }
  
  const importCardFromClipboard = async () => {
    let text = await navigator.clipboard.readText();
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CARD_FROM_CLIPBOARD,
        variables: {
          name: nameCourse,
          description: descriptionCourse,
          text: text
        }
      })
      if (data) {
        toast({
          title: `Import is finished`,
          variant: ['solid', 'subtle', 'left-accent', 'top-accent'],
          isClosable: true,
          position: "bottom",
          status: "success",
        })
        console.log(data);
        return
      }
    } catch(err) {
      console.log(err)
      toast({
        title: `Import is failed, please check input and try again`,
        variant: ['solid', 'subtle', 'left-accent', 'top-accent'],
        isClosable: true,
        position: "bottom",
        status: "error",
      })
      return
    } finally {
      onClose()
    }
    
  }

  return (
    <BaseContainer>
      <Button onClick={onOpen}>Import card from clipboard!</Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import cards from clipboard!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder='Name Course' value={nameCourse} onChange={(e) => { setNameCourse(e.target.value) }} />
            <Input placeholder='Description Course' value={descriptionCourse} mt="3" onChange={(e) => { setDescriptionCourse(e.target.value) }} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={importCardFromClipboard}>Create Course</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
      {courses.map((item) => 
        <Link to={`/app/flash-card/${item.id}/`} key={item.id} onClick={() => {setCourse(item.id)}}>
          <Box pt="5" key={item.id}>
            <Text>Name Course: {item.name}</Text>
            <Text>Description: {item.description}</Text>
          </Box>
        </Link>
      )}

    </BaseContainer>
  )
}