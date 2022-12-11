import { ChakraProvider, FormControl, FormLabel, Input, FormHelperText, Stack, Switch, Wrap, Select, Container} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BaseContainer from "../../components/contents/BaseContainer";
import apolloClient from "../../graphql/apolloClient";
import { GET_COURSES } from "../../graphql/queries";
import { axiosClient } from "../../utils/axios";

export default function Reminder() {
  const [subscribeState, setSubscribeState] = useState(true)
  const [courses, setCourses] = useState([])

  const fetchCourses = async () => {
    const { loading, error, data } = await apolloClient.query({
      query: GET_COURSES,
    })
    if (data) {
      setCourses([...data.getCourses])
    }
  };


  useEffect( async () => {
    await registerServiceWorker()
    await fetchCourses()
  }, [])

  const onSwitchChange = () => {
    setSubscribeState(!subscribeState)
    console.log(subscribeState);
  }

  return (
    <BaseContainer>
      <Container>
        <FormControl>
          <Wrap mb="3">
            <FormLabel>Active Reminder</FormLabel>
            <Stack align='center' direction='row'>
              <Switch size='lg' id='subscribeState' onChange={onSwitchChange}/>
            </Stack>
          </Wrap>
          
          <FormLabel mt="3" >Course</FormLabel>
          <Select placeholder='All'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>

          <FormLabel mt="3" >Time to remind</FormLabel>
          <Select value="option1">
            <option value='option1' default>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>

        </FormControl>
      </Container>
    </BaseContainer>
  );
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
    return navigator.serviceWorker.ready
      .then(function (registration) {
        return registration.pushManager.getSubscription();
      })
      .then(function (subscription) {
        if (!subscription) {
          subscribe();
        } else {
          console.log(
            JSON.stringify(subscription)
          );
        }
      });
  }
}

function subscribe() {
  navigator.serviceWorker.ready
    .then(function (registration) {
      const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    })
    .then(function (subscription) {
      console.log(
        JSON.stringify(subscription)
      );
      axiosClient.post("/user/subscribe-notification", {
        subscription: JSON.stringify(subscription),
      }).then((res) => {
        console.log("Subscription!")
      }).catch((err) => {
        console.log(err)
      })
    })
    .catch(err => console.error(err));
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}