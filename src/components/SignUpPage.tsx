/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as LinkRouter, Navigate, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUpSchema } from "../validations/sginUpSchema";
import { useAppDispatch, useAppSelector } from "../store";
import { actRegister } from "../store/reducer/auth/act/actAuthUser";
import { removeStatusWithError } from "../store/reducer/auth/AuthUserSlice";

const SignUpPage = ({ isAuthenticated }: { isAuthenticated: string }) => {
  if (isAuthenticated) return <Navigate to={"/"} replace />;

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });
  const onSubmit: SubmitHandler<TSignUpSchema> = (data) => {
    const { firstName, email, lastName, password } = data;
    dispatch(
      actRegister({
        username: `${firstName} ${lastName}`,
        email,
        password,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/", { replace: true });
      });
  };

  useEffect(() => {
    return () => {
      dispatch(removeStatusWithError());
    };
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Enjoy with E-Commerce Web ✌️
          </Text>
        </Stack>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    isInvalid={errors.firstName ? true : false}
                    {...register("firstName")}
                    type="text"
                  />
                  {errors.firstName && (
                    <FormHelperText textColor={"red.500"}>
                      {errors.firstName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    isInvalid={errors.lastName ? true : false}
                    {...register("lastName")}
                    type="text"
                  />
                  {errors.lastName && (
                    <FormHelperText textColor={"red.500"}>
                      {errors.lastName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                isInvalid={errors.email ? true : false}
                {...register("email")}
                type="email"
              />
              {errors.email && (
                <FormHelperText textColor={"red.500"}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  isInvalid={errors.password ? true : false}
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormHelperText textColor={"red.500"}>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                isLoading={status === "pending" ? true : false}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <LinkRouter color="blue" to={"/auth/login"}>
                  Login
                </LinkRouter>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpPage;
