import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import Card from "../../templates/FlipCard/Card";
import { Button, Wrap, WrapItem } from '@chakra-ui/react'
import BaseContainer from "../../components/contents/BaseContainer";
import CreateCardModal from "../../templates/CreateCardModal/CreateCardModal";
import { GET_CARDS_WITH_CURSOR } from "../../gatsby-plugin-apollo/queries";
import { useQuery } from "@apollo/client";

export default function Cards(props) {
  const courseId = useSelector((state) => state.courses.courseId)
  const {data, loading, observable} = useQuery(
    GET_CARDS_WITH_CURSOR,
    {
      variables: {
        input: {
          courseID: courseId,
          pagination: {
            limit: 10
          }
        }
      }
    }
  )

  if (loading) return <div>loading</div>

  const fmore = () => {
    try {
      observable.fetchMore({
        variables: {
          input: {
          courseID: courseId,
          pagination: {
            cursor: data.getCardsWithCursor.data[data.getCardsWithCursor.data.length - 1].id,
            limit: 10
          }
        }
        }
      })
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <BaseContainer>
      <CreateCardModal></CreateCardModal>
      <Wrap>
        {data.getCardsWithCursor.data.map((data) =>
          <WrapItem p="1" key={data.id}>
            <Card
              terminology={data.terminology}
              definition={data.definition}
            />
          </WrapItem>
        )}
      </Wrap>
      <Button onClick={fmore}>
        vvv
      </Button>
    </BaseContainer>
  )
}