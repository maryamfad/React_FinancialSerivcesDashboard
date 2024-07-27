import React, { useState } from "react";
import "./Login.css";
import { login } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formWidth = useBreakpointValue({ base: "90%", md: "50%", lg: "40%" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    let validationErrors = {};

    if (!username) validationErrors.username = "Username is required";
    if (!password) validationErrors.password = "Password is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      login(username, password)
        .then((t) => {
          localStorage.setItem("token", t.token);
        })
        .then(() => navigate("/dashboard"))
        .catch((error) => {
          if (error.status === 400) {
            setErrorMessage("Username or password is incorrect");
            onOpen(); 
          } else {
            setErrorMessage(error.message || "An unexpected error occurred.");
            onOpen(); 
          }
        });
    }
  };

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      w={formWidth}
      mx="auto"
      mt={10}
    >
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="gray.700">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              aria-required="true"
              bg="white"
              borderColor="gray.300"
            />
            {errors.username && (
              <Text color="red.500" mt={2} role="alert">
                {errors.username}
              </Text>
            )}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              aria-required="true"
              bg="white"
              borderColor="gray.300"
            />
            {errors.password && (
              <Text color="red.500" mt={2} role="alert">
                {errors.password}
              </Text>
            )}
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            mt={4}
            type="submit"
          >
            Login
          </Button>
        </VStack>
      </form>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <Icon as={WarningIcon} color="red.500" mr={2} />
            Error
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Text fontSize="lg" mb={4}>
              {errorMessage}
            </Text>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Login;
