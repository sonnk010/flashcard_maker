import React, { useEffect, useState } from "react";
import BaseContainer from "../components/contents/BaseContainer";
import client from "../gatsby-plugin-apollo/client";
import { GET_COURSES } from "../gatsby-plugin-apollo/queries";
import { CREATE_CARD_FROM_CLIPBOARD } from "../gatsby-plugin-apollo/mutations";
import { Button, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Lorem, ModalFooter, useDisclosure, Input, useToast } from '@chakra-ui/react'
import { useDispatch } from "react-redux";
import { setCourseID } from "../features/courses";
import { Link } from "gatsby";
import CourseCard from "../templates/Course/CourseCard";

export default function Home() {
  const dispatch = useDispatch()
  const toast = useToast()
  const [courses, setCourses] = useState([])
  const [nameCourse, setNameCourse] = useState("")
  const [descriptionCourse, setDescriptionCourse] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getResponse = async () => {
    const { loading, error, data } = await client.query({
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
      const { data } = await client.mutate({
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
      <Button onClick={onOpen}>Import cards from clipboard!</Button>
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
        <CourseCard data={item}></CourseCard>
      )}


    </BaseContainer>
  )
}