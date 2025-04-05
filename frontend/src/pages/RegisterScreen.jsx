import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; 
import { useToast } from "../context/ToastContext.jsx"; 
import { Box, Button, Input, VStack, Heading, Flex, Image, Text } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import Navbar from "../components/Navbar.jsx";
import cdImage from "../assets/cd.jpg";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, register } = useAuth();
  const showToast = useToast();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(name, username, email, password);
      showToast("Registration successful! 🎉", "success");
      navigate("/profile");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Registration failed!",
        "error"
      );
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        height="90vh"
        justify="center"
        align="center"
        px={6}
        gap={8}
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* Image Section */}
        <Box width={{ base: "90%", md: "40%" }} textAlign="center">
          <Image
            src={cdImage}
            alt="Register Illustration"
            borderRadius="md"
            boxShadow="lg"
            width="100%"
          />
        </Box>

        {/* Form Section */}
        <VStack
          as="form"
          onSubmit={submitHandler}
          spacing={6}
          justifyContent="space-evenly"
          p={6}
          boxShadow="lg"
          borderRadius="md"
          bg="rgb(113, 99, 46)"
          width={{ base: "90%", md: "30%" }}
          height="60%"
          minW={{ base: "90%", md: "30%" }}
        >
          <Box width="100%">
            <Heading color="white" mb={2} size="2xl">
              Name
            </Heading>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg="white"
              color="black"
            />
          </Box>

          <Box width="100%">
            <Heading color="white" mb={2} size="2xl">
              Username
            </Heading>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg="white"
              color="black"
            />
          </Box>

          <Box width="100%">
            <Heading color="white" mb={2} size="2xl">
              Email
            </Heading>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
              color="black"
            />
          </Box>

          <Box width="100%">
            <Heading color="white" mb={2} size="2xl">
              Password
            </Heading>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              color="black"
            />
          </Box>

          <Button type="submit" colorScheme="blue" width="25%" size="xl">
            Register
          </Button>

          {/* Login Link */}
          <Heading color="white" fontSize="2xl">
            Already have an account?{" "}
            <Heading
              as={Link}
              to="/login"
              color="blue.300"
              fontWeight="bold"
              _hover={{ textDecoration: "underline", color: "blue.500" }}
            >
              Login
            </Heading>
          </Heading>
        </VStack>
      </Flex>
    </>
  );
};


export default RegisterScreen;
