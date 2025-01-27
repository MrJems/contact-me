import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chosenChatUser: null, // Stores the selected user's information
    messages: [], // Stores the messages array
    isLoading: false, // Indicates if a chat-related operation is in progress
    error: null, // Stores any error related to chat
    unreadCount: 0, // Number of unread messages
  },
  reducers: {
    setChosenChatUser(state, action) {
      state.chosenChatUser = action.payload;
      state.messages = []; // Reset messages when a new user is chosen
      state.unreadCount = 0; // Reset unread messages count
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
