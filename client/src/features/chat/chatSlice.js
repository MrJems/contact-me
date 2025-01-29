import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chosenChatUser: null,
    messages: [],
    isLoading: false,
    error: null,
    unreadCount: 0,
  },
  reducers: {
    setChosenChatUser(state, action) {
      state.chosenChatUser = action.payload;
      state.messages = [];
      state.unreadCount = 0;
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
    incrementUnreadCount(state) {
      state.unreadCount += 1;
    },
    resetUnreadCount(state) {
      state.unreadCount = 0;
    },
  },
});

export const {
  setChosenChatUser,
  addMessage,
  setMessages,
  setIsLoading,
  setError,
  incrementUnreadCount,
  resetUnreadCount,
} = chatSlice.actions;

export default chatSlice.reducer;
