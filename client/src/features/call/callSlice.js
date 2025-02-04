// src/features/call/callSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomingCallData: null, // data from the server, e.g. { userOID, userName, role }
  showIncomingDialog: false, // whether to show the incoming call dialog
  callStatus: "idle", // e.g., 'idle' | 'ringing' | 'answered' | 'rejected' | ...
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
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
  },
});

export const { setIncomingCall, clearIncomingCall, setCallStatus } =
  callSlice.actions;
export default callSlice.reducer;
