import { setLocalStream, setRemoteStream } from "../features/call/callSlice";
import { useDispatch, useSelector } from "react-redux";
import { sendWebRTCSignalingData } from "./socketConnection";
import { store } from "../store";

let peerConnection;
let pendingCandidates = [];

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  audio: true,
  video: true,
};

const configuration = {
  iceServers: [
    // { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export const getLocalStream = async (dispatch, onlyAudio = false, x = "0") => {
  const localStream = store.getState().call.localStream;
  console.log("loggin getLocalStream : ", onlyAudio, localStream, x);

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }

  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    dispatch(setLocalStream(stream));

    return stream;
  } catch (err) {
    console.log("Error accessing local devices: ", err);
  }
};

export const createPeerConnection = (dispatch, callData) => {
  peerConnection = new RTCPeerConnection(configuration);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      sendWebRTCSignalingData({
        callInfo: { userName: callData },
        candidate: event.candidate,
        type: "ICE_CANDIDATE",
      });
    }
  };

  peerConnection.onconnectionstatechange = () => {
    if (peerConnection.connectionState === "connected") {
      console.log("Successfully connected with the other user");
    }
  };

  const remoteStream = new MediaStream();
  dispatch(setRemoteStream(remoteStream));

  peerConnection.ontrack = (event) => {
    remoteStream.addTrack(event.track);
  };

  const localStream = store.getState().call.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
  } else {
    console.warn("No localStream found to add tracks from.");
  }

  return peerConnection;
};

export const sendWebRTCOffer = async (callData) => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  sendWebRTCSignalingData({
    callInfo: callData,
    offer,
    type: "OFFER",
  });
};

export const handleWebRTCOffer = async (data) => {
  if (peerConnection) {
    await peerConnection.setRemoteDescription(data.offer);

    // Process any pending ICE candidates
    if (pendingCandidates.length > 0) {
      for (const candidate of pendingCandidates) {
        try {
          await peerConnection.addIceCandidate(candidate);
        } catch (err) {
          console.error("Error adding pending ICE candidate", err);
        }
      }
      pendingCandidates = [];
    }

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendWebRTCSignalingData({
      callInfo: data.userDetails,
      answer,
      type: "ANSWER",
    });
  }
};

export const handleWebRTCAnswer = async (data) => {
  if (peerConnection) {
    await peerConnection.setRemoteDescription(data.answer);

    // Process any pending ICE candidates
    if (pendingCandidates.length > 0) {
      for (const candidate of pendingCandidates) {
        try {
          await peerConnection.addIceCandidate(candidate);
        } catch (err) {
          console.error("Error adding pending ICE candidate", err);
        }
      }
      pendingCandidates = [];
    }
  }
};

export const handleWebRTCCandidate = async (data) => {
  try {
    if (peerConnection) {
      // Only add candidate if we have a remote description set
      if (
        peerConnection.remoteDescription &&
        peerConnection.remoteDescription.type
      ) {
        await peerConnection.addIceCandidate(data.candidate);
      } else {
        // Otherwise, queue it for later
        pendingCandidates.push(data.candidate);
      }
    }
  } catch (err) {
    console.error("error occured when trying to add ice candidate", err);
  }
};
