import { setLocalStream, setRemoteStream } from "../features/call/callSlice";
import { useDispatch, useSelector } from "react-redux";
import { sendWebRTCSignalingData } from "./socketConnection";
import { store } from "../store";

let peerConnection;

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
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    // { urls: "stun:stun4.l.google.com:19302" },
    // { urls: "stun:stun.stunprotocol.org" },
  ],
};

export const getLocalStream = async (dispatch, onlyAudio = false, x = "0") => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    dispatch(setLocalStream(stream));
  } catch (err) {
    console.log("Error accessing local devices: ", err);
  }
};

export const createPeerConnection = (dispatch, callData) => {
  peerConnection = new RTCPeerConnection(configuration);

  peerConnection.onicecandidate = (event) => {
    console.log("ICE candidate 1:", event.candidate);
    if (event.candidate) {
      console.log("ICE candidate 2:", event.candidate);
      sendWebRTCSignalingData({
        callInfo: { userName: callData },
        candidate: event.candidate,
        type: "ICE_CANDIDATE",
      });
    }
  };

  peerConnection.onconnectionstatechange = () => {
    console.log("state changed : ", peerConnection.connectionState);
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
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  sendWebRTCSignalingData({
    callInfo: data.userDetails,
    answer,
    type: "ANSWER",
  });
  console.log("signaling data : ", data);
};

export const handleWebRTCAnswer = async (data) => {
  console.log("handleWebRTCAnswer data : ", data);

  await peerConnection.setRemoteDescription(data.answer);
};

export const handleWebRTCCandidate = async (data) => {
  console.log("ice candidate came : ", data);
  try {
    await peerConnection.addIceCandidate(data.candidate);
  } catch (err) {
    console.error("error occured when trying to add icecandiatae", err);
  }
};
