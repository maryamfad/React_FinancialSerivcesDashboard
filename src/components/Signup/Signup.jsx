import React, { useState, useContext } from "react";
import "./Signup.css";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

function Signup() {
  const { signUp } = useContext(AuthContext);
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const passwordRules = {
    minLength: "Password must be at least 8 characters long.",
    hasUpperCase: "Password must contain at least one uppercase letter.",
    hasLowerCase: "Password must contain at least one lowercase letter.",
    hasNumber: "Password must contain at least one number.",
    hasSpecialChar: "Password must contain at least one special character.",
  };

  const checkPasswordRules = (password) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    };
  };
  const passwordRulesStatus = checkPasswordRules(password);

  let isDisabled = !(
    passwordRulesStatus.hasNumber &&
    passwordRulesStatus.hasSpecialChar &&
    passwordRulesStatus.hasUpperCase &&
    passwordRulesStatus.hasLowerCase &&
    passwordRulesStatus.minLength &&
    confirmPassword
  );
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      onOpen();
      return;
    }
    setIsLoading(true);
    signUp(username, password)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.status === 400) {
          setErrorMessage("Invalid input");
          onOpen();
        } else {
          setErrorMessage(error.message || "An unexpected error occurred.");
          onOpen();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const formWidth = useBreakpointValue({ base: "90%", md: "50%", lg: "40%" });
  const inputBg = useColorModeValue("white", "gray.700");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

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
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-required="true"
              bg={inputBg}
              borderColor={inputBorderColor}
            />
          </FormControl>
          <Box width={"100%"} spacing={2} mt={2} mb={4} ml={2} fontSize="sm">
            {Object.entries(passwordRules).map(([rule, description]) => (
              <Box
                key={rule}
                color={passwordRulesStatus[rule] ? "green.500" : "gray.500"}
              >
                <Box
                  mr={2}
                  as={passwordRulesStatus[rule] ? CheckCircleIcon : WarningIcon}
                  color={passwordRulesStatus[rule] ? "green.500" : "gray.500"}
                />
                {description}
              </Box>
            ))}
          </Box>
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            mt={4}
            type="submit"
            isLoading={isLoading}
            isDisabled={isDisabled}
          >
            Sign Up
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

export default Signup;
