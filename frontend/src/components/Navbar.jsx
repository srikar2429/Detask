import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { Box, Flex, Button, Text, Avatar, VStack, Separator, SkeletonCircle, Skeleton } from "@chakra-ui/react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const showToast = useToast();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      showToast("Logout successful! 🎉", "success");
      navigate("/login");
    } catch (error) {
      showToast(error.response?.data?.message || "Logout failed!", "error");
    }
  };

  return (
    <Box
      bg="rgb(113, 99, 46)"
      maxWidth="100%"
      h="5rem"
      color="white"
      borderRadius="md"
      border="1px solid rgb(124, 111, 64)"
      my="1rem"
      mx="1rem"
    >
      <Flex justify="space-between" align="center" h="100%" px={6}>
        <Text fontSize="3xl" fontWeight="bold" as={Link} to="/">
          STREAM
        </Text>
        {!user && !["/login", "/register"].includes(location.pathname) ? (
          <Flex w="10%" justify="space-around" h="4rem" alignItems="center">
            <Text
              as={Link}
              to="/login"
              fontSize="xl"
              color="white"
              _hover={{
                color: "gray.300",
                transform: "scale(1.05)",
              }}
              _active={{ color: "gray.500", transform: "scale(0.95)" }}
              transition="all 0.2s ease-in-out"
            >
              Login
            </Text>
            <Text
              as={Link}
              to="/register"
              fontSize="xl"
              color="white"
              _hover={{
                color: "gray.300",
                transform: "scale(1.05)",
              }}
              _active={{ color: "gray.500", transform: "scale(0.95)" }}
              transition="all 0.2s ease-in-out"
            >
              Signup
            </Text>
          </Flex>
        ) : null}
        {/* Show skeleton loader when on login/register page */}
        {["/login", "/register"].includes(location.pathname) && !user && (
          <Flex align="center" h="4rem" gap={2}>
            <SkeletonCircle size="10" />
            <Skeleton height="30%" width="10rem" />
          </Flex>
        )}
        {user && (
          <Flex
            position="relative"
            align="center"
            gap={2}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {/* <Avatar
              name={user?.name || "USER"}
              src={user?.profilePic || ""}
              size="md"
              cursor="pointer"
            /> */}
            <Avatar.Root>
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={user?.profilePic || null} />
            </Avatar.Root>
            <Text color="white" fontSize="lg" fontWeight="bold">
              {user?.name || "USER"}
            </Text>

            {dropdownOpen && (
              <VStack
                position="absolute"
                top="100%"
                right={0}
                bg="white"
                color="black"
                boxShadow="md"
                p={2}
                borderRadius="md"
                spacing={2}
                w="120px"
              >
                <Text cursor="pointer" onClick={() => navigate("/profile")}>
                  Profile
                </Text>
                <Separator />
                <Text cursor="pointer" onClick={handleLogout}>
                  Logout
                </Text>
              </VStack>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
