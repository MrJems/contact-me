import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import adminReducer from "./features/admindata/adminSlice";
import chatReducer from "./features/chat/chatSlice";
import callReducer from "./features/call/callSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    chat: chatReducer,
    call: callReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
