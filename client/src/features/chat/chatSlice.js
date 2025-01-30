import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chosenChatUser: null,
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setChosenChatUser(state, action) {
      state.chosenChatUser = action.payload;
      state.messages = [];
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setChosenChatUser,
  addMessage,
  setMessages,
  setIsLoading,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;
