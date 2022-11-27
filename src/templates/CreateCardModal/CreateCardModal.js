import React, { useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Lorem, ModalFooter, useDisclosure, Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import apolloClient from "../../graphql/apolloClient";
import { CREATE_CARD } from "../../graphql/mutations";
import { addSources } from "../../features/runFlashCard";

export default function CreateCardModal() {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [terminology, setTerminology] = useState("")
  const [definition, setDefinition] = useState("")
  const courseID = useSelector((state) => state.courses.courseId)


  const addCardGQL = async () => {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_CARD,
      variables: {
        courseID: courseID,
        terminology: terminology,
        definition: definition,
      }
    }).catch((err) => {
      console.log(err)
    })
    if (data) {
      dispatch(addSources(data.createCard))
      console.log(data);
    }
  }

  const addCard = async () => {
    await addCardGQL()
  }

  return (
    <>
      <Button onClick={onOpen}>Create Card</Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder='Terminology' value={terminology} onChange={(e) => { setTerminology(e.target.value) }}/>
            <Input placeholder='Definition' value={definition} mt="3" onChange={(e) => { setDefinition(e.target.value) }} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => {addCard()}}>Add Card</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
