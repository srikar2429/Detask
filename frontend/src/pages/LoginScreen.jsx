import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/ToastContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Box, Button, Input, VStack, Heading, Flex, Image, Text } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import Navbar from "../components/Navbar.jsx";
import cdImage from "../assets/cd.jpg";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const showToast = useToast(); 
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast("Login successful! 🎉", "success");
      navigate("/profile");
    } catch (error) {
      showToast(error.response?.data?.message || "Login failed!", "error");
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
            alt="Login Illustration"
            borderRadius="md"
            boxShadow="lg"
            width="100%"
          />
        </Box>

        {/* Form Section */}
        <VStack
          as="form"
          onSubmit={submitHandler}
          spacing={8}
          justifyContent="space-evenly"
          p={6}
          boxShadow="lg"
          borderRadius="md"
          bg="rgb(113, 99, 46)"
          width={{ base: "90%", md: "30%" }}
          height="50%"
          minW={{ base: "90%", md: "30%" }}
        >
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
            <PasswordInput
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              color="black"
            />
          </Box>

          <Button type="submit" colorScheme="blue" width="25%" size="xl">
            Login
          </Button>

          {/* Register Link */}
          <Heading color="white" size="xl">
            Don't have an account?{" "}
            <Heading
              as={Link}
              to="/register"
              color="blue.300"
              fontWeight="bold"
              _hover={{ textDecoration: "underline", color: "blue.500" }}
            >
              Register
            </Heading>
          </Heading>
        </VStack>
      </Flex>
    </>
  );
};

export default LoginScreen;
