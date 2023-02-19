import {
  FormControl,
  FormLabel,
  Stack,
  Switch,
  Wrap,
  Select,
  Container,
  Button,
  Center,
  useToast
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import BaseContainer from "../../components/contents/BaseContainer";
import client from "../../gatsby-plugin-apollo/client";
import {GET_COURSES, GET_SUBSCRIPTION} from "../../gatsby-plugin-apollo/queries";
import { axiosClient } from "../../utils/axios";
import {SET_SUBSCRIPTION} from "../../gatsby-plugin-apollo/mutations";

export default function Reminder() {
  const [subscriptionState, setSubscriptionState] = useState(false)
  const [subscription, setSubscription] = useState()
  const [courses, setCourses] = useState([])
  const toast = useToast()

  const fetchCourses = async () => {
    const { loading, error, data } = await client.query({
      query: GET_COURSES,
    })
    if (data) {
      setCourses([...data.getCourses].reverse())
    }
  };

  const fetchSubscription = async () => {
    const { loading, error, data } = await client.query({
      query: GET_SUBSCRIPTION,
    })
    if (data) {
      await setSubscription({...data.getSubscription})
      await setSubscriptionState(data.getSubscription.subscribeState)
    }
  };

  const saveSubscription = async () => {
    const { loading, error, data } = await client.mutate({
      mutation: SET_SUBSCRIPTION,
      variables: {
        courseID: subscription?.courseID ?? "",
        subscribeState: subscriptionState,
        everyMinute: subscription?.everyMinute,
      }
    })
    if (data) {
      setSubscription({...data.getSubscription})
      toast({
        title: "Success!",
        variant: ['solid'],
        isClosable: true,
        position: "bottom",
        status: "success",
      })
    }
  };
  
  useEffect( () => {
    registerServiceWorker()
    fetchCourses().then()
    fetchSubscription().then()
  }, [])

  const onSwitchChange = () => {
    setSubscriptionState(!subscriptionState)
    
    setSubscription({
      ...subscription,
      subscribeState: subscriptionState,
    })
  }
  
  const onCourseChange = (e) => {
    setSubscription({
      ...subscription,
      courseID: e.target.value,
    })
  }

  const onTimeChange = (e) => {
    setSubscription({
      ...subscription,
      everyMinute: e.target.value,
    })
  }

  return (
    <BaseContainer>
      <Container>
        <FormControl>
          <Wrap mb="3">
            <FormLabel>Active Reminder</FormLabel>
            <Stack align='center' direction='row'>
              <Switch size='lg' id='subscribeState' onChange={onSwitchChange} isChecked={subscriptionState} />
            </Stack>
          </Wrap>
          
          <FormLabel mt="3" >Course</FormLabel>
          <Select placeholder='All' value={subscription?.courseID} onChange={onCourseChange}>
            {courses.map((data) =>
              <option value={data.id} key={data.id}>{data.name}</option>
            )}
          </Select>

          <FormLabel mt="3" >Time to remind</FormLabel>
          <Select value={subscription?.everyMinute} onChange={onTimeChange}>
            <option value='1'>1 Minute</option>
            <option value='2'>2 Minute</option>
            <option value='3'>3 Minute</option>
            <option value='5'>5 Minute</option>
            <option value='10'>10 Minute</option>
            <option value='30'>30 Minute</option>
            <option value='60'>60 Minute</option>
            <option value='120'>120 Minute</option>
          </Select>
          
          <Center mt="4">
            <Button mt="4" backgroundColor="green" onClick={saveSubscription}>
              Save
            </Button>
          </Center>

        </FormControl>
      </Container>
    </BaseContainer>
  );
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
    navigator.serviceWorker.ready
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