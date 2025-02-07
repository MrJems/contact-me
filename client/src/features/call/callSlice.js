import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomingCallData: null,
  outgoingCallData: null,
  showIncomingDialog: false,
  callStatus: "idle",
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
      state.audioOnly = action.payload.type == "audio" ? true : false;
    },

    endOutgoingCall: (state) => {
      state.outgoingCallData = null;
      state.callStatus = "idle";
    },

    setIncomingCall: (state, action) => {
      state.incomingCallData = action.payload;
      state.showIncomingDialog = true;
      state.callStatus = "ringing";
      state.audioOnly = action.payload.type == "audio" ? true : false;
    },

    clearIncomingCall: (state) => {
      state.incomingCallData = null;
      state.showIncomingDialog = false;
      state.callStatus = "idle";
    },
    setCallStatus: (state, action) => {
      state.callStatus = action.payload;
    },
    setCallRejected: (state) => {
      state.callStatus = "rejected";
      state.outgoingCallData = null;
    },
    setCallAccepted: (state) => {
      state.showIncomingDialog = false;

      state.callStatus = "accepted";
      state.outgoingCallData = null;
    },
    setLocalStream: (state, action) => {
      console.log("steaming...........", action.payload);
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      console.log("steaming remote...........", action.payload);
      state.remoteStream = action.payload;
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
  setRemoteStream,
} = callSlice.actions;
export default callSlice.reducer;
