import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserApi, loginUserApi } from "../../api/authApi";
import { v4 as uuidv4 } from "uuid";
import { disconnectSocketServer } from "../../socketCommunication/socketConnection";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await registerUserApi(userData);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await loginUserApi(credentials);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    token: null,
    anonymousId: null,
    loading: false,
    error: null,
    socketConnected: false,
  },
  reducers: {
    setAnonymousId: (state, action) => {
      state.anonymousId = action.payload;
    },
    removeAnonymousId: (state) => {
      state.anonymousId = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setSocketConnected: (state, action) => {
      state.socketConnected = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.token = null;
      state.anonymousId = null;
      localStorage.clear();
      disconnectSocketServer();
    },
  },
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.token = action.payload.token;
        localStorage.clear();
        localStorage.setItem("token", action.payload.token);
        disconnectSocketServer();
        state.anonymousId = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setAnonymousId,
  removeAnonymousId,
  setToken,
  removeToken,
  logoutUser,
  setUserInfo,
  setSocketConnected,
} = userSlice.actions;
export default userSlice.reducer;

export const initializeApp = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const annmsID = localStorage.getItem("anonymousId");
  if (token && annmsID) {
    console.log("Clearing localStorage due to invalid state.");
    localStorage.clear();
    window.location.reload();
  }
  if (token) {
    dispatch(setToken(token));
  } else {
    console.log("Token not available");
    let anonymousId = localStorage.getItem("anonymousId");
    if (!anonymousId) {
      anonymousId = uuidv4();
      localStorage.setItem("anonymousId", anonymousId);
      dispatch(setAnonymousId(anonymousId));
    } else {
      dispatch(setAnonymousId(anonymousId));
    }
  }
};
