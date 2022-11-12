import React from 'react';
import {ReactNode} from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center, Container,
  HStack,
} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';

const Links = [
  {
    "name": "Flashcard",
    "path": "/",
  },
  {
    "name": "Learning",
    "path": "/learning",
  },
  {
    "name": "Exam",
    "path": "/Exam",
  },
];

const NavLink = (props) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      to={props.children.path}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            color: isCurrent ? "red" : "blue"
          }
        };
      }}
    >
      {props.children.name}
    </Link>
  );
}

export default function Nav() {
  const {colorMode, toggleColorMode} = useColorMode();
  // const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position={"fixed"} width={"100%"} zIndex={99999}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box>Logo</Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{base: 'none', md: 'flex'}}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br/>
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Center>
                <br/>
                <Center>
                  <p>Username</p>
                </Center>
                <br/>
                <MenuDivider/>
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}