import React, { useEffect, useState } from "react";
import BaseContainer from "../components/contents/BaseContainer";
import apolloClient from "../graphql/apolloClient";
import { GET_COURSES } from "../graphql/queries";
import {
  Box,
  Text
} from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { setCourseID } from "../features/courses";
import { Link } from "gatsby";

export default function Home() {
  const dispatch = useDispatch()
  const [courses, setCourses] = useState([])

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
    console.log("id");
    console.log(id);
    dispatch(setCourseID(id))
  }

  return (
    <BaseContainer>
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