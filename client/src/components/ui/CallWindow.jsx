

import React, { useRef, useState, useEffect } from "react";
import {
  Fullscreen,
  FullscreenExit,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  CallEnd,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

const CallWindow = ({
  avatarUrl = "https://avatar.iran.liara.run/public/32",
  onEndCall,
}) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const { localStream, remoteStream, audioOnly } = useSelector(
    (state) => state.call
  );

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [isMaximized, setIsMaximized] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const WINDOW_WIDTH = 300;
  const WINDOW_HEIGHT = 200;
 useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream, isMaximized]);

  const handlePointerDown = (e) => {
    if (!isMaximized) {
      if (e.target.getAttribute("data-bottom-menu")) return;

      setIsDragging(true);
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging && !isMaximized) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      const clampedX = Math.max(
        0,
        Math.min(window.innerWidth - WINDOW_WIDTH, newX)
      );
      const clampedY = Math.max(
        0,
        Math.min(window.innerHeight - WINDOW_HEIGHT, newY)
      );
      setPosition({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      e.target.releasePointerCapture(e.pointerId);
    }
  };
const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };
  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
    }
    setIsMuted((prev) => !prev);
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOn;
      });
    }
    setIsVideoOn((prev) => !prev);
  };

  const containerStyle = {
    position: "fixed",
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? "100vw" : `${WINDOW_WIDTH}px`,
    height: isMaximized ? "100vh" : `${WINDOW_HEIGHT}px`,
    backgroundColor: "#222",
    border: isMaximized ? "none" : "1px solid #555",
    boxShadow: isMaximized ? "none" : "0px 0px 6px rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
    borderRadius: isMaximized ? "0px" : "30px",
    cursor: isMaximized ? "default" : isDragging ? "grabbing" : "grab",
  };

  const videoAreaStyle = {
    flex: 1,
    position: "relative", 
    overflow: "hidden",
    backgroundColor: "#333",
    touchAction: "none",
  };

  const remoteVideoStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: "#000",
  };

  const localVideoContainerStyle = {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 120,
    height: 90,
    border: "2px solid #fff",
    overflow: "hidden",
    backgroundColor: "#333",
    borderRadius: "4px",
    zIndex: 1,
  };

  const localVideoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: "#000",
  };

  const bottomMenuWrapperStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: isMaximized ? "36px" : "8px", 
  };

  const bottomMenuStyle = {
    backgroundColor: "#E91E63",
    borderRadius: "24px",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
  };

  const iconColorStyle = { color: "#FFFFFF" };
  return (
    <div style={containerStyle}>
      <div
        style={videoAreaStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {audioOnly ? (
          <>
            <audio ref={remoteVideoRef} autoPlay muted={false} style={{ display: "none" }} />
            <img
              src={avatarUrl}
              alt="Avatar"
              style={{
                width: "40%",
                maxWidth: "200px",
                borderRadius: "50%",
                objectFit: "cover",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        ) : (
          <>
            <video
              ref={remoteVideoRef}
              style={remoteVideoStyle}
              autoPlay
              muted={false}
            />
            {isMaximized && (
              <div style={localVideoContainerStyle}>
                <video
                  ref={localVideoRef}
                  style={localVideoStyle}
                  autoPlay
                  muted
                />
              </div>
            )}
          </>
        )}

        <div style={bottomMenuWrapperStyle} data-bottom-menu>
          <div style={bottomMenuStyle}>
            <IconButton
              onClick={toggleMute}
              style={iconColorStyle}
              size="medium"
              data-bottom-menu
            >
              {isMuted ? <MicOff /> : <Mic />}
            </IconButton>

            {!audioOnly && (
              <IconButton
                onClick={toggleVideo}
                style={iconColorStyle}
                size="medium"
                data-bottom-menu
              >
                {isVideoOn ? <Videocam /> : <VideocamOff />}
              </IconButton>
            )}

            <IconButton
              onClick={toggleMaximize}
              style={iconColorStyle}
              size="medium"
              data-bottom-menu
            >
              {isMaximized ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>

            {onEndCall && (
              <IconButton
                onClick={onEndCall}
                style={iconColorStyle}
                size="medium"
                data-bottom-menu
              >
                <CallEnd />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallWindow;
