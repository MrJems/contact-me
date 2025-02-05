// src/features/call/callSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomingCallData: null, // data from the server, e.g. { userOID, userName, role }
  outgoingCallData: null,
  showIncomingDialog: false, // whether to show the incoming call dialog
  callStatus: "idle", // e.g., 'idle' | 'ringing' | 'answered' | 'rejected' | ...
  audioOnly: false,
  localStream: null,
  remoteStream: [],
  screenSharningStream: null,
  isScreenSharningActive: false,
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    startOutgoingCall: (state, action) => {
      state.outgoingCallData = action.payload;
      state.callStatus = "outgoing";
    },

    // If the user ends the call before it's answered
    endOutgoingCall: (state) => {
      state.outgoingCallData = null;
      // might or might not want to differentiate "ended" from "idle"
      state.callStatus = "idle";
    },

    // For calls we RECEIVE
    setIncomingCall: (state, action) => {
      state.incomingCallData = action.payload;
      state.showIncomingDialog = true;
      state.callStatus = "ringing";
    },

    setIncomingCall: (state, action) => {
      state.incomingCallData = action.payload;
      state.showIncomingDialog = true;
      state.callStatus = "ringing";
    },
    clearIncomingCall: (state) => {
      // Called when the call is answered, rejected, or ended
      state.incomingCallData = null;
      state.showIncomingDialog = false;
      state.callStatus = "idle";
    },
    setCallStatus: (state, action) => {
      // A generic way to set call status from anywhere
      state.callStatus = action.payload;
    },
    setCallRejected: (state) => {
      state.callStatus = "rejected";
      // Clear outgoing data as well
      state.outgoingCallData = null;
    },
    setCallAccepted: (state) => {
      state.showIncomingDialog = false;

      state.callStatus = "accepted";
      // Clear outgoing data as well
      state.outgoingCallData = null;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
  },
});

export const {
  setIncomingCall,
  clearIncomingCall,
  setCallStatus,
  startOutgoingCall,
  endOutgoingCall,
  setCallRejected,
  setCallAccepted,
  setLocalStream,
} = callSlice.actions;
export default callSlice.reducer;
