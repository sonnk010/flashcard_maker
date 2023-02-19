import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../templates/FlipCard/Card";
import { Button, Wrap, WrapItem } from '@chakra-ui/react'
import BaseContainer from "../../components/contents/BaseContainer";
import CreateCardModal from "../../templates/CreateCardModal/CreateCardModal";
import { GET_CARDS_WITH_CURSOR } from "../../gatsby-plugin-apollo/queries";
import { useQuery } from "@apollo/client";
import useInfiniteScroll from "../../services/hook";

export default function Cards(props) {
  const courseId = useSelector((state) => state.courses.courseId)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const { data, loading, observable } = useQuery(
    GET_CARDS_WITH_CURSOR,
    {
      variables: {
        input: {
          courseID: courseId,
          pagination: {
            limit: 20
          }
        }
      }
    }
  )

  const c = useQuery(
    GET_CARDS_WITH_CURSOR,
    {
      variables: {
        input: {
          courseID: courseId,
          pagination: {
            limit: 20
          }
        }
      }
    }
  )

  function fetchMoreListItems() {
    try {
      if (!data.getCardsWithCursor.pageInfo.hasNextPage) return;
      observable.fetchMore({
        variables: {
          input: {
            courseID: courseId,
            pagination: {
              cursor: data.getCardsWithCursor.data[data.getCardsWithCursor.data.length - 1].id,
              limit: 20
            }
          }
        }
      })
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <div>loading</div>

  return (
    <BaseContainer>
      <CreateCardModal></CreateCardModal>
      <Wrap>
        {data.getCardsWithCursor.data.map((data) =>
          <WrapItem p="1" key={data.id}>
            <Card
              terminology={data.terminology}
              definition={data.definition}
              key={data.id}
            />
          </WrapItem>
        )}
      </Wrap>
    </BaseContainer>
  )
}