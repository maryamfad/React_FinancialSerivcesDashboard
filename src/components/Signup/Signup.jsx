import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdErrorOutline } from "react-icons/md";
import "./Signup.css";
import { signUp } from "../../services/AuthServices";
import { insertUserIntoUsers } from "../../services/UserServices";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';

function Signup() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let isDisabled = false;

  const passwordRequirements = {
    minLength: password.length >= 8,
    hasSpecialChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password),
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
  };
  isDisabled = !(
    passwordRequirements.hasNumber &&
    passwordRequirements.hasSpecialChar &&
    passwordRequirements.hasUppercase &&
    passwordRequirements.minLength &&
    confirmPassword
  );

  const handleSignup = async (event) => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    event.preventDefault();
    try {
      await signUp(username, password)
        // .then((user) => insertUserIntoUsers(username, password))
        .then(() => navigate("/dashboard"))
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  const formWidth = useBreakpointValue({ base: '90%', md: '50%', lg: '40%' });
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" w={formWidth} mx="auto" mt={10}>
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="gray.700">
        Sign Up
      </Heading>
      <VStack spacing={4}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            aria-label="Username"
            aria-required="true"
            bg={inputBg}
            borderColor={inputBorderColor}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            aria-label="Email"
            aria-required="true"
            bg={inputBg}
            borderColor={inputBorderColor}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            aria-label="Password"
            aria-required="true"
            bg={inputBg}
            borderColor={inputBorderColor}
          />
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm your password"
            aria-label="Confirm Password"
            aria-required="true"
            bg={inputBg}
            borderColor={inputBorderColor}
          />
        </FormControl>
        <Button colorScheme="blue" size="lg" width="full" mt={4}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
}

export default Signup;
