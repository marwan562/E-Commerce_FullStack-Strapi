import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actLogin, actRegister } from "./act/actAuthUser";
import { IUserData, TStatus } from "../../../interfaces";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

interface IState {
  status: TStatus;
  userData: IUserData | null;
  error: string | null;
}

const initialState: IState = {
  status: "idle",
  userData: null,
  error: null,
};

const AuthUserSlice = createSlice({
  name: "authUserSlice",
  initialState,
  reducers: {
    setUserDataAction: (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload;
    },
    removeStatusWithError: (state) => {
      state.status = "idle";
      state.error = null;
    },
    logOutUserAction: (state) => {
      state.userData = null;
    },
  },
  extraReducers(builder) {
    // Register
    builder.addCase(actRegister.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(
      actRegister.fulfilled,
      (state, action: PayloadAction<IUserData>) => {
        state.status = "fullfilled";
        if (action.payload) {
          state.userData = action.payload;
          toast({
            title: "You must be login your new account..!",
            position: "top-right",
            status: "warning",
            isClosable: true,
          });
          setTimeout(
            () =>
              toast({
                title: "Sign up successfully",
                position: "top-right",
                status: "success",
                isClosable: true,
              }),
            1000
          );
        }
      }
    );
    builder.addCase(actRegister.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload.response.data?.error?.message;
        toast({
          title: action.payload.response?.data?.error?.message,
          position: "top-right",
          status: "error",
          isClosable: true,
        });
      }
    });

    //login
    builder.addCase(actLogin.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(
      actLogin.fulfilled,
      (state, action: PayloadAction<IUserData>) => {
        state.status = "fullfilled";
        
        if (action.payload) {
          state.userData = action.payload;
         
          toast({
            title: `Login is successfully`,
            position: "top-right",
            status: "success",
            isClosable: true,
          });
        } else {
          toast({
            title: "Failed to login",
            position: "top-right",
            status: "error",
            isClosable: true,
          });
        }
      }
    );
    builder.addCase(actLogin.rejected, (state, action) => {
      state.status = "rejected";

      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
        toast({
          title: "Invalid identifier or password",
          position: "top-right",
          status: "error",
          isClosable: true,
        });
      }
    });
  },
});

export const { removeStatusWithError, logOutUserAction  ,setUserDataAction} =
  AuthUserSlice.actions;
export default AuthUserSlice.reducer;
