import { setLocalStream } from "../features/call/callSlice";
import { useDispatch, useSelector } from "react-redux";

const onlyAudioContraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};
export const getLocalStream = (onlyAudio = false) => {
  const dispatch = useDispatch();

  const constraints = onlyAudio ? onlyAudioContraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      dispatch(setLocalStream(stream));
    })
    .catch((err) => console.log(err));
};
