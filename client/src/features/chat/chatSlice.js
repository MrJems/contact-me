import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chosenChatUser: null,
    messages: [],
    unread: [],
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
      console.log("set message : ", action);
      if (
        state.chosenChatUser &&
        action.payload?.participants.some(
          (p) => p.username === state.chosenChatUser
        )
      ) {
        state.messages = action.payload.messages;
        //remove all the user object named state.chosenchatuser from unread
        state.unread = state.unread.filter(
          (msg) => msg.username !== state.chosenChatUser
        );
      } else {
        const nonAdminParticipants = action.payload?.participants
          .filter((p) => p.username !== "admin") // Exclude admin
          .map((p) => ({ username: p.username, _id: p._id })); // Extract username and _id

        // Push to state.unread
        state.unread.push(...nonAdminParticipants);
      }
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
